import React, { Component } from 'react';
import { StatusBar, Platform, View, Text } from 'react-native';
import { Provider } from 'react-redux';
import Config from 'react-native-config';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '~/modules/redux-app-config';
import AppContent from './AppContent';

class App extends Component {
  componentDidMount() {
    // console.log('============= Config ============= ', Config);
    if (Platform.OS === 'android') {
      StatusBar.setTranslucent(true);
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setBarStyle('dark-content');
    }
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContent />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
