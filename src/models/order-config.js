"use strict";

import {
  orderFactory,
  readyToDelete,
  handleOrderEvent,
  addressValidated,
  paymentAuthorized,
  orderPicked,
  orderShipped,
  trackingUpdate,
  handleLatePickup,
  deliveryVerified,
  paymentCompleted,
  OrderStatus,
  recalcTotal,
  requiredForCompletion,
  statusChangeValid,
  freezeOnApproval,
  freezeOnCompletion,
  orderTotalValid,
  returnInventory,
  returnShipment,
  refundPayment,
  returnDelivery,
  cancelPayment,
  timeoutCallback,
} from "./order";

import {
  processUpdate,
  requirePropertiesMixin,
  freezePropertiesMixin,
  updatePropertiesMixin,
  validatePropertiesMixin,
} from "./mixins";

/**
 * @type {import('./index').ModelSpecification}
 */
const Order = {
  modelName: "order",
  endpoint: "orders",
  factory: orderFactory,
  mixins: [
    requirePropertiesMixin(
      "customerInfo",
      "orderItems",
      "creditCardNumber",
      "shippingAddress",
      "billingAddress",
      requiredForCompletion("proofOfDelivery")
    ),
    freezePropertiesMixin(
      "orderNo",
      "customerInfo",
      freezeOnApproval("orderItems"),
      freezeOnApproval("creditCardNumber"),
      freezeOnApproval("shippingAddress"),
      freezeOnApproval("billingAddress"),
      freezeOnCompletion("orderStatus")
    ),
    updatePropertiesMixin([
      {
        propKey: "orderItems",
        update: recalcTotal,
      },
    ]),
    validatePropertiesMixin([
      {
        propKey: "orderStatus",
        values: Object.values(OrderStatus),
        isValid: statusChangeValid,
      },
      {
        propKey: "orderTotal",
        maxnum: 99999.99,
        isValid: orderTotalValid,
      },
    ]),
  ],
  onUpdate: processUpdate,
  onDelete: readyToDelete,
  eventHandlers: [handleOrderEvent],
  ports: {
    listen: {
      service: "Event",
      type: "inbound",
      timeout: 0,
    },
    notify: {
      service: "Event",
      type: "outbound",
    },
    save: {
      service: "Persistence",
      type: "outbound",
    },
    find: {
      service: "Persistence",
      type: "outbound",
    },
    validateAddress: {
      service: "Address",
      type: "outbound",
      callback: addressValidated,
      consumesEvent: "validateAddress",
      producesEvent: "addressValidated",
      disabled: true,
    },
    authorizePayment: {
      service: "Payment",
      type: "outbound",
      callback: paymentAuthorized,
      consumesEvent: "authorizePayment",
      producesEvent: "paymentAuthorized",
      undo: cancelPayment,
    },
    pickOrder: {
      service: "Inventory",
      type: "outbound",
      callback: orderPicked,
      consumesEvent: "pickOrder",
      producesEvent: "orderPicked",
      timeout: 440000000,
      undo: returnInventory,
    },
    shipOrder: {
      service: "Shipping",
      type: "outbound",
      timeout: 440000000,
      callback: orderShipped,
      consumesEvent: "orderPicked",
      producesEvent: "orderShipped",
      timeoutCallback: handleLatePickup,
      undo: returnShipment,
    },
    trackShipment: {
      service: "Shipping",
      type: "outbound",
      timeout: 440000000,
      callback: trackingUpdate,
      consumesEvent: "orderShipped",
      producesEvent: "orderDelivered",
    },
    verifyDelivery: {
      service: "Shipping",
      type: "outbound",
      timeout: 10000,
      callback: deliveryVerified,
      consumesEvent: "orderDelivered",
      producesEvent: "deliveryVerified",
      undo: returnDelivery,
    },
    completePayment: {
      service: "Payment",
      type: "outbound",
      callback: paymentCompleted,
      consumesEvent: "deliveryVerified",
      producesEvent: "paymentCompleted",
      undo: refundPayment,
      timeout: 1000,
      timeoutCallback,
    },
    cancelShipment: {
      service: "Shipping",
      type: "outbound",
    },
    refundPayment: {
      service: "Payment",
      type: "outbound",
    },
  },
};

export default Order;
