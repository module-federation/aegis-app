'use strict'

export const Shipping = {

  async shipOrder() {
    console.log('test shipping order');
  },

  async trackShipment(orderNo) {
    console.log('test track shipment %s', orderNo);
  },

  async verifyDelivery(orderNo) {
    console.log('test verify delivery order %s', orderNo);
  }

}