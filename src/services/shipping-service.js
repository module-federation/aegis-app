'use strict'

import { Event } from './event-service';
import { uuid } from '../lib/utils';

function sendEvent({ topic, eventData, eventName }) {
  setTimeout(async () => {
    await Event.notify(topic, JSON.stringify({
      eventData,
      eventName,
      eventTime: new Date().toUTCString(),
      eventSource: 'shippingService',
    }));
  }, 5000);
}

export const Shipping = {

  async shipOrder({ externalId, shipFrom, shipTo, lineItems }) {
    console.log('REAL shipping order %s', { externalId, shipFrom, shipTo, lineItems });
    sendEvent({
      topic: 'orderChannel', eventData: {
        externalId,
        shipTo,
        shipFrom,
        lineItems,
        shipmentId: uuid(),
        pickupTime: new Date().toUTCString(),
      }
    });
  },

  async trackShipment(shipmentId) {
    console.log('REAL track shipment %s', shipmentId);
    const trackingId = uuid();
    sendEvent({
      topic: 'orderChannel',
      eventName: 'orderPickedup',
      eventData: {
        shipmentId,
        trackingId,
        trackingStatus: 'orderPickedup'
      }
    });
    setTimeout(() => {
      sendEvent({
        topic: 'orderChannel',
        eventName: 'orderDelivered',
        eventData: {
          shipmentId,
          trackingId,
          trackingStatus: 'orderDelivered'
        }
      });
    }, 1000);
      
    return trackingId;
  },

  async verifyDelivery(trackingId) {
    console.log('REAL verify delivery, trackingId: %s', trackingId);
    const proofOfDelivery = `http://shipping.service.com/?proof=${trackingId}`;
    sendEvent({
      topic: 'orderChannel',
      eventName: 'deliveryVerified',
      eventData: { proofOfDelivery, trackingId },
    });
  },

  async cancelShipment(trackingId) {
    console.log('REAL cancel shipment %s', trackingId);
  },

}