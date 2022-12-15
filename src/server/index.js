'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const PORT = process.env.PORT || 3002;
const Queue = require('./lib/queue');
const server = new Server(PORT);

const foobar = server.of('/foobar');
const messageQueue = new Queue();

foobar.on('connection', (socket) => {
  socket.onAny((event, payload) => {
    const time = new Date();
    console.log('EVENT', {event, time, payload});
  });
  socket.on('JOIN', (id) => {
    console.log('These are the rooms', socket.rooms);
    socket.join(id);
    console.log('Joined the room: ', id);
    socket.emit('JOIN', id);
  });  
  console.log('Socket connected to foobar namespace', socket.id);

  socket.on('PICKUP', (payload) => {
    // console.log('hub: vendor has delivery', payload)
    let currentQueue = messageQueue.read(payload.driverId);
    if(!currentQueue){
      let queueKey = messageQueue.store(payload.driverId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);
    socket.broadcast.emit('PICKUP', payload);
  });

  socket.on('IN-TRANSIT', (payload) => {
    socket.broadcast.emit('IN_TRANSIT', payload);
  });

  socket.on('DELIVERED', (payload) => {
    console.log('Driver: order has been delivered');
    let currentQueue = messageQueue.read(payload.vendorId);
    if(!currentQueue){
      let queueKey = messageQueue.store(payload.vendorId, new Queue());
      currentQueue = messageQueue.read(queueKey);
    }
    currentQueue.store(payload.messageId, payload);
    socket.to(payload.vendorId).emit('DELIVERED', payload);
  });

  socket.on('RECEIVED', (payload) => {
    let currentQueue = messageQueue.read(payload.id);
    if(!currentQueue){
      throw new Error('no queue exists');
    }
    currentQueue.remove(payload.messageId);
  });

  socket.on('GET_ALL', (payload) => {
    let currentQueue = messageQueue.read(payload.id);
    if(currentQueue && currentQueue.data){
      Object.keys(currentQueue.data).forEach(message => {
        if(payload.id !== 'FPX'){
          socket.emit('DELIVERED', currentQueue.read(message));
        } else {
          socket.emit('PICKUP', currentQueue.read(message));
        }
      });
    }
  });

});


