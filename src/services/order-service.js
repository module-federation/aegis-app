"use strict";
import { RestOrderAdapter } from "../adapters/order-adapter";
const url = process.env.ORDER_SVC_URL || "http://localhost:8070/api/orders/";

export class OrderInfo {
  constructor() {}
  firstName;
  lastName;
  email;
  billingAddress;
  shippingAddress;
  creditCardNumber;
}

export class OrderService {
  constructor(adapter = RestOrderAdapter) {
    this.adapter = new adapter(url);
  }

  getOrderId() {
    return this.adapter.orderId;
  }

  addOrder(orderInfo) {
    this.adapter.addOrder(orderInfo);
    return this;
  }

  addOrderItem(itemId, price, qty = 1) {
    this.adapter.addOrderItem(itemId, price, qty);
    return this;
  }

  async createOrder() {
    await this.adapter.createOrder();
    return this;
  }

  async submitOrder(orderId = this.adapter.orderId) {
    await this.adapter.submitOrder(orderId);
    return this;
  }

  async getOrder(orderId = this.adapter.orderId) {
    if (!this.adapter.order) await this.adapter.getOrder();
    return this.adapter.order;
  }

  async getOrderStatus(orderId = this.adapter.orderId) {
    if (!this.adapter.order) await this.adapter.getOrder();
    return this.adapter.order.orderStatus;
  }

  async getOrderTotal(orderId = this.adapter.orderId) {
    if (!this.adapter.order) await this.adapter.getOrder();
    return this.adapter.order.orderTotal;
  }
}

/**
 * Calls the order service remotely (via REST).
 * Calls locally for testing purposes (local: true).
 */
// class OrderService {

//   get orderId() {
//     return this._orderId;
//   }

//   set orderId(value) {
//     this._orderId = value;
//   }

//   printOrderId() {
//     console.log(this.orderId);
//   }

//   constructor({
//     customerInfo,
//     orderItems = [],
//     creditCardNumber,
//     shippingAddress,
//     billingAddress,
//     local = false
//   } = {}) {
//     this.orderInfo = {
//       customerInfo,
//       orderItems,
//       creditCardNumber,
//       shippingAddress,
//       billingAddress,
//     };
//     this.local = local;
//   }

//   async handleStatusChange(status) {
//     require('../domain/order').statusChangeValid(this.order, status);
//     this.order.orderStatus = status;
//     await require('../domain/order').handleStatusChange(this.order);
//   }

//   addOrderItem(itemId, price, qty = 1) {
//     if (typeof itemId !== 'string') {
//       throw new Error('must include item id');
//     }
//     if (typeof price !== 'number') {
//       throw new Error('price must be a number');
//     }
//     if (typeof qty !== 'number') {
//       throw new Error('qty must be a number');
//     }
//     this.orderInfo.orderItems.push({ itemId, price, qty });
//     return this;
//   }

//   async createOrder() {
//     if (this.local) {
//       const Order = require('../domain').Order;
//       console.log(Order.dependencies);
//       const createOrder = Order.factory(Order.dependencies);
//       this.order = await createOrder(this.orderInfo)
//         .then(order => compose(...Order.mixins)(order));
//       this.orderId = this.order.orderId;
//       return this;
//     }
//   }

//   async submitOrder(orderId = this.orderId) {
//     if (this.local) {
//       await this.handleStatusChange('APPROVED');
//       return this;
//     }
//     return axios.patch(
//       orderServiceUrl + orderId,
//       { orderStatus: 'APPROVED' },
//     ).then((response) => {
//       this.orderId = response.data.modelId;
//       return this;
//     }, (error) => {
//       console.error(error.response.data);
//       throw new Error(error);
//     });
//   }

//   async shipOrder(orderId = this.orderId) {
//     if (this.local) {
//       await this.handleStatusChange('SHIPPING');
//       return this;
//     }
//     return axios.patch(
//       orderServiceUrl + orderId,
//       { orderStatus: 'SHIPPING' },
//     ).then((response) => {
//       this.orderId = response.data.modelId;
//       return this;
//     }, (error) => {
//       console.error(error.response.data);
//       throw new Error(error);
//     });
//   }

//   async deliverOrder(pod, orderId = this.orderId) {
//     if (!pod) {
//       throw new Error('require proof of delivery');
//     }
//     if (this.local) {
//       await this.handleStatusChange('COMPLETE');
//       return this;
//     }

//   }

//   async cancelOrder(reason, orderId = this.orderId) {
//     if (!reason) {
//       throw new Error('reason required to cancel');
//     }

//     return axios.patch(
//       orderServiceUrl + orderId,
//       { orderStatus: 'CANCELED', cancelReason: reason },
//     ).then((response) => {
//       this.orderId = response.data.modelId;
//       return this;
//     }, (error) => {
//       console.error(error.response.data);
//       throw new Error(error);
//     });
//   }

//   async subscribe(filter) {

//   }
// }

module.exports.OrderService = OrderService;
