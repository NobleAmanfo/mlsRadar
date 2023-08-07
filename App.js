import React from 'react';
import Routes from './src/navigation/Routes';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {Store, persistor} from './src/store';

export default function App() {
  return (
    <Provider store={Store}>
     <PersistGate loading={null} persistor={persistor}>
       <Routes/>
      </PersistGate>
      </Provider>
  );
}

