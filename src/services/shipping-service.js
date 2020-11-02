'use strict'

export const Shipping = {

  async shipOrder(order) {
    console.log('test shipping order: %s', { ...order });
  },

  async trackShipment(orderNo) {
    console.log('test track shipment %s', orderNo);
  },

  async verifyDelivery(orderNo) {
    console.log('test verify delivery order %s', orderNo);
  }

}