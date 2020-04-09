import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import R from 'ramda';
import { connect } from 'react-redux';

import i18n from '~/i18n';
import UI from '~/modules/UI';
import actions from '~/modules/redux-app-config';

const accountImg = require('~/images/account.png');

@connect(
  R.pick(['userInfo']),
  actions,
)
class Account extends Component {
  static navigationOptions = () => ({
    tabBarLabel: i18n.t('tab.account'),
    tabBarIcon: ({ focused }) => (
      <Image
        style={[styles.icon, { tintColor: focused ? UI.color.primary : '#666666' }]}
        source={accountImg}
      />
    ),
    tabBarOnPress: ({ navigation }) => {
      // do other things
      const { navigate, state } = navigation;
      navigate(state.routeName);
    },
  });

  render() {
    return (
      <View style={styles.container}>
        <Text>Account</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: UI.scaleSize(28),
    height: UI.scaleSize(28),
  },
});

export default Account;
