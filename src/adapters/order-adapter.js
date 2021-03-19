"use strict";

const axios = require("axios");

export class OrderAdapter {
  constructor() {}

  addOrder({
    customerId,
    orderItems = [],
    creditCardNumber,
    shippingAddress,
    billingAddress,
    firstName,
    lastName,
    email,
  } = {}) {
    this.orderInfo = {
      customerId,
      orderItems,
      creditCardNumber,
      shippingAddress,
      billingAddress,
      firstName,
      lastName,
      email,
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

  async getOrder(orderId = this.orderId) {
    throw new Error("unimplememnted abstract method");
  }

  completeOrder() {
    throw new Error("unimplemented abstract method");
  }

  cancelOrder() {
    throw new Error("unimplemented abstract method");
  }
}

export class RestOrderAdapter extends OrderAdapter {
  constructor(url) {
    super();
    this.url = url;
  }

  /**
   * @override
   */
  async createOrder() {
    if (!this.orderInfo) {
      throw new Error("there is no order data");
    }
    return axios
      .post(this.url, this.orderInfo)
      .then(
        response => {
          this.orderId = response.data.modelId;
          return this;
        },
        error => {
          console.error(error.response.data);
        }
      )
      .catch(e => console.log(e));
  }

  /**
   * @override
   * @param {*} orderId
   */
  async submitOrder(orderId = this.orderId) {
    if (!this.orderInfo) {
      throw new Error("there is no order data");
    }
    return axios.patch(this.url + orderId, { orderStatus: "APPROVED" }).then(
      () => this,
      error => {
        console.error(error.response.data);
        throw new Error(error);
      }
    );
  }

  async getOrder(orderId = this.orderId) {
    return axios.get(this.url + orderId).then(
      response => {
        console.log(response.data);
        this.order = response.data;
        return this.order;
      },
      error => {
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
        response => {
          this.orderId = response.data.modelId;
          return this;
        },
        error => {
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
        response => {
          this.orderId = response.data.modelId;
          return this;
        },
        error => {
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
