"use strict";

import { checkFormat, PREVMODEL } from "./mixins";

/**
 * @typedef {string|RegExp} topic
 * @typedef {function(string)} eventCallback
 * @typedef {import('../adapters/index').adapterFunction} adapterFunction
 * @typedef {string} id
 *
 * @typedef {Object} Order
 * @property {function(topic,eventCallback)} listen - listen for events
 * @property {import('../adapters/event-adapter').notifyType} notify
 * @property {adapterFunction} validateAddress - returns valid address or throws exception
 * @property {adapterFunction} completePayment - completes payment for an authorized charge
 * @property {adapterFunction} verifyDelivery - verify the order was received by the customer
 * @property {adapterFunction} trackShipment
 * @property {adapterFunction} refundPayment
 * @property {adapterFunction} compensate - undo all transactions up to this point
 * @property {function():Promise<Order>} pickkOrder - pick the items and get them ready for shipment
 * @property {adapterFunction} authorizePayment - verify payment info, credit avail
 * @property {import('../adapters/shipping-adapter').} shipOrder
 * {import('../adapters/shipping-adapter').shipOrder} shipOrder -
 * calls shipping service to request delivery
 * @property {function(Order):Promise<void>} save - saves order
 * @property {function():Promise<Order>} find - finds order
 * @property {string} shippingAddress
 * @property {string} orderNo = the order number
 * @property {string} trackingId - id given by tracking status for this `orderNo`
 * @property {function()} decrypt - decrypts encypted properties
 * @property {function(*):Promise<Order>} update - update the order
 * @property {'APPROVED'|'SHIPPING'|'CANCELED'|'COMPLETED'} orderStatus
 * @property {function():Promise<Customer>} customer - retrieves related customer object.
 *
 */

const orderStatus = "orderStatus";
const orderTotal = "orderTotal";
const orderNo = "orderNo";
export const OrderStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  SHIPPING: "SHIPPING",
  COMPLETE: "COMPLETE",
  CANCELED: "CANCELED",
};

/**
 *
 * @param {*} items
 */
export const checkItems = function (orderItems) {
  if (!orderItems) {
    throw new Error("order contains no items");
  }
  const items = Array.isArray(orderItems) ? orderItems : [orderItems];

  if (
    items.length > 0 &&
    items.every((i) => i.itemId && typeof i.price === "number")
  ) {
    return items;
  }
  throw new Error("order items invalid");
};

/**
 * Calculate order total
 * @param {*} items
 */
export const calcTotal = function (orderItems) {
  const items = checkItems(orderItems);

  return items.reduce((total, item) => {
    const qty = item.qty || 1;
    return (total += item.price * qty);
  }, 0);
};

/**
 * No changes to `propKey` once order is approved
 * @param {*} o - the order
 * @param {*} propKey
 * @returns {string | null} the key or `null`
 */
export const freezeOnApproval = (propKey) => (o) => {
  return o[PREVMODEL].orderStatus !== OrderStatus.PENDING ? propKey : null;
};

/**
 * No changes to `propKey` once order is complete or canceled
 * @param {*} o - the order
 * @param {*} propKey
 * @returns {string | null} the key or `null`
 */
export const freezeOnCompletion = (propKey) => (o) => {
  return [OrderStatus.COMPLETE, OrderStatus.CANCELED].includes(
    o[PREVMODEL].orderStatus
  )
    ? propKey
    : null;
};

/**
 * If not a registered customer, provide shipping & payment details.
 * @param {*} o
 * @param {*} propKey
 * @returns {string | void} the key or `void`
 */
export const requiredForGuest = (propKey) => (o) => {
  return o.customerId ? null : propKey;
};

/**
 * Value required to complete order
 * @param {*} o
 * @param {*} propKey
 * @returns {string | void} the key or `void`
 */
export const requiredForCompletion = (propKey) => (o) => {
  if (!o.orderStatus) return;
  return o.orderStatus === OrderStatus.COMPLETE ? propKey : void 0;
};

const invalidStatusChange = (from, to) => (o, propVal) => {
  return propVal === to && o[PREVMODEL].orderStatus === from;
};

const invalidStatusChanges = [
  // Can't change back to pending once approved
  invalidStatusChange(OrderStatus.APPROVED, OrderStatus.PENDING),
  // Can't change back to pending once shipped
  invalidStatusChange(OrderStatus.SHIPPING, OrderStatus.PENDING),
  // Can't change back to approved once shipped
  invalidStatusChange(OrderStatus.SHIPPING, OrderStatus.APPROVED),
  // Can't change directly to shipping from pending
  invalidStatusChange(OrderStatus.PENDING, OrderStatus.SHIPPING),
  // Can't change directly to complete from pending
  invalidStatusChange(OrderStatus.PENDING, OrderStatus.COMPLETE),
];

/**
 * Check that status changes are valid
 */
