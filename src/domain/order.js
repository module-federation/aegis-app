'use strict'

import { prevmodel } from './mixins'
import { asyncPipe } from '../domain/utils'
import checkPayload from './check-payload'
import { Transform } from 'stream'

/** @typedef { import('../domain/index.js').ModelSpecification} ModelSpecification */
/** @typedef {string|RegExp} topic*/
/** @typedef {function(string)} eventCallback*/
/** @typedef {import('../adapters/index').adapterFunction} adapterFunction*/
/** @typedef {string} id */
/** @typedef {import("./customer").Customer} Customer */
/** @typedef {function(Order)} undoFunction */
/**
 * @callback logMessageFn
 * @param {object|string} message
 * @param {logType} [type]
 *
 */

/** @typedef {'first'|'last'|'lastStateChange'|'stateChange'|'error'|'undo'} logType */

/**
 * @typedef readLogType
 * @property {number} index
 * @property  {logType} type
 */

/**
 * @typedef {{
 *  itemId: string,
 *  price: number,
 *  qty?: number
 * }} orderItemType
 */

/**
 * @callback relationFunction
 * @property {...args}
 * @returns {Promise<Model>}
 * } relationFunction
 */

/**
 *  @typedef {Object} Order The Order Service
 * @property {function(topic,eventCallback)} listen - listen for events
 * @property {import('../adapters/event-adapter').notifyType} notify
 * @property {adapterFunction} validateAddress - returns valid address or throws exception
 * @property {adapterFunction} completePayment - completes payment for an authorized charge
 * @property {adapterFunction} verifyDelivery - verify the order was received by the customer
 * @property {adapterFunction} trackShipment
 * @property {adapterFunction} refundPayment
 * @property {relationFunction} inventory - reserve inventory items
 * @property {adapterFunction} undo - undo all transactions up to this point
 * @property {function():Promise<Order>} pickOrder - pick items from warehouse and prepare for shipment
 * @property {adapterFunction} authorizePayment - verify payment, i.e. reserve the balance due
 * @property {import('../adapters/shipping-adapter').shipOrder} shipOrder -
 * calls shipping service to print label and request delivery
 * @property {function(Order):Promise<void>} save - saves order
 * @property {function():Promise<Order>} find - finds order
 * @property {string} shippingAddress
 * @property {string} orderNo = the order number
 * @property {string} trackingId - id given by tracking status for this `orderNo`
 * @property {function():Order} decrypt - decrypts sensitive properties
 * @property {function({key1:any,keyN:any}, boolean):Promise<Order>} update - update the order,
 * set the second arg to false to turn off validation.
 * @property {'PENDING'|'APPROVED'|'SHIPPING'|'CANCELED'|'COMPLETED'} orderStatus
 * @property {function(...args):Promise<import("../domain/index").Model>} customer - retrieves related customer object,
 * or if args are provided, creates a new customer object, using the provided args as the input.
 * @property {function(string,Order):Promise} emit - broadcast domain event
 * @property {function():boolean} paymentAccepted - payment approved and funds reserved
 * @property {function():boolean} autoCheckout - whether or not to immediately submit the order
 * @property {boolean} saveShippingDetails save shipping and payment details in a new customer record
 * @property {{itemId:string,price:number,qty:number}[]} orderItems
 * @property {Symbol} customerId {@link Customer}
 * @property {logMessageFn} logEvent
 * @property {logMessageFn} logError
 * @property {logMessageFn} logUndo
 * @property {logMessageFn} logStateChange
 * @property {readMessageFn} readLog
 */

const orderStatus = 'orderStatus'
const orderTotal = 'orderTotal'
const orderNo = 'orderNo'

export const OrderStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  SHIPPING: 'SHIPPING',
  COMPLETE: 'COMPLETE',
  CANCELED: 'CANCELED'
}

/**
 *
 * @param {orderItemType} orderItem
 * @returns {boolean} true if item is valid
 */
