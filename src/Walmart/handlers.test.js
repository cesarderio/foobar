'use strict';

const { createOrder, thankTheDriver } = require('./handlers');
let socket = require('../../socket-client');

jest.mock('../../socket-client', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Walmart', () => {
  it('emits order as expect', () => {
    const payload = {
      store: 'Walmart',
      orderId: 'test123',
      customer: 'Raphael',
      address: 'home',
    };
    createOrder(socket)(payload);
    expect(console.log).toHaveBeenCalledWith('Walmart: order: test123 ready for pickup');
    expect(socket.emit).toHaveBeenCalledWith('PICKUP_READY', payload);
  });
  it('thanks the driver', () => {
    const payload = {
      orderId: 'test123',
      customer: 'Raphael',
    };
    thankTheDriver(socket)(payload);
    `Walmart: Thank you for delivering order: ${payload.orderId} to: ${payload.customer}`;
    expect(console.log).toHaveBeenCalledWith(`Walmart: Thank you for delivering order: ${payload.orderId} to: ${payload.customer}`);
  });
});