export const statusChangeValid = (o, propVal) => {
  if (!o[PREVMODEL]?.orderStatus) return true;

  if (invalidStatusChanges.some((isc) => isc(o, propVal))) {
    throw new Error("invalid status change");
  }
  return true;
};

/**
 *
 * @param {*} o
 * @param {*} propVal
 */
export const orderTotalValid = (o, propVal) => {
  return calcTotal(o.orderItems) === propVal;
};

/**
 * Recalculate order total
 * @param {object} o - the object (order)
 * @param {number} propVal - the property value
 */
export const recalcTotal = (o, propVal) => ({
  orderTotal: calcTotal(propVal),
});

/**
 * Updated signature requirement if `orderTotal` above certain value
 * @param {object} o - the object (order)
 * @param {number} propVal - the property value
 */
export const updateSignature = (o, propVal) => ({
  signatureRequired:
    calcTotal(propVal) > 999.99 || o[PREVMODEL].signatureRequired,
});

/**
 * Don't delete orders before they're complete.
 */
export function readyToDelete(model) {
  if (
    ![OrderStatus.COMPLETE, OrderStatus.CANCELED].includes(model.orderStatus)
  ) {
    throw new Error("order status incomplete");
  }
  return model;
}

/**
 *
 * @param {*} error
 * @param {*} func
 */
function handleError(error, func) {
  console.error({ func, error });
  throw new Error(error);
}

async function checkProperty(order, key) {
  if (Array.isArray(key)) {
    return key
      .map((k) => checkProperty(order, k))
      .reduce((c, p) => ({ ...p, ...c }));
  }
  if (order[key]) {
    return order;
  }
  const update = await order.find();
  if (update?.[key]) {
    return update;
  }
  throw new Error("%s is missing", key);
}

function makeObject(prop) {
  if (Array.isArray(prop)) {
    return prop.reduce((p, c) => ({ ...c, ...p }));
  }
  return prop;
}

async function _checkProperty(
  key,
  options = {},
  payload = {},
  func = _checkProperty.name
) {
  const { model } = options;

  if (!model || !payload || !key) {
    console.error({
      func,
      error: "model, payload, or key is missing",
      model,
      payload,
      key,
    });
    return {};
  }

  if (Array.isArray(key)) {
    const keys = await Promise.all(
      key.map((k) => _checkProperty(k, options, payload, func))
    );
    return keys;
  }

  if (payload[key]) {
    return { [key]: payload[key] };
  }

  if (model[key]) {
    return { [key]: model[key] };
  }

  const latest = await model.find();
  if (latest?.[key]) {
    return { [key]: latest[key] };
  }

  const error = "property is missing " + key;

  console.error({ func, error, payload, model, latest });

  throw new Error(error);
}

/**
 * Callback invoked by adapter when payment is complete
 * @param {{model:Order}} options
 */
export async function paymentCompleted({ model: order }) {
  return order.update({ orderStatus: OrderStatus.COMPLETE });
}

/**
 * Callback invoked by adapter when delivery is verified.
 * @param {{model:Order}} options
 * @param {string} proofOfDelivery
 */
export async function deliveryVerified(options = {}, payload = {}) {
  const changes = await _checkProperty(
    "proofOfDelivery",
    options,
    payload,
    deliveryVerified.name
  );
  return order.update(changes);
}

/**
 * Handle shipment tracking update
 * @param {{model: Order }} options
 * @param {string} trackingId
 * @param {string} trackingStatus
 */
export async function trackingUpdate(options = {}, payload = {}) {
  const { model } = options;

  const props = await _checkProperty(
    ["trackingStatus", "trackingId"],
    options,
    payload,
    trackingUpdate.name
  );

  const update = await model.update(makeObject(props));

  return {
    done: payload.trackingStatus === "orderDelivered",
    order: update,
  };
}

/**
 * Callback invoked by shipping adapter when order is picked up.
 * @param {{model:Order}} options
 * @param {string} shipmentId
 */
export async function orderShipped(options = {}, payload = {}) {
  const { model: order } = options;
  const prop = _checkProperty(
    "shipmentId",
    options,
    payload,
    orderShipped.name
  );
  return order.update({ prop, orderStatus: OrderStatus.SHIPPING });
}

/**
 * Callback invoked when order is ready for pickup
 * @param {{ model:Order }} options
 */
export async function orderPicked(options, pickupAddress) {
  const { model: order } = options;
  if (!pickupAddress) {
    return checkProperty(order, "pickupAddress");
  }
  const update = await order.update({ pickupAddress });
  return update;
}

/**
 *
 * @param {{ model:Order }} options
 * @param {string} shippingAddress
 */
export async function addressValidated(options = {}, payload = {}) {
  const prop = _checkProperty(
    "shippingAddress",
    options,
    payload,
    addressValidated.name
  );

  const update = await order.update(prop);
  return update;
}

/**
 * Called by adapter when port recevies response from payment service.
 * @param {{ model:Order }} options
 * @param {*} paymentAuthorization
 */
