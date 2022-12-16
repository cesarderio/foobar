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

describe('Vendor', () => {
  it('emits order as expect', () => {
    const payload = {
      store: 'Vendor',
      orderId: 'test123',
      customer: 'Raphael',
      address: 'home',
    };
    createOrder(socket)(payload);
    expect(console.log).toHaveBeenCalledWith('Vendor: order: test123 ready for pickup');
    expect(socket.emit).toHaveBeenCalledWith('PICKUP', payload);
  });
  it('thanks the driver', () => {
    thankTheDriver({
      orderId: 'test123',
      customer: 'Raphael'});
    expect(console.log).toHaveBeenCalledWith('Vendor: Thank you for delivering order: test123 to: Raphael');
    expect(socket.emit).toHaveBeenCalledWith('DELIVERED', payload);
  });
});
