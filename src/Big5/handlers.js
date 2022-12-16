'use strict';

const Chance = require('chance');
const chance = new Chance();

const createOrder = (socket) => (payload = null) => {
  payload = payload ? payload : {
    store: 'big5',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
    vendorId: 'big5',
    messageId: chance.guid(),
    driverId: 'FXP',
  };
  console.log(`Big5: order: ${payload.orderId} ready for pickup`);
  socket.emit('PICKUP_READY', payload);
};

const thankTheDriver = (socket) => (payload) => {
  console.log(`Big5: Thank you for delivering order: ${payload.orderId} to: ${payload.customer}`);
  let newPayload = {
    id: payload.vendorId,
    messageId: payload.messageId,
  };
  socket.emit('RECEIVED', newPayload);
};

module.exports = { createOrder, thankTheDriver };
