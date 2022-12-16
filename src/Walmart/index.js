'use strict';

let socket = require('../../socket-client');
// const { io } = require('socket.io-client');
// const socket = io('http://localhost:3001/foobar');
const { createOrder, thankTheDriver} = require('./handlers');

socket.emit('JOIN', 'walmart');
socket.emit('GET_ALL', {id: 'walmart'});

const callForPickup = createOrder(socket);
const handleThanks = thankTheDriver(socket);

socket.on('DELIVERED', (payload) => handleThanks(payload));

setInterval(() => {
  console.log('-----New Interval!!-----');

  callForPickup();
}, 3000);
