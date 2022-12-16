'use strict';

let socket = require('../../socket-client');
const { orderInTransit, deliveryHandler } = require('./handlers');

jest.mock('../../socket-client', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Driver', () => {
  it('picks up order and emits in transit as expected', () => {
    const payload = {
      store: '1-206-flowers',
      orderId: 'test123',
      customer: 'John',
      address: 'home',
    };
    orderInTransit(socket)(payload);
    expect(console.log).toHaveBeenCalledWith('Driver: order: test123 picked up');
    expect(socket.emit).toHaveBeenCalledWith('IN_TRANSIT', payload);
  });
  it('delivers as expected', () => {
    const payload = {
      store: '1-206-flowers',
      orderId: 'test123',
      customer: 'John',
      address: 'home',
    };
    deliveryHandler(socket)(payload);
    expect(console.log).toHaveBeenCalledWith('Driver: test123 delivered');
    expect(socket.emit).toHaveBeenCalledWith('DELIVERED', payload);
  });
});
