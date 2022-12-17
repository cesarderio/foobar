'use strict';

let socket = require('../../socket-client');
const { createOrder, thankTheDriver } = require('./handlers');

socket.emit('JOIN', 'customer');
// socket.emit('GET_ALL', {id: 'customer'});

//const callForPickup = createOrder(socket);
// const handleThanks = (payload) => thankTheDriver(payload);

// socket.on('DELIVERED', thankTheDriver);
socket.on('DELIVERED', (payload) => thankTheDriver(payload));
socket.on('IN_TRANSIT', (payload) => {
  console.log(`Driver: order: ${payload.orderId} picked up`);
});

setInterval(() => {
  console.log('-----New Interval!!-----');

  createOrder(socket)();
  // callForPickup();
}, 3000);
