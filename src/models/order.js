"use strict";

import { prevmodel } from "./mixins";
import checkPayload from "./check-payload";

/**w
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
 * @property {function(string,Order)} emit - broadcast domain event
 * @property {function():boolean} paymentAuthorized - payment approved and funds reserved
 * @property {function():boolean} autoCheckout - whether or not to immediately submit the order
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
    items.every(i => i.itemId && typeof i.price === "number")
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
export const freezeOnApproval = propKey => o => {
  return o[prevmodel].orderStatus !== OrderStatus.PENDING ? propKey : null;
};

/**
 * No changes to `propKey` once order is complete or canceled
 * @param {*} o - the order
 * @param {*} propKey
 * @returns {string | null} the key or `null`
 */
export const freezeOnCompletion = propKey => o => {
  return [OrderStatus.COMPLETE, OrderStatus.CANCELED].includes(
    o[prevmodel].orderStatus
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
export const requiredForGuest = propKey => o => {
  return o.customerId ? null : propKey;
};

/**
 * Value required to approve order.
 * @param {*} propKey
 */
export const requiredForApproval = propKey => o => {
  if (!o.orderStatus) return;
  return o.orderStatus === OrderStatus.APPROVED ? propKey : void 0;
};

/**
 * Value required to complete order
 * @param {*} o
 * @param {*} propKey
 * @returns {string | void} the key or `void`
 */
export const requiredForCompletion = propKey => o => {
  if (!o.orderStatus) return;
  return o.orderStatus === OrderStatus.COMPLETE ? propKey : void 0;
};

const invalidStatusChange = (from, to) => (o, propVal) => {
  return propVal === to && o[prevmodel].orderStatus === from;
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
  if (!o[prevmodel]?.orderStatus) return true;

  if (invalidStatusChanges.some(isc => isc(o, propVal))) {
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
  signatureRequired: calcTotal(propVal) > 999.99 || o.signatureRequired,
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

/**
 * Callback invoked by adapter when payment is complete
 * @param {{model:Order}} options
 */
export async function paymentCompleted(options = {}, payload = {}) {
  const { model: order } = options;
  const changes = checkPayload(
    "confirmationCode",
    options,
    payload,
    paymentCompleted.name
  );
  return order.update({ ...changes, orderStatus: OrderStatus.COMPLETE });
}

/**
 * Callback invoked by adapter when delivery is verified.
 * @param {{model:Order}} options
 * @param {string} proofOfDelivery
 */
export async function deliveryVerified(options = {}, payload = {}) {
  const { model: order } = options;
  const changes = checkPayload(
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
  const { model: order } = options;
  const changes = checkPayload(
    ["trackingStatus", "trackingId"],
    options,
    payload,
    trackingUpdate.name
  );
  return order.update(changes);
}

/**
 * Callback invoked by shipping adapter when order is picked up.
 * @param {{model:Order}} options
 * @param {string} shipmentId
 */
export async function orderShipped(options = {}, payload = {}) {
  const { model: order } = options;
  const changes = checkPayload(
    "shipmentId",
    options,
    payload,
    orderShipped.name
  );
  return order.update(changes);
}

/**
 * Callback invoked when order is ready for pickup
 * @param {{ model:Order }} options
 */
export async function orderPicked(options = {}, payload = {}) {
  const { model: order } = options;
  const changes = checkPayload(
    "pickupAddress",
    options,
    payload,
    addressValidated.name
  );
  return order.update(changes);
}

/**
 *
 * @param {{ model:Order }} options
 * @param {string} shippingAddress
 */
export async function addressValidated(options = {}, payload = {}) {
  const { model: order } = options;
  const changes = checkPayload(
    "shippingAddress",
    options,
    payload,
    addressValidated.name
  );
  return order.update(changes);
}

/**
 * Called by adapter when port recevies response from payment service.
 * @param {{ model:Order }} options
 * @param {*} paymentAuthorization
 */
export async function paymentAuthorized(options = {}, payload = {}) {
  const { model: order } = options;
  const changes = checkPayload(
    "paymentAuthorization",
    options,
    payload,
    paymentAuthorized.name
  );
  console.log({
    order: 5,
    func: paymentAuthorized.name,
    options,
    payload,
    changes,
  });
  const update = await order.update(changes);
  return update;
}

export async function refundPayment(options = {}, payload = {}) {
  const { model: order } = options;
  const changes = checkPayload(
    "refundReceipt",
    options,
    payload,
    refundPayment.name
  );
  return order.update(changes);
}

/**
 * Copy existing customer data to the order if a valid ID was provided.
 *
 * @param {Order} order
 * @throws {"InvalidCustomerId"}
 */
async function getCustomerOrder(order) {
  if (order.customerId) {
    // Use the configured relation to fetch customer model
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
      lastName: decrypted.lastName,
      firstName: customer.firstName,
    });
    return updated;
  }
  return order;
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
  [OrderStatus.PENDING]: async order => {
    try {
      if (order.paymentAuthorized()) return;
      const customerOrder = await getCustomerOrder(order);

      // block the caller: we won't proceed w/o $$
      const [address, payment] = await Promise.all([
        customerOrder.validateAddress(addressValidated),
        customerOrder.authorizePayment(paymentAuthorized),
      ]);

      if (customerOrder.autoCheckout() && payment.paymentAuthorized()) {
        handleStatusChange({
          ...address,
          ...payment,
          orderStatus: OrderStatus.APPROVED,
        });
      }
    } catch (error) {
      handleError(error, OrderStatus.PENDING);
    }
  },
  /**
   * If payment is authorized, notify inventory.
   * This kicks off the rest of the workflow,
   * which is controlled through port config.
   * @param {Order} order
   */
  [OrderStatus.APPROVED]: async order => {
    try {
      if (order.paymentAuthorized()) {
        // don't block the caller awaiting
        order.pickOrder(orderPicked);
        return;
      }
      throw new Error("payment authorization problem");
    } catch (error) {
      handleError(error, OrderStatus.APPROVED);
    }
  },
  /**
   * Useful if we need to restart tracking.
   * @param {Order} order
   */
  [OrderStatus.SHIPPING]: async order => {
    try {
      // don't block the caller waiting for this
      order.trackShipment(trackingUpdate);
    } catch (error) {
      handleError(error, OrderStatus.SHIPPING);
    }
  },
  /**
   * Start cancellation process.
   * @param {Order} order
   */
  [OrderStatus.CANCELED]: async order => {
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
  [OrderStatus.COMPLETE]: async order => {
    console.log("do customer sentiment etc");
    return;
  },
};

/**
 * Call order service workflow
 * @param {Order} order
 */
export async function handleStatusChange(order) {
  return OrderActions[order.orderStatus](order);
}

/**
 * Called on create, update, delete of model instance.
 * @param {{model:Order}}
 */
export async function handleOrderEvent({ model: order, eventType, changes }) {
  if (changes?.orderStatus || eventType === "CREATE") {
    return handleStatusChange(order);
  }
}

/**
 * Require a signature for orders $1000 and up
 * @param {*} input
 * @param {*} orderTotal
 */
function needsSignature(input, orderTotal) {
  return typeof input === "boolean" ? input : orderTotal > 999.99;
}

/**
 * Returns factory function for the Order model.
 * @param {*} dependencies - inject dependencies
 */
export function orderFactory(dependencies) {
  return async function createOrder({
    orderItems,
    email = null,
    lastName = null,
    firstName = null,
    customerId = null,
    billingAddress = null,
    shippingAddress = null,
    creditCardNumber = null,
    shippingPriority = null,
    autoCheckout = false,
    requireSignature,
  }) {
    const total = calcTotal(orderItems);
    const signatureRequired = needsSignature(requireSignature, total);
    const order = {
      email,
      lastName,
      firstName,
      customerId,
      orderItems,
      creditCardNumber,
      billingAddress,
      shippingAddress,
      signatureRequired,
      shippingPriority,
      estimatedArrival: null,
      [orderTotal]: total,
      [orderStatus]: OrderStatus.PENDING,
      [orderNo]: dependencies.uuid(),
      /**
       * Has payment for the order been authorized?
       */
      paymentAuthorized() {
        return (
          (this.paymentAuthorization && !this[prevmodel]) ||
          (this.paymentAuthorization &&
            this[prevmodel].orderTotal <= this.orderTotal)
        );
      },
      /**
       * Should this order proceed to checkout automatically or wait for approval.
       */
      autoCheckout() {
        return autoCheckout;
      },
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
  try {
    await model.undo();
  } catch (error) {
    console.error(error);
  }
}
