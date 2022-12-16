'use strict';

const Chance = require('chance');
const chance = new Chance();

const createOrder = (socket) => (payload = null) => {
  payload = payload ? payload : {
    store: 'customer',
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
    // vendorId: 'customer',
    driverId: 'FPX',
    messageId: chance.guid(),
  };
  socket.emit('PICKUP_READY', payload);
};

function thankTheDriver(payload){
  console.log(`Vendor: Thank you for delivering order: ${payload.orderId} to: ${payload.customer}`);
}

module.exports = { createOrder, thankTheDriver };
