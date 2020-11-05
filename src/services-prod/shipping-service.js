'use strict'

import { Event } from './event-service';
import { uuid } from '../lib/utils';

export const Shipping = {

  async shipOrder(order) {
    console.log('REAL shipping order %s', { ...order });
    Event.notify('orderShipped', order.orderNum);
  },

  async trackShipment(orderNo) {
    console.log('REAL track shipment %s', orderNo);
    Event.notify('orderShipped', { 
      orderNo: order.orderNo, 
      trackingId: uuid()
    });
  },

  async verifyDelivery(orderNo) {
    console.log('REAL verify delivery order %s', orderNo);
  }

}