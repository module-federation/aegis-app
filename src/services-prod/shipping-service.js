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
    const trackingId = uuid();
    Event.notify('orderShipped', JSON.stringify({
      orderNum, trackingId
    }));
    return trackingId;
  },

  async verifyDelivery(trackingId) {
    console.log('REAL verify delivery, trackingId: %s', trackingId);
    const proofOfDelivery = `http://shipping.service.com/?proof=${trackingId}`;
    Event.notify('orderShipped', JSON.stringify({
      orderNum, proofOfDelivery
    }));
  },

  async cancelShipment(trackingId) {
    console.log('REAL cancel shipment %s', trackingId);
  },

}