export const checkItem = function (orderItem) {
  return (
    typeof orderItem.itemId === 'string' && typeof orderItem.price === 'number'
  )
}

/**
 * @param {orderItemType[]} orderItems
 */
export const checkItems = function (orderItems) {
  if (!orderItems || orderItems.length < 1) {
    throw new Error('order contains no items')
  }
  const items = Array.isArray(orderItems) ? orderItems : [orderItems]

  if (items.length > 0 && items.every(checkItem)) {
    return items
  }
  throw new Error('order items invalid', { items })
}

/**
 * Calculate order total
 * @param {orderItemType[]} orderItems
 */
export const calcTotal = function (orderItems) {
  const items = checkItems(orderItems)

  return items.reduce((total, item) => {
    const qty = item.qty || 1
    return (total += item.price * qty)
  }, 0)
}

/**
 * @param {orderItemType[]} orderItems
 * @returns {number} number of items
 */
export const itemCount = function (orderItems) {
  return orderItems.reduce((total, item) => (total += item.qty || 1))
}

/**
 * No changes to `propKey` properties once the order is approved
 * @param {*} o - the order
 * @param {*} propKey
 * @returns {string | null} the key or `null`
 */
export const freezeOnApproval = propKey => o =>
  o.orderStatus && o.orderStatus !== OrderStatus.PENDING ? propKey : null

const finalStatus = status =>
  [OrderStatus.COMPLETE, OrderStatus.CANCELED].includes(status)

/**
 * No changes to `propKey` once order is complete or canceled
 * @param {*} o - the order
 * @param {*} propKey
 * @returns {string | null} the key or `null`
 */
export const freezeOnCompletion = propKey => o =>
  finalStatus(o.orderStatus) ? null : propKey

/**
 * If not a registered customer, provide shipping & payment details.
 * @param {*} o
 * @param {*} propKey
 * @returns {string | void} the key or `void`
 */
export const requiredForGuest = propKey => o => o.customerId ? null : propKey

/**
 * Value required to approve order.
 * @param {*} propKey
 */
export const requiredForApproval = propKey => o =>
  o.orderStatus === OrderStatus.APPROVED ? propKey : null

/**
 * Value required to complete order
 * @param {object} o
 * @param {string | string[]} propKey these props are required to comlete the order
 * @returns {string | void} the key or `void`
 */
export const requiredForCompletion = propKey => o =>
  o.orderStatus === OrderStatus.COMPLETE ? propKey : null

/**
 *
 * @param {enum} from
 * @param {enum} to
 * @returns
 */
const invalidStatusChange = (from, to) => (o, propVal) =>
  propVal === to && o[prevmodel].orderStatus === from

const invalidStatusChanges = [
  // Can't change back to pending once approved
  invalidStatusChange(OrderStatus.APPROVED, OrderStatus.PENDING),
  // Can't change back to pending once shipped
  invalidStatusChange(OrderStatus.SHIPPING, OrderStatus.PENDING),
  // Can't change back to approved once shipped
  invalidStatusChange(OrderStatus.SHIPPING, OrderStatus.APPROVED),
  // Can't change directly to shipping from pending
  invalidStatusChange(OrderStatus.PENDING, OrderStatus.SHIPPING),
  // Can't change directly to complete from pending
  invalidStatusChange(OrderStatus.PENDING, OrderStatus.COMPLETE),
  // Can't change final status
  invalidStatusChange(OrderStatus.COMPLETE, OrderStatus.PENDING),
  invalidStatusChange(OrderStatus.COMPLETE, OrderStatus.SHIPPING),
  invalidStatusChange(OrderStatus.COMPLETE, OrderStatus.APPROVED),
  invalidStatusChange(OrderStatus.COMPLETE, OrderStatus.CANCELED),
  // Can't change final status
  invalidStatusChange(OrderStatus.CANCELED, OrderStatus.PENDING),
  invalidStatusChange(OrderStatus.CANCELED, OrderStatus.SHIPPING),
  invalidStatusChange(OrderStatus.CANCELED, OrderStatus.APPROVED),
  invalidStatusChange(OrderStatus.CANCELED, OrderStatus.COMPLETE)
]

