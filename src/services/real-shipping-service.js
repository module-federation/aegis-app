'use strict'

export const Shipping = {

  async shipOrder() {
    console.log('REAL shipping order');
  },

  async trackShipment(orderNo) {
    console.log('REAL track shipment %s', orderNo);
  },

  async verifyDelivery(orderNo) {
    console.log('REAL verify delivery order %s', orderNo);
  }

}