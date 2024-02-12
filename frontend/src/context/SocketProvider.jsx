import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { SocketContext } from './index';
import { actions as channelsActions } from '../slices/channelsSlice.js';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();

  const valuesOfProvider = useMemo(() => (
    {
      addMessage: async (body, channelId, username) => {
        const messageData = {
          body,
          channelId,
          username,
        };
        await socket.timeout(3000).emitWithAck('newMessage', messageData);
      },
      addChannel: async (channel) => {
        const { data } = await socket.emitWithAck('newChannel', channel);
        dispatch(channelsActions.changeChannel(data.id));
      },
      renameChannel: async (id, name) => {
        await socket.emit('renameChannel', { id, name });
      },
      removeChannel: async (id) => {
        await socket.emit('removeChannel', { id });
      },
    }), [socket, dispatch]);

  return (
    <SocketContext.Provider value={valuesOfProvider}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
