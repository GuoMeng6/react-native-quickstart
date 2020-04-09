import React from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';
import { dispatch } from '~/modules/redux-app-config';

@connect(R.pick(['userInfo']))
class AuthLoadingScreen extends React.Component {
  UNSAFE_componentWillMount() {
    const isLogin = false;
    if (isLogin) {
      this.props.navigation.navigate('main', { transition: 'forFade' });
    } else {
      this.props.navigation.navigate('login', { transition: 'forFade' });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthLoadingScreen;