/**
 * Check that status changes are valid
 */
export const statusChangeValid = (o, propVal) => {
  if (invalidStatusChanges.some(i => i(o, propVal))) {
    throw new Error('invalid status change')
  }
  return true
}

/**
 *
 * @param {*} o
 * @param {*} propVal
 */
export const orderTotalValid = (o, propVal) =>
  calcTotal(o.orderItems) === propVal

/**
 * Recalculate order total
 * @param {object} o - the object (order)
 * @param {number} propVal - the property value
 */
export const recalcTotal = (o, propVal) => ({
  orderTotal: calcTotal(propVal)
})

/**
 * Updated signature requirement if `orderTotal` above certain value
 * @param {object} o - the object (order)
 * @param {number} propVal - the property value
 */
export const updateSignature = (o, propVal) => ({
  signatureRequired: calcTotal(propVal) > 999.99 || o.signatureRequired
})

/**
 * Don't delete orders before they're complete.
 */
export function readyToDelete (model) {
  if (
    ![OrderStatus.COMPLETE, OrderStatus.CANCELED].includes(model.orderStatus)
  ) {
    throw new Error('order must be canceled or completed')
  }
  return model
}

/**
 *
 * @param {Error} error
 * @param {Order} order
 * @param {*} func
 */
function handleError (error, order, func) {
  const errMsg = { func, orderNo: order.orderNo, error }
  if (order) order.emit('orderError', errMsg)

  throw new Error(JSON.stringify(errMsg))
}

/**
 * Callback invoked by adapter when payment is complete
 * @param {{model:Order}} options
 */
export async function paymentCompleted (options = {}, payload = {}) {
  const { model: order } = options
  const changes = checkPayload(
    'confirmationCode',
    options,
    payload,
    paymentCompleted.name
  )
  return order.update({ ...changes, orderStatus: OrderStatus.COMPLETE })
}

/**
 * Callback invoked by shipping adapter when order is picked up.
 * @param {{model:Order}} options
 * @param {string} shipmentId
 */
export async function orderShipped (options = {}, payload = {}) {
  const { model: order } = options
  const shipmentPayload = checkPayload(
    'shipmentId',
    options,
    payload,
    orderShipped.name
  )
  return order.update({
    shipmentId: shipmentPayload.shipmentId,
    orderStatus: OrderStatus.SHIPPING
  })
}

/**
 * Callback invoked when order is ready for pickup
 * @param {{ model:Order }} options
 */
export async function orderPicked (options = {}, payload = {}) {
  const { model: order } = options
  const changes = checkPayload(
    'pickupAddress',
    options,
    payload,
    addressValidated.name
  )
  return order.update(changes)
}

/**
 * Callback invoked when shippingAddress is verified (and possibly corrected)
 * @param {{ model:Order }} options
 * @param {string} shippingAddress
 */
export async function addressValidated (options = {}, payload = {}) {
  const { model: order } = options
  const addressPayload = checkPayload(
    'shippingAddress',
    options,
    payload,
    addressValidated.name
  )
  return order.update({ shippingAddress: addressPayload.shippingAddress })
}

/**
 * Called by adapter when port recevies response from payment service.
 * @param {{ model:Order }} options
 * @param {*} paymentAuthorization
 */
export async function paymentAuthorized (options = {}, payload = {}) {
  const { model: order } = options
  const changes = checkPayload(
    'paymentStatus',
    options,
    payload,
    paymentAuthorized.name
  )
  return order.update({ ...changes, paymentStatus }, false)
}

/**
 * Called to refund payment when order is canceled.
 * @param {*} options
 * @param {*} payload
 * @returns
 */
