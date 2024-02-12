import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { io } from 'socket.io-client';
import store from './slices/store.js';
import resources from './locales/index.js';
import AuthProvider from './context/AuthProvider.jsx';
import SocketProvider from './context/SocketProvider.jsx';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice.js';
import App from './App.jsx';

const init = async () => {
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

  const i18n = i18next.createInstance();
  await i18n.use(initReactI18next).init({ resources, lng: 'ru', fallbackLng: 'ru' });

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  return (
    <Provider store={store}>
      <SocketProvider socket={socket}>
        <AuthProvider>
          <I18nextProvider i18n={i18n}>
            <RollbarProvider config={rollbarConfig}>
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
            </RollbarProvider>
          </I18nextProvider>
        </AuthProvider>
      </SocketProvider>
    </Provider>
  );
};

export default init;
