"use strict";

import {
  orderFactory,
  readyToDelete,
  handleOrderEvent,
  orderShipped,
  trackingUpdate,
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
  updateSignature,
  requiredForGuest,
  approve,
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
      requiredForGuest([
        "lastName",
        "firstName",
        "billingAddress",
        "shippingAddress",
        "creditCardNumber",
        "email",
      ]),
      requiredForCompletion("proofOfDelivery")
    ),
    freezePropertiesMixin(
      "orderNo",
      "customerId",
      freezeOnApproval([
        "email",
        "lastName",
        "firstName",
        "orderItems",
        "orderTotal",
        "billingAddress",
        "shippingAddress",
        "creditCardNumber",
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
      type: "outbound",
      timeout: 0,
    },
    notify: {
      service: "Event",
      type: "outbound",
      timeout: 0,
    },
    save: {
      service: "Persistence",
      type: "outbound",
      timeout: 0,
    },
    find: {
      service: "Persistence",
      type: "outbound",
      timeout: 0,
    },
    validateAddress: {
      service: "Address",
      type: "outbound",
      keys: "shippingAddress",
      consumesEvent: "startOrder",
      producesEvent: "addressValidated",
      disabled: true,
    },
    authorizePayment: {
      service: "Payment",
      type: "outbound",
      keys: "paymentAuthorization",
      consumesEvent: "startOrder",
      producesEvent: "paymentAuthorized",
      undo: cancelPayment,
    },
    pickOrder: {
      service: "Inventory",
      type: "outbound",
      keys: "pickupAddress",
      consumesEvent: "pickOrder",
      producesEvent: "orderPicked",
      timeout: 30,
      maxRetry: 5,
      undo: returnInventory,
    },
    shipOrder: {
      service: "Shipping",
      type: "outbound",
      callback: orderShipped,
      consumesEvent: "orderPicked",
      producesEvent: "orderShipped",
      timeout: 30,
      maxRetry: 5,
      undo: returnShipment,
    },
    trackShipment: {
      service: "Shipping",
      type: "outbound",
      callback: trackingUpdate,
      consumesEvent: "orderShipped",
      producesEvent: "orderDelivered",
      timeout: 30,
      maxRetry: 5,
    },
    verifyDelivery: {
      service: "Shipping",
      type: "outbound",
      keys: "proofOfDelivery",
      consumesEvent: "orderDelivered",
      producesEvent: "deliveryVerified",
      undo: returnDelivery,
      timeout: 30,
      maxRetry: 5,
    },
    completePayment: {
      service: "Payment",
      type: "outbound",
      callback: paymentCompleted,
      consumesEvent: "deliveryVerified",
      producesEvent: "paymentCompleted",
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
    createCustomer: {
      service: "Customer",
      type: "outbound",
      consumesEvent: "addCustomerFromOrder",
      producesEvent: "newCustomerFromOrder",
    },
  },
  relations: {
    customer: {
      modelName: "customer",
      foreignKey: "customerId",
      type: "manyToOne",
      desc: "Many orders per customer, one customer per order",
    },
  },
  commands: {
    decrypt: {
      command: "decrypt",
      acl: ["read", "decrypt"],
    },
    approve: {
      command: approve,
      acl: ["write", "approve"],
    },
  },
  accessControlList: {
    admin: {
      allow: ["read", "delete", "decrypt"],
      type: "role",
    },
    owner: {
      allow: "*",
      deny: "delete",
      type: "role",
    },
    delegate: {
      allow: (delegator) => [...delegator.permissions],
      deny: "delete",
      type: "role",
    },
    approver: {
      allow: "approve",
      type: "role",
    },
    orders: {
      allow: "read",
      type: "relation",
      desc: "Allow customer model to see orders",
    },
  },
  serializers: [
    {
      on: "deserialize",
      key: "creditCardNumber",
      type: "string",
      value: (key, value) => decrypt(value),
      enabled: false,
    },
    {
      on: "deserialize",
      key: "shippingAddress",
      type: "string",
      value: (key, value) => decrypt(value),
      enabled: false,
    },
    {
      on: "deserialize",
      key: "billingAddress",
      type: "string",
      value: (key, value) => decrypt(value),
      enabled: false,
    },
  ],
};
