'use strict';

const eventPool = require('./eventPool');
require('./driver');
require('./vendor');
require('./customer');


function logger(event, payload){
  const time = new Date();
  console.log('EVENT', {event, time, payload});
}


eventPool.on('PICKUP_READY',(payload)=> logger('PICKUP_READY', payload));
eventPool.on('IN_TRANSIT',(payload)=> logger('IN_TRANSIT', payload));
eventPool.on('DELIVERED',(payload)=> logger('DELIVERED', payload));
