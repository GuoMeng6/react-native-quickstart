import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import R from 'ramda';
import { connect } from 'react-redux';

import UI from '~/modules/UI';
import actions from '~/modules/redux-app-config';

@connect(
  R.pick(['loading']),
  actions,
)
class AppLoading extends Component {
  render() {
    const { visible, percentage } = this.props.loading;
    if (!visible) {
      return null;
    }
    return (
      <View style={styles.fullScreen}>
        <View style={styles.centerBox}>
          <ActivityIndicator color="white" size="large" />
          {typeof percentage === 'number' && <Text style={styles.fontText}>{percentage}%</Text>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: UI.size.deviceWidth,
    height: UI.size.deviceHeight,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerBox: {
    width: UI.size.deviceWidth * 0.3,
    height: UI.size.deviceWidth * 0.3,
    borderRadius: 20,
    backgroundColor: `${UI.color.black}88`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontText: {
    marginTop: UI.scaleSize(5),
    color: UI.color.white,
    fontSize: UI.scaleSize(12),
  },
});

export default AppLoading;
