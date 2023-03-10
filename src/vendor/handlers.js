'use strict';

const Chance = require('chance');
const chance = new Chance();

const createOrder = (socket) => (payload = null) => {
  //console.log(socket);
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
  socket.emit('PICKUP_READY', payload);
};

const thankTheDriver = (socket) => (payload) => {
  // console.log('Vendor: Thank you for delivering to: ', payload.customer);
  let orderId = payload.orderId;
  let customer = payload.customer
  console.log(`Vendor: Thank you for delivering order: ${orderId} to: ${customer}`);
  let newPayload = {
    id: payload.vendorId,
    messageId: payload.messageId,
  };
  socket.emit('RECEIVED', newPayload);
};

module.exports = { createOrder, thankTheDriver };
