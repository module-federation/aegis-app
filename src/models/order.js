"use strict";

import GlobalMixins, {
  processUpdate,
  checkFormat,
  PREVMODEL,
  encryptPersonalInfo,
} from "./mixins";

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
export const checkItems = function (items) {
  if (!items) {
    throw new Error("order contains no items");
  }
  const _items = Array.isArray(items) ? items : [items];

  if (
    _items.length > 0 &&
    _items.every((i) => i["itemId"] && typeof i["price"] === "number")
  ) {
    return _items;
  }
  throw new Error("order items invalid");
};

/**
 *
 * @param {*} items
 */
export const calcTotal = function (items) {
  const _items = checkItems(items);
  return _items.reduce((total, item) => {
    return (total += item.price);
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
 * Value required to complete order
 * @param {*} o
 * @param {*} propKey
 * @returns {string | void} the key or `void`
 */
export const requiredForCompletion = (propKey) => (o) => {
  if (!o.orderStatus) {
    return;
  }
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
  if (!o[PREVMODEL]?.orderStatus) {
    return true;
  }
  if (invalidStatusChanges.some((i) => i(o, propVal))) {
    throw new Error("invalid status change");
  }
  return true;
};

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
 * Get last saved copy
 * @param {Order} order
 * @returns {Promise<Order>}
 */
async function findOrder(order) {
  const current = await order.find();
  if (!current) {
    return order;
  }
  return current;
}

/**
 * Run update against validations
 * @param {Order} order
 * @param {*} changes
 */
async function updateOrder(order, changes) {
  const current = await findOrder(order);
  const updated = processUpdate(current, changes);
  await updated.save();
  return updated;
}

/**
 * Callback invoked by adapter when payment is complete
 * @param {{model:Order}} options
 */
export async function paymentCompleted({ model: order }) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(order.update({ orderStatus: OrderStatus.COMPLETE }));
    }, 2000);
  });
}

/**
 * Callback invoked by adapter when delivery is verified.
 * @param {{model:Order}} options
 * @param {string} proofOfDelivery
 */
export async function deliveryVerified(options, proofOfDelivery) {
  const { model: order } = options;
  if (!proofOfDelivery) {
    throw new Error("proofOfDelivery missing");
  }
  return order.update({ proofOfDelivery });
}

/**
 * Handle shipment tracking update
 * @param {{model: Order }} options
 * @param {string} trackingId
 * @param {string} trackingStatus
 */
export async function trackingUpdate(options, trackingId, trackingStatus) {
  const { model: order } = options;
  if (!trackingId || !trackingStatus) {
    throw new Error("trackingId or trackingStatus missing");
  }
  return {
    done: trackingStatus === "orderDelivered",
    order: await order.update({ trackingId, trackingStatus }),
  };
}

/**
 * Callback invoked by shipping adapter when order is picked up.
 * @param {{model:Order}} options
 * @param {string} shipmentId
 */
export async function orderShipped(options, shipmentId) {
  const { model: order } = options;
  if (!shipmentId) {
    throw new Error("shipmentId missing");
  }
  return order.update({
    shipmentId,
    orderStatus: OrderStatus.SHIPPING,
  });
}

/**
 * In stock, ready for pickup
 * @param {{ model:Order }} options
 */
export async function orderPicked(options, pickupAddress) {
  const { model: order } = options;
  if (!pickupAddress) {
    throw new Error("pickupAddress is missing");
  }
  return order.update({
    pickupAddress,
  });
}

/**
 *
 * @param {{ model:Order }} options
 * @param {string} shippingAddress
 */
export async function addressValidated(options, shippingAddress) {
  const { model: order } = options;
  if (!shippingAddress) {
    throw new Error("shippingAddress is missing");
  }
  return order.update({ shippingAddress });
}

/**
 * Called by adapter when port recevies response from payment service.
 * @param {{ model:Order }} options
 * @param {*} paymentAuthorization
 */
export async function paymentAuthorized(options, paymentAuthorization) {
  const { model: order } = options;
  if (!paymentAuthorization) {
    throw new Error("paymentAuthorization is missing");
  }
  return order.update({ paymentAuthorization });
}

export async function refundPayment(options, receipt) {
  const { model: order } = options;
  if (!receipt) {
    throw new Error("receipt is missing");
  }
  return order.update({ receipt });
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
      // Need a synchronous response
      await Promise.all([
        order.validateAddress(addressValidated),
        order.authorizePayment(paymentAuthorized),
      ]);
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
      order.compensate();
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

/**
 * Returns factory function for the Order model.
 * @param {*} dependencies - inject dependencies
 */
export function orderFactory(dependencies) {
  return async function createOrder({
    customerInfo,
    orderItems,
    shippingAddress = null,
    billingAddress = null,
    creditCardNumber = null,
    signatureRequired = false,
  }) {
    checkItems(orderItems);
    checkFormat(creditCardNumber, "creditCard");
    const order = {
      customerInfo,
      orderItems,
      signatureRequired,
      creditCardNumber,
      billingAddress,
      shippingAddress,
      [orderTotal]: calcTotal(orderItems),
      [orderStatus]: OrderStatus.PENDING,
      [orderNo]: dependencies.uuid(),
      async update(changes) {
        return updateOrder(this, changes);
      },
    };
    return Object.freeze(order);
  };
}

/**
 *
 * @param {{model:Order}} param0
 */
export function errorCallback({ port, model: order, error }) {
  console.error("error...", port, error);
  order.compensate();
}

/**
 *
 * @param {{model:Order}} param0
 */
export function timeoutCallback({ port, model: order }) {
  console.error("timeout...", port);
  order.compensate();
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
  model.compensate();
}
