'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/foobar');
const { orderInTransit, deliveryHandler } = require('./handlers');

//----------------------------------------
socket.on('PICKUP_READY', driverHandler);
//----------------------------------------

socket.emit('JOIN', 'FPX');
socket.emit('GET_ALL', {id: 'FPX'});

function driverHandler(payload) {
  setTimeout(() => {
    orderInTransit(payload);
  }, 2000);
  setTimeout(() => {
    deliveryHandler(payload);
  }, 4000);
}

