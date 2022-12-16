'use strict';

let socket = require('../../socket-client');
// const { io } = require('socket.io-client');
// const socket = io('http://localhost:3001/foobar');
const { createOrder, thankTheDriver} = require('./handlers');

socket.emit('JOIN', 'vendor');
socket.emit('GET_ALL', {id: 'vendor'});

const callForPickup = createOrder(socket);
const handleThanks = thankTheDriver(socket);

socket.on('DELIVERED', (payload) => handleThanks(payload));

setInterval(() => {
  console.log('-----New Interval!!-----');
  // socket.emit('DELIVERED', payload);
  // createOrder(socket);
  callForPickup();
}, 3000);
