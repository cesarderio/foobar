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

describe('Customer', () => {
  it('emits order as expect', () => {
    const payload = {
      store: 'foobar',
      orderId: 'test123',
      customer: 'John',
      address: 'home',
    };
    createOrder(socket)(payload);
    // expect(console.log).toHaveBeenCalledWith('Vendor: order: test123 ready for pickup');
    expect(socket.emit).toHaveBeenCalledWith('PICKUP_READY', payload);
  });
  it('thanks the driver', () => {
    thankTheDriver({
      orderId: 'test123',
      customer: 'John'});
    expect(console.log).toHaveBeenCalledWith('Vendor: Thank you for delivering order: test123 to: John');
  });
});