export async function paymentAuthorized(options = {}, payload = {}) {
  const { model: order } = options;

  const prop = _checkProperty(
    "paymentAuthorization",
    options,
    payload,
    paymentAuthorized.name
  );

  return order.update(prop);
}

export async function refundPayment(options = {}, payload = {}) {
  const { model: order } = options;

  const prop = _checkProperty(
    "paymentAuthorization",
    options,
    payload,
    paymentAuthorized.name
  );
  return order.update(prop);
}

/**
 * Starts the order service workflow.
 */
const OrderActions = {
  /**
   * Verifies the shipping address and authorizes payment
   * for the order total when the order is first created.
   * @param {Order} order - the order
   */
  [OrderStatus.PENDING]: async (order) => {
    try {
      if (order.customerId) {
        const customer = await order.customer();

        if (!customer) {
          throw new Error("invalid customer id", order.customerId);
        }

        const decrypted = customer.decrypt();

        const updated = await order.update({
          creditCardNumber: decrypted.creditCardNumber,
          shippingAddress: decrypted.shippingAddress,
          billingAddress: decrypted.billingAddress,
          email: decrypted.email,
          firstName: customer.firstName,
          lastName: decrypted.lastName,
        });

        // Need a synchronous response
        const result = await Promise.all([
          updated.validateAddress(addressValidated),
          updated.authorizePayment(paymentAuthorized),
        ]);
        return result;
      }

      // Need a synchronous response
      const result = await Promise.all([
        order.validateAddress(addressValidated),
        order.authorizePayment(paymentAuthorized),
      ]);
      return result;
    } catch (error) {
      handleError(error, OrderStatus.PENDING);
    }
  },
  /**
   * Pick the order and specify the pickup location
   * @param {Order} order
   */
  [OrderStatus.APPROVED]: async (order) => {
    try {
      // don't block the caller waiting for promise
      order.pickOrder(orderPicked);
    } catch (error) {
      handleError(error, OrderStatus.APPROVED);
    }
  },
  /**
   * Useful if we need to restart tracking
   * @param {Order} order
   */
  [OrderStatus.SHIPPING]: async (order) => {
    try {
      // don't block the caller waiting for this
      order.trackShipment(trackingUpdate);
    } catch (error) {
      handleError(error, OrderStatus.SHIPPING);
    }
  },
  /**
   * Start cancellation process
   * @param {Order} order
   */
  [OrderStatus.CANCELED]: async (order) => {
    try {
      order.undo();
    } catch (error) {
      handleError(error, OrderStatus.CANCELED);
    }
  },
  /**
   *
   * @param {Order} order
   */
  [OrderStatus.COMPLETE]: async (order) => {
    console.log("do customer sentiment etc");
    return;
  },
};

/**
 *
 * @param {Order} order
 */
export async function handleStatusChange(order) {
  return OrderActions[order.orderStatus](order);
}

/**
 * @param {{model:Order}}
 */
export async function handleOrderEvent({ model: order, eventType, changes }) {
  if (changes?.orderStatus || eventType === "CREATE") {
    await handleStatusChange(order);
  }
}

function needsSignature(input, orderTotal) {
  typeof input === "boolean" ? requireSignature : orderTotal > 999.99;
}

/**
 * Returns factory function for the Order model.
 * @param {*} dependencies - inject dependencies
 */
export function orderFactory(dependencies) {
  return async function createOrder({
    email,
    lastName,
    firstName,
    customerId,
    orderItems,
    billingAddress = null,
    shippingAddress = null,
    creditCardNumber = null,
    requireSignature,
  }) {
    const total = calcTotal(orderItems);
    // checkFormat(creditCardNumber, "creditCard");
    const order = {
      email,
      lastName,
      firstName,
      customerId,
      orderItems,
      creditCardNumber,
      billingAddress,
      shippingAddress,
      signatureRequired: needsSignature(requireSignature, total),
      [orderTotal]: total,
      [orderStatus]: OrderStatus.PENDING,
      [orderNo]: dependencies.uuid(),
    };
    return Object.freeze(order);
  };
}

export async function approve(order) {
  const updated = await order.update({ orderStatus: OrderStatus.APPROVED });
  handleStatusChange(updated);
}

/**
 *
 * @param {{model:Order}} param0
 */
export function errorCallback({ port, model: order, error }) {
  console.error("error...", port, error);
  order.undo();
}

/**
 *
 * @param {{model:Order}} param0
 */
export function timeoutCallback({ port, ports, adapterFn, model: order }) {
  console.error("timeout...", port);
  order.undo();
}

export function handleLatePickup({ model: order }) {
  console.log(handleLatePickup.name);
}

export async function returnInventory({ model }) {
  console.log(returnInventory.name);
}

export async function returnShipment({ model }) {
  console.log(returnShipment.name);
}

export async function returnDelivery({ model }) {
  console.log(returnDelivery.name);
}

export async function cancelPayment({ model }) {
  console.log(cancelPayment.name);
}

export async function compensate({ model }) {
  model.undo();
}
