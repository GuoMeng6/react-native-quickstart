import React, { Component } from 'react';
import { View, StyleSheet, Platform, BackHandler, ToastAndroid } from 'react-native';

import { store } from '~/modules/redux-app-config';
import { getRouteName } from '~/modules/services/utils';
import AppLoading from '~/components/AppLoading';

import AppWithNavigationState from './AppRouter';

class AppContent extends Component {
  UNSAFE_componentWillMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
    }
  }

  onBackAndroid() {
    const routeName = getRouteName(store.getState().nav);
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      // 最近2秒内按过back键，可以退出应用。
      return false;
    }
    this.lastBackPressed = Date.now();
    ToastAndroid.show('再按一次退出程序', ToastAndroid.SHORT);
    return true;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <AppWithNavigationState />
        </View>
        <AppLoading />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppContent;
