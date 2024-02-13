/* eslint-disable no-param-reassign */

import { io } from 'socket.io-client';
import { actions as messagesActions } from '../slices/messagesSlice';
import { actions as channelsActions } from '../slices/channelsSlice';
import store from '../slices/store';

const socket = io();

socket.on('newMessage', (message) => {
  store.dispatch(messagesActions.addMessage(message));
});
socket.on('newChannel', (channel) => {
  store.dispatch(channelsActions.addChannel(channel));
});
socket.on('renameChannel', ({ id, name }) => {
  store.dispatch(channelsActions.renameChannel({ id, changes: { name } }));
});
socket.on('removeChannel', ({ id }) => {
  store.dispatch(channelsActions.removeChannel(id));
});

export default socket;
