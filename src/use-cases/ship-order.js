'use strict'

async function orderShipped({ message, consumer }) {
  const order = this;
  console.log({ order, message });
  await order.handleStatusChange({
    ...order,
    orderStatus: 'SHIPPING'
  });
  consumer.unsubscribe(); // stop listening
}

/**
 * @type {import('./index').UseCaseSpecification}
 */
const ShipOrder = {
  modelName: 'order',
  endpoint: '/:id/ship',
  factory: function shipOrderFactory({
    findModel,
    consumeEvents,
    ShippingService
  }) {
    return async function shipOrder(id) {
      const order = await findModel(id)
      if (order) {
        throw new Error('no such order')
      }
      consumeEvents('orderShipped', id, orderShipped.bind(order))
      const shipmentId = await ShippingService.shipOrder(order);
      return shipmentId;
    }
  }
}

export default ShipOrder