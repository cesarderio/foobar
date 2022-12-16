'use strict';

const Chance = require('chance');
const chance = new Chance();

const createOrder = (socket) => (payload = null) => {
  payload = payload ? payload : {
    store: 'vendor',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
    vendorId: 'vendor',
    messageId: chance.guid(),
    driverId: 'FXP',
  };
  console.log(`Vendor: order: ${payload.orderId} ready for pickup`);
  socket.emit('PICKUP', payload);
};

const thankTheDriver = (socket) => (payload) => {
  // console.log('Vendor: Thank you for delivering to: ', payload.customer);
  console.log(`Vendor: Thank you for delivering order: ${payload.orderId} to: ${payload.customer}`);
  let newPayload = {
    id: payload.vendorId,
    messageId: payload.messageId,
  };
  socket.emit('RECEIVED', newPayload);
};

module.exports = { createOrder, thankTheDriver };
