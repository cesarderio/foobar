'use strict';

const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/foobar');

module.exports = socket;
