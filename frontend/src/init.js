import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import store from './slices/store.js';
import resources from './locales/index.js';
import AuthProvider from './context/AuthProvider.jsx';
import SocketProvider from './context/SocketProvider.jsx';
import socket from './context/Socket.js';
import App from './App.jsx';

const init = async () => {
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
