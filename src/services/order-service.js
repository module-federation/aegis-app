'use strict'

const axios = require('axios');

const orderServiceUrl = 'http://localhost:8070/api/orders/';

const compose = require('../lib/utils').compose;

/**
 * Calls the order service remotely (via REST).
 * Calls locally for testing purposes (local: true).
 */
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
    billingAddress,
    local = false,
  } = {}) {
    this.orderInfo = {
      customerInfo,
      orderItems,
      creditCardNumber,
      shippingAddress,
      billingAddress,
    };
    this.local = local || false;
  }

  async handleStatusChange(status) {
    require('../models/order').statusChangeValid(this.order, status);
    this.order.orderStatus = status;
    await require('../models/order').handleStatusChange(this.order);
  }

  addOrderItem(itemId, price, qty = 1) {
    if (typeof itemId !== 'string') {
      throw new Error('must include item id');
    }
    if (typeof price !== 'number') {
      throw new Error('price must be a number');
    }
    if (typeof qty !== 'number') {
      throw new Error('qty must be a number');
    }
    this.orderInfo.orderItems.push({ itemId, price, qty });
    return this;
  }

  async createOrder() {
    if (this.local) {
      const Order = require('../models').Order;
      const createOrder = Order.factory(Order.dependencies);
      this.order = await createOrder(this.orderInfo)
        .then(order => compose(...Order.mixins)(order));
      this.orderId = this.order.orderId;
      return this;
    }
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
    if (this.local) {
      await this.handleStatusChange('APPROVED');
      return this;
    }
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
    if (this.local) {
      await this.handleStatusChange('SHIPPING');
      return this;
    }
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
    if (this.local) {
      await this.handleStatusChange('COMPLETE');
      return this;
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
    if (this.local) {
      await this.handleStatusChange('CANCELED');
      return this;
    }
    return axios.patch(
      orderServiceUrl + orderId,
      { orderStatus: 'CANCELED', cancelReason: reason },
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
