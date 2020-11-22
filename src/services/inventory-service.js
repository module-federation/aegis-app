'use strict'

let subscription;

function sendEvent(model, { topic, eventData, eventName }) {
  setTimeout(async () => {
    console.log('fillOrder service responding: %s', eventData);
    await model.notify(topic, JSON.stringify({
      eventData,
      eventName,
      eventTime: new Date().toUTCString(),
      eventSource: 'Inventory',
    }));
  }, 3000);
}

export const Inventory = {

  async fillOrder(order) {
    if (!subscription) {
      subscription = await order.listen({
        topic: 'inventoryChannel',
        id: 'fillOrder_orderFilled',
        once: false,
        callback: ({ message }) => {
          const event = JSON.parse(message);
          const warehouse_addr = '1234 warehouse dr, dock 2';
          const externalId = event.eventData.commandArgs.externalId;
          sendEvent(order, {
            topic: event.eventData.replyChannel,
            eventName: 'orderFilled',
            eventData: { warehouse_addr, externalId }
          });
        }
      });
    }
  }

}