export async function refundPayment (order) {
  // call port by same name.
  order.refundPayment((options, payload) => {
    const changes = checkPayload(
      'refundReceipt',
      options,
      payload,
      refundPayment.name
    )
    return order.update({ ...changes, orderStatus: OrderStatus.CANCELED })
  })
}

/**
 *
 * @param {Order} order
 * @returns {Promise<Order>}
 */
async function verifyAddress (order) {
  console.debug({
    fn: verifyAddress.name,
    validateAddress: order.validateAddress
  })
  return order.validateAddress(addressValidated)
}

/**
 * Request the bank or lender to place a hold on
 * the customer account in the amount of the payment
 * due, to be withdrawn once the shipment is safely
 * in our customer's hands, or credited back if things
 * don't work out.
 *
 * @param {Order} order
 * @returns {Promise<Order>}
 */
async function verifyPayment (order) {
  try {
    /**
     * @type {Order}
     */
    const authorizeOrder = await order.authorizePayment(paymentAuthorized)

    if (!authorizeOrder.paymentDeclined) {
      throw new Error('payment declined')
    }

    return authorizeOrder
  } catch (e) {
    handleError(e, order, verifyPayment.name)
  }
  return order
}

/**
 *
 * @param {Order} order
 * @returns {Promise<Order>}
 * @throws {'oInventory'}
 */
async function verifyInventory (order) {
  const inventory = await order.inventory()
  if (inventory.length < 1) throw new Error('bad inventory ID')

  const insufficient = order.orderItems.filter(item => {
    const inv = inventory.find(i => i.id === item.itemId)
    if (!inv) return true
    if (inv.quantity < item.qty) return true
    return false
  })

  if (insufficient.length > 0) {
    order.emit('lowOrOutOfStock', insufficient)
    throw new Error(`low or out of stock: ${insufficient.map(i => i.itemId)}`)
  }
}
/**
 * Copy existing customer data into the order
 * or create new customer from order details.
 *
 * @param {Order} order
 * @throws {'InvalidCustomerId'}
 */
async function getCustomerOrder (order) {
  // If an id is given, try fetching the model
  if (order.customerId) {
    if (!order.customer) {
      console.log({ order })
    }
    // Use the relation defined in the spec
    const customer = await order.customer()

    if (!customer) {
      throw new Error('invalid customer id', order.customerId)
    }

    // Add customer data to the order
    const custInfo = { ...customer.decrypt(), firstName: customer.firstName }
    const update = await order.update(custInfo)

    console.info('update order with data from existing customer', custInfo)
    return update
  }

  // Create a new customer from the shipping details
  if (order.saveShippingDetails) {
    const custInfo = { ...order.decrypt(), firstName: order.firstName }
    const customer = await order.customer(custInfo)

    console.info('create new customer with data from order', customer)
    return order
  }

  return order
}

/**
 * Handle a new order:
 * - fetch or save customer info
 * - check item availability
 * - authorize payment
 * - verify shipping address
 */
const processPendingOrder = asyncPipe(
  getCustomerOrder,
  verifyInventory,
  verifyPayment,
  verifyAddress
)

/**
 * Implements the beginging of the order service workflow.
 * The rest is implemented by the {@link ModelSpecification}.
 * See the port configuration section of {@link Order}.
 */
