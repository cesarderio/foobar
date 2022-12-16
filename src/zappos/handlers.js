'use strict';

const Chance = require('chance');
const chance = new Chance();

const createOrder = (socket) => (payload = null) => {
  payload = payload ? payload : {
    store: 'zappos',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
    vendorId: 'zappos',
    messageId: chance.guid(),
    driverId: 'FXP',
  };
  console.log(`Zappos: order: ${payload.orderId} ready for pickup`);
  socket.emit('PICKUP_READY', payload);
};

const thankTheDriver = (socket) => (payload) => {
  console.log(`Zappos: Thank you for delivering order: ${payload.orderId} to: ${payload.customer}`);
  let newPayload = {
    id: payload.vendorId,
    messageId: payload.messageId,
  };
  socket.emit('RECEIVED', newPayload);
};

module.exports = { createOrder, thankTheDriver };
