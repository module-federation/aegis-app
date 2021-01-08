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
  handleStatusChange,
  updateSignature,
} from "../models/order";

import {
  processUpdate,
  requirePropertiesMixin,
  freezePropertiesMixin,
  updatePropertiesMixin,
  validatePropertiesMixin,
} from "../models/mixins";

import { uuid } from "../lib/utils";

/**
 * @type {import('../models/index').ModelSpecification}
 */
export const Order = {
  modelName: "order",
  endpoint: "orders",
  factory: orderFactory,
  dependencies: { uuid },
  mixins: [
    requirePropertiesMixin(
      "orderItems",
      "customerInfo",
      "billingAddress",
      "shippingAddress",
      "creditCardNumber",
      requiredForCompletion("proofOfDelivery")
    ),
    freezePropertiesMixin(
      "orderNo",
      "customerInfo",
      freezeOnApproval([
        "orderItems",
        "orderTotal",
        "creditCardNumber",
        "shippingAddress",
        "billingAddress",
      ]),
      freezeOnCompletion("*")
    ),
    updatePropertiesMixin([
      {
        propKey: "orderItems",
        update: recalcTotal,
      },
      {
        propKey: "orderItems",
        update: updateSignature,
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
      timeoutSeconds: 0,
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
      // disabled: true,
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
      timeoutSeconds: 20,
      retryMinutes: 2,
      undo: returnInventory,
    },
    shipOrder: {
      service: "Shipping",
      type: "outbound",
      callback: orderShipped,
      consumesEvent: "orderPicked",
      producesEvent: "orderShipped",
      timeoutSeconds: 20,
      retryMinutes: 2,
      undo: returnShipment,
    },
    trackShipment: {
      service: "Shipping",
      type: "outbound",
      callback: trackingUpdate,
      consumesEvent: "orderShipped",
      producesEvent: "orderDelivered",
      timeoutSeconds: 20,
      retryMinutes: 2,
    },
    verifyDelivery: {
      service: "Shipping",
      type: "outbound",
      callback: deliveryVerified,
      consumesEvent: "orderDelivered",
      producesEvent: "deliveryVerified",
      timeoutSeconds: 20,
      retryMinutes: 2,
      undo: returnDelivery,
    },
    completePayment: {
      service: "Payment",
      type: "outbound",
      callback: paymentCompleted,
      consumesEvent: "deliveryVerified",
      producesEvent: "paymentCompleted",
      timeoutSeconds: 20,
      retryMinutes: 2,
      undo: refundPayment,
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
  relations: {
    customer: {
      modelName: "customer",
      primaryKey: "custId",
      foreignKey: "customerInfo",
      type: "referencesOne",
    },
  },
  accessControlList: {
    admin: {
      allow: ["read", "delete", "decrypt"],
      decrypt: (order) => ({ ...order, ...order.decrypt() }),
      type: ["userRole", "custom"],
    },
    owner: {
      allow: "*",
      deny: "delete",
      type: "userRole",
    },
    delegate: {
      allow: "*",
      deny: "delete",
      type: "userRole",
    },
    approver: {
      allow: [
        "approve",
        "deny",
        (order) => order.status === OrderStatus.PENDING,
      ],
      approve: (order) =>
        handleStatusChange(order.update({ orderStatus: OrderStatus.APPROVED })),
      deny: (order) =>
        handleStatusChange(order.update({ orderStatus: OrderStatus.CANCELED })),
      type: ["userRole", "custom"],
    },
    customer: {
      allow: "read",
      type: "modelRelation",
    },
  },
  // serializers: [
  //   {
  //     on: "deserialize",
  //     key: "creditCardNumber",
  //     type: "string",
  //     value: (key, value) => decrypt(value),
  //   },
  //   {
  //     on: "deserialize",
  //     key: "shippingAddress",
  //     type: "string",
  //     value: (key, value) => decrypt(value),
  //   },
  //   {
  //     on: "deserialize",
  //     key: "billingAddress",
  //     type: "string",
  //     value: (key, value) => decrypt(value),
  //   },
  // ],
};