const OrderActions = {
  /**
   * Verifies the shipping address and authorizes payment
   * for the order total when the order is first created,
   * or when it is updated while still in pending status.
   *
   * @param {Order} order - the order
   * @returns {Promise<Readonly<Order>>}
   */
  [OrderStatus.PENDING]: order => {
    // return processPendingOrder(order)

    if (order.autoCheckout)
      /**@type {Order} */
      getCustomerOrder(order).then(order =>
        runOrderWorkflow(
          order.updateSync({ orderStatus: OrderStatus.APPROVED })
        )
      )
  },

  /**
   * If payment is authorized, check inventory.
   * This kicks off the rest of the workflow,
   * which is controlled by port event flow.
   * @param {Order} order
   * @returns {Promise<Readonly<Order>>}
   */
  [OrderStatus.APPROVED]: order => {
    try {
      //if (/approved/i.test(order.paymentStatus))
      return order.pickOrder(orderPicked)

      // order.emit('PayAuthFail', 'Payment authorization problem')
      // return order
    } catch (error) {
      console.log({ error })
      handleError(error, order, OrderStatus.APPROVED)
    }
    return order
  },

  /**
   * Useful if we need to restart tracking.
   * @param {Order} order
   * @returns {Promise<Readonly<Order>>}
   */
  [OrderStatus.SHIPPING]: async order => {
    try {
      order.trackShipment(trackingUpdate)
      console.debug({ func: OrderStatus.SHIPPING, order })
      await (
        await order.update({ orderStatus: OrderStatus.SHIPPING })
      ).emit('orderPicked')
    } catch (error) {
      handleError(error, order, OrderStatus.SHIPPING)
    }
    return order
  },

  /**
   * Start cancellation process.
   * @param {Order} order
   * @returns {Promise<Readonly<Order>>}
   */
  [OrderStatus.CANCELED]: async order => {
    try {
      console.debug({
        func: OrderStatus.CANCELED,
        desc: 'order canceled, calling undo',
        orderNo: order.orderNo
      })
      return order.undo()
    } catch (error) {
      handleError(error, order, OrderStatus.CANCELED)
    }
    return order
  },
  /**
   *
   * @param {Order} order
   * @returns {Promise<Readonly<Order>>}
   */
  [OrderStatus.COMPLETE]: async order => {
    // send route to questionnaire, perform analysis, schedule follow-up
    console.log('customer sentiment analysis, customer care, sales analysis')
    return order
  }
}

/**
 * Call order service workflow - controlled by status
 * @param {Order} order
 * @returns {Promise<Readonly<Order>>}
 */
export function runOrderWorkflow (order) {
  console.log({ orderStatus: order.orderStatus })
  OrderActions[order.orderStatus](order)
}

/**
 * Called on create, update, delete of model instance.
 * @param {{model:Promise<ReadOnly<Order>>}}
 */
export function handleOrderEvent ({ model: order, eventType, changes }) {
  if (changes?.orderStatus || eventType === 'CREATE') {
    // console.debug({ fn: handleOrderEvent.name, order })
    runOrderWorkflow(order)
  }
}

/**
 * Require a signature for orders $1000 and up
 * @param {*} input
 * @param {*} orderTotal
 */
function needsSignature (input, orderTotal) {
  return typeof input === 'boolean' ? input : orderTotal > 999.99
}

/** format and classify log entries */
function logMessage (message, type) {
  const msg = typeof message === 'string' ? message : JSON.stringify(message)

  return {
    desc: msg.substring(0, 140),
    type,
    time: Date.now(),
    toJSON () {
      return {
        desc: this.desc,
        type,
        time: new Date(this.time).toISOString()
      }
    }
  }
}

/**
 * Returns factory function for the Order model.
 * @type {import('../domain/index.js').modelSpecFactoryFn}
 * @param {*} dependencies - inject dependencies
 */
