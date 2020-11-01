'use strict'

const axios = require('axios');

class OrderAdapter {
  get orderId() {
    return this._orderId;
  }
  set orderId(value) {
    this._orderId = value;
  }
  get orderInfo() {
    return this._orderInfo;
  }
  set orderInfo(value) {
    this._orderInfo = value;
  }
  get order() {
    return this._order;
  }
  set order(value) {
    this._order = value;
  }
  get adapter() {
    return this._adapter;
  }
  set adapter(value) {
    this._adapter = value;
  }

  constructor({
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

  createOrder() {
    throw new Error('unimplemented abstract method');
  }

  submitOrder() {
    throw new Error('unimplemented abstract method');
  }

  fillOrder() {
    throw new Error('unimplemented abstract method');
  }

  shipOrder() {
    throw new Error('unimplemented abstract method');
  }

  trackShipment() {
    throw new Error('unimplemented abstract method');
  }

  verifyDelivery() {
    throw new Error('unimplemented abstract method');
  }

  completeOrder() {
    throw new Error('unimplemented abstract method');
  }

  cancelOrder() {
    throw new Error('unimplemented abstract method');
  }
}

export class LocalOrderAdapter extends OrderAdapter {
  /**
   * @override 
   */
  createOrder() {
    const Order = require('../models').Order;
    const createOrder = Order.factory(Order.dependencies);
    this.order = await createOrder(this.orderInfo)
      .then(order => compose(...Order.mixins)(order));
    this.orderId = this.order.orderId;
    return this;
  }

  async handleStatusChange(status) {
    require('../models/order').statusChangeValid(this.order, status);
    await require('../models/order').handleStatusChange({
      ...this.order,
      orderStatus: status,
    });
  }

  submitOrder() {
    await this.handleStatusChange('APPROVED');
    return this;
  }

  fillOrder() {
  }
  shipOrder() {
  }
  trackShipment() {
  }
  verifyDelivery() {
  }
  completeOrder() {
  }
  cancelOrder() {
    await this.handleStatusChange('CANCELED');
    return this;
  }
}

export class RestOrderAdapter extends OrderAdapter {
  /**
   * @override 
   */
  createOrder() {
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

  submitOrder() {
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

  fillOrder() {

  }

  shipOrder() {
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

  trackShipment() {

  }

  verifyDelivery() {

  }

  completeOrder() {
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

  cancelOrder() {
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

export class GraphQlOrderAdapter extends OrderAdapter {

  /**
   * @override 
   */
  createOrder() {

  }

  submitOrder() {

  }
  fillOrder() {

  }
  shipOrder() {

  }
  trackShipment() {

  }
  verifyDelivery() {

  }
  completeOrder() {

  }
  cancelOrder() {

  }
}


