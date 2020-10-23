import { resolve } from 'path';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

export const subscribeToTimer = (cb) => {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

export const getCOMPorts = (cb) => {
  socket.emit('requestCOMPorts')
  socket.on('getCOMPorts', ports => cb(ports));
}

export const connectCOMPort = (cb, port) => {
  socket.emit('connectToCOMPort', port)
}