export function makeOrderFactory (dependencies) {
  return function createOrder ({
    orderItems,
    email = null,
    lastName = null,
    firstName = null,
    customerId = null,
    billingAddress = null,
    shippingAddress = null,
    creditCardNumber = null,
    shippingPriority = null,
    autoCheckout = false,
    saveShippingDetails = false,
    requireSignature,
    fibonacci = 10
  }) {
    //const signatureRequired = needsSignature(requireSignature, total)
    const order = {
      email,
      lastName,
      firstName,
      customerId,
      orderItems,
      creditCardNumber,
      billingAddress,
      shippingAddress,
      signatureRequired: false,
      saveShippingDetails,
      shippingPriority,
      fibonacci,
      result: 0,
      time: 0,
      estimatedArrival: null,
      log: [logMessage('order created')],
      [orderTotal]: 0,
      [orderStatus]: OrderStatus.PENDING,
      [orderNo]: dependencies.uuid(),
      desc: 'new order 25',
      itemId: null,
      /**
       * Has payment for the order been authorized?
       */
      paymentAccepted () {
        return true
      },
      /**
       * Proceed to checkout automatically or wait for approval?
       */
      autoCheckout () {
        return autoCheckout
      },
      totalItems () {
        return itemCount(this.orderItems)
      },
      total () {
        return calcTotal(this.orderItems)
      },
      addItem (item) {
        if (checkItem(item)) {
          this.orderItems.push(item)
          return true
        }
        return false
      },
      logEvent (message, type = 'info') {
        this.log.push(logMessage(message, type))
      },
      logError (message) {
        this.logEvent(message, 'error')
      },
      logUndo (message) {
        this.logEvent(message, 'undo')
      },
      logStateChange (message) {
        this.logEvent(message, 'stateChange')
      },

      /**
       *
       * @param {viewLog} options
       * @returns {logMessageFn[]|logMessageFn}
       */
      readLog ({ index = null, type = null }) {
        const indx = parseInt(index)
        if (indx < this.log.length && indx !== NaN) return this.log[indx]
        if (type === 'first') return this.log[0]
        if (type === 'last') return this.log[this.log.length - 1]
        if (type === 'lastStateChange')
          return this.log[this.log.lastIndexOf({ type: 'stateChange' })]
        if (type === 'stateChanges')
          return this.log.filter(l => l.type === 'stateChange')
        if (type === 'error') return this.log.filter(l => l.type === 'error')
        if (type === 'undo') return this.log.filter(l => l.type === 'undo')
        return this.log
      }
    }

    return Object.freeze(order)
  }
}

/**
 * Called as command to approve/submit order.
 * @param {Order} order
 */
export async function approve (order) {
  console.debug({ msg: 'got order', order })
  const approvedOrder = order.updateSync(
    {
      orderStatus: OrderStatus.APPROVED
    },
    false
  )
  console.debug({ approvedOrder })
  approvedOrder.logStateChange(OrderStatus.APPROVED)
  return runOrderWorkflow(approvedOrder)
}

/**
 * Called as command to cancel order.
 * @param {Order} order
 */
export async function cancel (order) {
  const canceledOrder = await order.update({
    orderStatus: OrderStatus.CANCELED
  })
  canceledOrder.logStateChange(OrderStatus.CANCELED)
  return runOrderWorkflow(canceledOrder)
}

/**
 * Alias of `approve`
 * @param {Order} order
 * @returns
 */
export async function checkout (order) {
  return approve(order)
}

/**
 *
 * @param {{model:Order}} param0
 */
export function errorCallback ({ port, model: order, error }) {
  const errMsg = { error, port, error }
  console.error(errorCallback.name, errMsg)
  order.logEvent(errMsg)
  order.emit(errorCallback.name, errMsg)
  return order.undo()
}

/**
 *
 * @param {{model:Order}} param0
 */
export function timeoutCallback ({ port, ports, adapterFn, model: order }) {
  console.error('timeout...', port)
  //order.logError(timeoutCallback.name, 'timeout')
  order.emit(timeoutCallback.name, errMsg)
}

/**
 * @type {undoFunction}
 * Start process to return canceled order items to inventory.
 * Do not call `runOrderWorkflow` - it is already running (in
 * reverse) if we get here.
 */
export async function returnInventory (order) {
  console.log(returnInventory.name)
  order.logEvent(returnInventory.name, 'timeout')
  order.emit(returnInventory.name, errMsg)
  return order.update({ orderStatus: OrderStatus.CANCELED })
}

