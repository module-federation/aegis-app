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
  requireProperties,
  freezeProperties,
  updateProperties,
  validateProperties,
  validateModel,
  createMethod,
  execMethod,
  invokePort,
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
    requireProperties(
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
    freezeProperties(
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
    updateProperties([
      {
        propKey: "orderItems",
        update: recalcTotal,
      },
      {
        propKey: "orderItems",
        update: updateSignature,
      },
    ]),
    validateProperties([
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
      {
        propKey: "email",
        regex: "email",
      },
      {
        propKey: "creditCardNumber",
        regex: "creditCard",
      },
      {
        propKey: "phone",
        regex: "phone",
      },
    ]),
  ],
  validate: validateModel,
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
      consumesEvent: "startWorkflow",
      producesEvent: "addressValidated",
      disabled: true,
    },
    authorizePayment: {
      service: "Payment",
      type: "outbound",
      keys: "paymentAuthorization",
      consumesEvent: "startWorkflow",
      producesEvent: "paymentAuthorized",
      undo: cancelPayment,
    },
    pickOrder: {
      service: "Inventory",
      type: "outbound",
      keys: "pickupAddress",
      consumesEvent: "pickOrder",
      producesEvent: "orderPicked",
      undo: returnInventory,
    },
    shipOrder: {
      service: "Shipping",
      type: "outbound",
      callback: orderShipped,
      consumesEvent: "orderPicked",
      producesEvent: "orderShipped",
      undo: returnShipment,
    },
    trackShipment: {
      service: "Shipping",
      type: "outbound",
      callback: trackingUpdate,
      consumesEvent: "orderShipped",
      producesEvent: "orderDelivered",
    },
    verifyDelivery: {
      service: "Shipping",
      type: "outbound",
      keys: "proofOfDelivery",
      consumesEvent: "orderDelivered",
      producesEvent: "deliveryVerified",
      undo: returnDelivery,
    },
    completePayment: {
      service: "Payment",
      type: "outbound",
      callback: paymentCompleted,
      consumesEvent: "deliveryVerified",
      producesEvent: "workflowComplete",
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
      allow: delegator => [...delegator.permissions],
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
