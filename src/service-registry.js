'use strict'

import { EventDispatcher } from './event-dispatcher';
import { uuid } from './lib/utils'

const dispatcher = new EventDispatcher();

function sendEvent({ emitEvent, topic, eventData, eventSource, eventName }) {
  console.log('Sending event...')
  console.log({ emitEvent, topic, eventData, eventSource, eventName })
  setTimeout(async () => {
    await emitEvent(topic, JSON.stringify({
      eventData,
      eventName,
      eventTime: new Date().toUTCString(),
      eventType: 'CommandResponse',
      eventSource: eventSource
    }));
  }, 2000);
}

function generateShippingEventData(event, externalId) {
  const trackingId = uuid();
  const shipmentId = trackingId;
  const proofOfDelivery = `http://shipping.service.com?proof=${trackingId}`;
  const eventData = { externalId };
  if (event.eventName === 'shipOrder') {
    return { ...eventData, shipmentId }
  }
  if (event.eventName === 'trackShipment') {
    return { ...eventData, trackingId, trackingStatus: 'outForDelivery' };
  }
  if (event.eventName === 'verifyDelivery') {
    return { ...eventData, proofOfDelivery };
  }
}

const eventNames = {
  shipOrder: 'orderShipped',
  trackShipment: 'outForDelivery',
  verifyDelivery: 'deliveryVerified'
}

function generateShippingMessage(emitEvent, event, externalId) {
  return {
    emitEvent,
    topic: event.eventData.replyChannel,
    eventData: generateShippingEventData(event, externalId),
    eventName: eventNames[event.eventName],
    eventSource: 'shippingService'
  };
}

dispatcher.registerCallback('inventoryChannel', ({ message, emitEvent }) => {
  const event = JSON.parse(message);
  const warehouseAddress = '1234 warehouse dr, dock 2';
  const externalId = event.eventData.commandArgs.externalId;
  sendEvent({
    emitEvent,
    topic: event.eventData.replyChannel,
    eventName: 'orderFilled',
    eventData: { warehouse_addr: warehouseAddress, externalId },
    eventSource: 'inventoryService'
  });
});

dispatcher.registerCallback('shippingChannel', ({ message, emitEvent }) => {
  const event = JSON.parse(message);
  const externalId = event.eventData.commandArgs.externalId;
  const _message = generateShippingMessage(emitEvent, event, externalId);
  sendEvent(_message);

  if (event.eventName === 'trackShipment') {
    const eventData = { ..._message.eventData, trackingStatus: 'orderDelivered' }
    setTimeout(() => sendEvent({
      ..._message,
      eventData,
      eventName: 'orderDelivered'
    }), 2000);
  }
});

export default dispatcher;


