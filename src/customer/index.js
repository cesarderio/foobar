'use strict';

let socket = require('../../socket-client');
const { createOrder, thankTheDriver} = require('./handlers');

socket.emit('JOIN', 'customer');
// socket.emit('GET_ALL', {id: 'customer'});

const callForPickup = createOrder(socket);
const handleThanks = thankTheDriver(socket);

// socket.on('DELIVERED', thankTheDriver);
socket.on('DELIVERED', (payload) => handleThanks(payload));

setInterval(() => {
  console.log('-----New Interval!!-----');
  socket.emit('DELIVERED', thankTheDriver);
  // createOrder(socket);
  callForPickup();
}, 3000);
