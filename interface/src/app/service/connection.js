import socketIOClient from 'socket.io-client';
import denodeify from 'denodeify';

export const socket = socketIOClient.connect({path: '/ws'});
export const emit = denodeify(socket.emit.bind(socket));
