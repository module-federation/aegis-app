'use strict'

const axios = require('axios');

const orderServiceUrl = 'http://localhost:8070/api/orders/';

class OrderService {

  get orderId() {
    return this._orderId;
  }

  set orderId(value) {
    this._orderId = value;
  }

  printOrderId() {
    console.log(this.orderId);
  }

  constructor({
    customerInfo,
    orderItems = [],
    creditCardNumber,
    shippingAddress,
    billingAddress
  } = {}) {
    this.orderInfo = {
      customerInfo,
      orderItems,
      creditCardNumber,
      shippingAddress,
      billingAddress
    };
  }

  addOrderItem(itemId, price) {
    if (typeof itemId !== 'string') {
      throw new Error('must include item id');
    }
    if (typeof price !== 'number') {
      throw new Error('price must be a number')
    }
    this.orderInfo.orderItems.push({ itemId, price });
    return this;
  }

  async createOrder() {
    return axios.post(
      orderServiceUrl,
      this.orderInfo
    ).then((response) => {
      this.orderId = response.data.modelId;
      return this;
    }, (error) => {
      console.error(error.response.data);
      throw new Error(error);
    });
  }

  async submitOrder(orderId = this.orderId) {
    return axios.patch(
      orderServiceUrl + orderId,
      { orderStatus: 'APPROVED' },
    ).then((response) => {
      this.orderId = response.data.modelId;
      return this;
    }, (error) => {
      console.error(error.response.data);
      throw new Error(error);
    });
  }

  async shipOrder(orderId = this.orderId) {
    return axios.patch(
      orderServiceUrl + orderId,
      { orderStatus: 'SHIPPING' },
    ).then((response) => {
      this.orderId = response.data.modelId;
      return this;
    }, (error) => {
      console.error(error.response.data);
      throw new Error(error);
    });
  }

  async deliverOrder(pod, orderId = this.orderId) {
    if (!pod) {
      throw new Error('require proof of delivery');
    }
    return axios.patch(
      orderServiceUrl + orderId,
      { orderStatus: 'COMPLETE', proofOfDelivery: pod },
    ).then((response) => {
      this.orderId = response.data.modelId;
      return this;
    }, (error) => {
      console.error(error.response.data);
      throw new Error(error);
    });
  }

  async cancelOrder(reason, orderId = this.orderId) {
    if (!reason) {
      throw new Error('reason required to cancel');
    }
    return axios.patch(
      orderServiceUrl + orderId,
      { orderStatus: 'CANCELED' },
    ).then((response) => {
      this.orderId = response.data.modelId;
      return this;
    }, (error) => {
      console.error(error.response.data);
      throw new Error(error);
    });
  }

}

module.exports.OrderService = OrderService;
