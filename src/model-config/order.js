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
      timeout: 20,
      retryTimeout: 60,
      undo: returnInventory,
    },
    shipOrder: {
      service: "Shipping",
      type: "outbound",
      callback: orderShipped,
      consumesEvent: "orderPicked",
      producesEvent: "orderShipped",
      timeout: 20,
      retryTimeout: 60,
      undo: returnShipment,
    },
    trackShipment: {
      service: "Shipping",
      type: "outbound",
      callback: trackingUpdate,
      consumesEvent: "orderShipped",
      producesEvent: "orderDelivered",
      timeoutCallback: ({ model }) => model.compensate(),
      timeout: 20,
      retryTimeout: 60,
    },
    verifyDelivery: {
      service: "Shipping",
      type: "outbound",
      callback: deliveryVerified,
      consumesEvent: "orderDelivered",
      producesEvent: "deliveryVerified",
      timeoutCallback: ({ model }) => model.compensate(),
      timeout: 20,
      retryTimeout: 60,
      undo: returnDelivery,
    },
    completePayment: {
      service: "Payment",
      type: "outbound",
      callback: paymentCompleted,
      consumesEvent: "deliveryVerified",
      producesEvent: "paymentCompleted",
      timeout: 20,
      retryTimeout: 60,
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
      set allow(allow) {
        this.allow = (delegator) => [...delegator.permissions];
      },
      get allow() {
        return this.allow;
      },
      deny: "delete",
      type: "role",
    },
    approver: {
      //allow: (approve = (orderStatus) => orderStatus === OrderStatus.PENDING),
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
