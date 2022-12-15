'use strict';

const orderInTransit = (socket) =>(payload) => {
  // setTimeout(() => {
  console.log(`Driver: order: ${payload.orderId} picked up`);
  socket.emit('IN_TRANSIT', payload);
  let newPayload = {
    id: payload.driverId,
    messageId: payload.messageId,
  };
  socket.emit('RECEIVED', newPayload);
  // }, 2000);
};

const deliveryHandler = (socket) => (payload) => {
  // setTimeout(() => {
  // console.log('Driver: order delivered: ', payload.orderId);
  console.log(`Driver: ${payload.orderId} delivered`);
  socket.emit('DELIVERED', payload);
  // }, 2000);
};

module.exports = { orderInTransit, deliveryHandler};

