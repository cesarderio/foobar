'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/foobar');
const { orderInTransit, deliveryHandler } = require('./handlers');

//----------------------------------------
socket.on('PICKUP_READY', driverHandler);
socket.on('CONFIRMATION', (payload) => {
  console.log(`Vendor: Thank you for delivering order: ${payload.orderId} to: ${payload.customer}`);
});
//----------------------------------------

socket.emit('JOIN', 'FPX');
socket.emit('GET_ALL', {id: 'FPX'});

function driverHandler(payload) {
  setTimeout(() => {
    orderInTransit(socket)(payload);
    console.log('--------look---------');
  }, 2000);
  setTimeout(() => {
    deliveryHandler(socket)(payload);
  }, 4000);
}

