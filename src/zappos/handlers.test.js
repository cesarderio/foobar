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

describe('Zappos', () => {
  it('emits order as expect', () => {
    const payload = {
      store: 'zappos',
      orderId: 'test123',
      customer: 'John',
      address: 'home',
    };
    createOrder(socket)(payload);
    expect(console.log).toHaveBeenCalledWith('Zappos: order: test123 ready for pickup');
    expect(socket.emit).toHaveBeenCalledWith('PICKUP_READY', payload);
  });
  it('thanks the driver', () => {
    const payload = {
      orderId: 'test123',
      customer: 'John',
    };
    thankTheDriver(socket)(payload);
    `Zappos: Thank you for delivering order: ${payload.orderId} to: ${payload.customer}`;
    expect(console.log).toHaveBeenCalledWith(`Zappos: Thank you for delivering order: ${payload.orderId} to: ${payload.customer}`);
  });
});
