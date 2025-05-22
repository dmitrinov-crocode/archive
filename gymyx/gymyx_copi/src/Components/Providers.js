'use client';

import { SessionProvider } from 'next-auth/react';
import { Provider as ReduxProvider } from 'react-redux';
import store from '@/redux/store';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Loading from './Loading';

export const Providers = ({ children }) => {
  let persistor = persistStore(store);

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={<Loading full_screen={true} background={true} />} persistor={persistor}>
        <SessionProvider>{children}</SessionProvider>
      </PersistGate>
    </ReduxProvider>
  );
};
