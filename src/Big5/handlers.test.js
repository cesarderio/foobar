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

describe('Big5', () => {
  it('emits order as expect', () => {
    const payload = {
      store: 'big5',
      orderId: 'test123',
      customer: 'Raphael',
      address: 'home',
    };
    createOrder(socket)(payload);
    expect(console.log).toHaveBeenCalledWith('Big5: order: test123 ready for pickup');
    expect(socket.emit).toHaveBeenCalledWith('PICKUP_READY', payload);
  });
  it('thanks the driver', () => {
    const payload = {
      orderId: 'test123',
      customer: 'Raphael',
    };
    thankTheDriver(socket)(payload);
    `Big5: Thank you for delivering order: ${payload.orderId} to: ${payload.customer}`;
    expect(console.log).toHaveBeenCalledWith(`Big5: Thank you for delivering order: ${payload.orderId} to: ${payload.customer}`);
  });
});