/**
 * @type {undoFunction}
 * Start process for the shipper to pick the items to return.
 * Do not call `runOrderWorkflow` - it is already running (in
 * reverse) if we get here.
 */
export async function returnShipment (order) {
  console.log(returnShipment.name)
  order.logUndo(returnShipment.name)
  return order.update({ orderStatus: OrderStatus.CANCELED })
}

export function accountOrder (req, res) {}

/**
 * @type {undoFunction}
 * Start process to return canceled order items to inventory.
 * Do not call `runOrderWorkflow` - it is already running (in
 * reverse) if we get here.
 */
export async function returnDelivery (order) {
  console.log(returnDelivery.name)
  return order.update({ orderStatus: OrderStatus.CANCELED })
}

/**
 * @type {undoFunction}
 */
export async function cancelPayment (order) {
  console.log(cancelPayment.name)
  return order.update({ orderStatus: OrderStatus.CANCELED })
}

export class OrderError extends Error {
  constructor (error, code) {
    super(error)
    this.code = code
  }
}

/**
 *
 * @param {Date.now} data
 * @returns
 */
export async function cancelOrders (data) {
  const cancelOrdersTransform = new Transform({
    objectMode: true,
    transform: (chunk, _encoding, done) => {
      done(
        null,
        JSON.stringify({ ...chunk, orderStatus: OrderStatus.CANCELED })
      )
    }
  })

  await this.list({
    writable: this.createWriteStream(),
    transform: cancelOrdersTransform,
    serialize: false
  })

  return { status: '🏆' }
}

/**
 *
 * @param {Date.now} data
 * @returns
 */

export async function approveOrders (data) {
  const approveOrdersTransform = new Transform({
    objectMode: true,
    transform: (chunk, encoding, done) => {
      if (chunk._id) delete chunk._id
      this.push(JSON.stringify({ ...chunk, orderStatus: OrderStatus.APPROVED }))
      done()
    }
  })

  await this.list({
    writable: this.createWriteStream(),
    transform: approveOrdersTransform
  })

  return { status: '🏆' }
}

/**
 *
 * @returns
 */
export async function trackAsyncContext () {
  const ctx = this.getContext()
  const dur = 'test-duration'
  const startTime = Date.now()

  await new Promise(resolve => setTimeout(resolve, 100))

  // require('fs')
  //   .stream('/etc/hosts')
  //   .pipe(ctx.get('res'))

  ctx.set(dur, Date.now() - startTime)

  const metric = {
    requestId: ctx.get('id'),
    fn: trackAsyncContext.name,
    duration: ctx.get(dur),
    context: [...ctx]
  }

  this.emit('metric', metric)
  console.log(metric.ctx)

  return metric
}

export async function customHttpStatus (data) {
  if (data.args.code)
    throw new OrderError(data.args.message || 'custom status', data.args.code)
  try {
    console.log(x)
  } catch (error) {
    throw new OrderError(error, 500)
  }
}

export async function testContainsMany (data) {
  console.log({ fn: testContainsMany.name, data })
  return { status: '👍', inventory: await this.inventory() }
}

function fibonacci (x) {
  if (x === 0) {
    return 0
  }
  if (x === 1) {
    return 1
  }
  return fibonacci(x - 1) + fibonacci(x - 2)
}

export async function runFibonacciJs (data) {
  console.log({ data })
  const param = parseInt(data.args.fibonacci || 20)
  const start = Date.now()
  return {
    fibonacci: param,
    result: fibonacci(param),
    time: Date.now() - start
  }
}

export async function getFieldList () {
  const model = await this.list({ query: { __limit: 1 } })
  console.log({ model: model[0] })
  return Object.keys(model[0])
}

export async function createModelEvent () {
  return new Promise(resolve => {
    this.emit('createModel_ORDER', {
      cb: model => resolve(model),
      args: {
        a: 1,
        b: 2
      }
    })
  })
}
