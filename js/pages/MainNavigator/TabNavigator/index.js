import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Platform, View, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import R from 'ramda';

import UI from '~/modules/UI';
import i18n from '~/i18n';

import Home from './Home';
import Account from './Account';

const tabConfig = {
  initialRouteName: 'home',
  defaultNavigationOptions: {
    headerStyle: {
      height: UI.size.statusBarHeight + UI.scaleSize(50),
      paddingTop: UI.size.statusBarHeight,
    },
  },
  tabBarOptions: {
    showIcon: true,
    style: {
      height: UI.scaleSize(50),
    },
    activeTintColor: UI.color.primary,
    inactiveTintColor: '#666666',
    labelStyle: {
      fontSize: UI.scaleSize(12),
      marginRight: UI.isPad ? UI.scaleSize(10) : 0,
    },
    tabStyle: {
      height: UI.scaleSize(50),
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
};

const TabNavigator = createBottomTabNavigator(
  {
    home: { screen: Home },
    account: { screen: Account },
  },
  tabConfig,
);

@connect(R.pick(['userInfo', 'deviceInfo']))
class TabNavigatorComponent extends Component {
  static router = TabNavigator.router;

  static navigationOptions = ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    return {
      headerTitle: i18n.t(`tab.${routeName}`),
      headerTitleStyle: {
        flex: 1,
        fontSize: UI.scaleSize(20),
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        color: UI.color.black,
      },
    };
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#EAEAEB' }}>
        <TabNavigator navigation={this.props.navigation} />
      </View>
    );
  }
}

export default TabNavigatorComponent;
