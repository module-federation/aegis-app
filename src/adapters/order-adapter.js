"use strict";

import { response } from "express";

const axios = require("axios");

export class OrderAdapter {
  constructor() {}

  addOrder({
    customerInfo,
    orderItems = [],
    creditCardNumber,
    shippingAddress,
    billingAddress,
  } = {}) {
    this.orderInfo = {
      customerInfo,
      orderItems,
      creditCardNumber,
      shippingAddress,
      billingAddress,
    };
    return this;
  }

  addOrderItem(itemId, price, qty = 1) {
    if (![typeof price, typeof qty].indexOf("number") === 0) {
      throw new Error("qty and price must be numbers");
    }
    if (!itemId || typeof itemId !== "string") {
      throw new Error("itemId must be a non-null string");
    }
    this.orderInfo.orderItems.push({ itemId, price, qty });
    return this;
  }

  async createOrder() {
    throw new Error("unimplemented abstract method");
  }

  async submitOrder(orderId = this.orderId) {
    throw new Error("unimplemented abstract method");
  }

  completeOrder() {
    throw new Error("unimplemented abstract method");
  }

  cancelOrder() {
    throw new Error("unimplemented abstract method");
  }
}

// export class LocalOrderAdapter extends OrderAdapter {
//   /**
//    * @override
//    */
//   createOrder() {
//     const Order = require('../models').Order;
//     const createOrder = Order.factory(Order.dependencies);
//     this.order = await createOrder(this.orderInfo)
//       .then(order => compose(...Order.mixins)(order));
//     this.orderId = this.order.orderId;
//     return this;
//   }

//   async handleStatusChange(status) {
//     require('../models/order').statusChangeValid(this.order, status);
//     await require('../models/order').handleStatusChange({
//       ...this.order,
//       orderStatus: status,
//     });
//   }

//   submitOrder() {
//     await this.handleStatusChange('APPROVED');
//     return this;
//   }

//   fillOrder() {
//   }
//   shipOrder() {
//   }
//   trackShipment() {
//   }
//   verifyDelivery() {
//   }
//   completeOrder() {
//   }
//   cancelOrder() {
//     await this.handleStatusChange('CANCELED');
//     return this;
//   }
// }

export class RestOrderAdapter extends OrderAdapter {
  constructor(url) {
    super();
    this.url = url;
  }
  /**
   * @override
   */
  async createOrder() {
    return axios.post(this.url, this.orderInfo).then(
      (response) => {
        this.orderId = response.data.modelId;
        return this;
      },
      (error) => {
        console.error(error.response.data);
      }
    ).catch(e => console.log(e));
  }

  /**
   * @override
   * @param {*} orderId
   */
  async submitOrder(orderId = this.orderId) {
    return axios.patch(this.url + orderId, { orderStatus: "APPROVED" }).then(
      () => this,
      (error) => {
        console.error(error.response.data);
        throw new Error(error);
      }
    );
  }

  async getOrder(orderId = this.orderId) {
    return axios.get(this.url + orderId).then(
      (response) => {
        console.log(response.data);
        this.order = response.data.model;
        return this.order;
      },
      (error) => {
        console.error(error.response.data);
        throw new Error(error);
      }
    );
  }

  async getOrderStatus(orderId = this.orderId) {
    const order = await this.getOrder(orderId);
    return order.orderStatus;
  }

  shipOrder() {
    return axios.patch(this.url + orderId, { orderStatus: "SHIPPING" }).then(
      (response) => {
        this.orderId = response.data.modelId;
        return this;
      },
      (error) => {
        console.error(error.response.data);
        throw new Error(error);
      }
    );
  }

  completeOrder() {
    return axios
      .patch(this.url + orderId, {
        orderStatus: "COMPLETE",
        proofOfDelivery: pod,
      })
      .then(
        (response) => {
          this.orderId = response.data.modelId;
          return this;
        },
        (error) => {
          console.error(error.response.data);
          throw new Error(error);
        }
      );
  }

  cancelOrder() {
    return axios
      .patch(this.url + orderId, {
        orderStatus: "CANCELED",
        cancelReason: reason,
      })
      .then(
        (response) => {
          this.orderId = response.data.modelId;
          return this;
        },
        (error) => {
          console.error(error.response.data);
          throw new Error(error);
        }
      );
  }
}

export class GraphQlOrderAdapter extends OrderAdapter {
  /**
   * @override
   */
  createOrder() {}
  submitOrder() {}
  fillOrder() {}
  shipOrder() {}
  trackShipment() {}
  verifyDelivery() {}
  completeOrder() {}
  cancelOrder() {}
}
