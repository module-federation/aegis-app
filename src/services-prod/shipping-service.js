'use strict'

import { Event } from './event-service';
import { uuid } from '../lib/utils';

export const Shipping = {

  async shipOrder(order) {
    console.log('REAL shipping order %s', { ...order });
    Event.notify('orderShipped', order.orderNum);
  },

  async trackShipment(orderNum) {
    console.log('REAL track shipment %s', orderNum);
    Event.notify('orderShipped', JSON.stringify({
      orderNum: orderNum,
      trackingId: uuid()
    }));
  },

  async verifyDelivery(orderNum) {
    console.log('REAL verify delivery order %s', orderNum);
  },

  async cancelShipment(orderNum) {
    console.log('REAL cancel shipment %s', orderNum);
  },

}