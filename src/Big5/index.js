'use strict';

let socket = require('../../socket-client');
const { createOrder, thankTheDriver} = require('./handlers');

socket.emit('JOIN', 'big5');
socket.emit('GET_ALL', {id: 'big5'});

const callForPickup = createOrder(socket);
const handleThanks = thankTheDriver(socket);

socket.on('DELIVERED', (payload) => handleThanks(payload));

setInterval(() => {
  console.log('-----New Interval!!-----');

  callForPickup();
}, 3000);
