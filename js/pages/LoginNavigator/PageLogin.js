import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import actions, { dispatch } from '~/modules/redux-app-config';
import R from 'ramda';
import UI from '~/modules/UI';
import i18n from '~/i18n';

const logoImg = require('./img/logo.png');

@connect(
  R.pick(['']),
  actions,
)
class PageLogin extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.state = {};
    this.login = this.login.bind(this);
  }

  login() {
    Keyboard.dismiss();
    dispatch('SET_LOADING', { visible: true });
    dispatch('USER_LOGIN', {
      mobile: '13300000000',
      password: '123456',
      res: () => {
        dispatch('SET_LOADING', { visible: false });
        this.props.navigation.navigate('main');
      },
    });
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="position"
          keyboardVerticalOffset={-UI.scaleSize(110) - UI.size.statusBarHeight - UI.scaleSize(20)}
        >
          <View style={{ paddingBottom: UI.scaleSize(110) }} />
          <Image source={logoImg} style={styles.logoImg} />
          <TextInput
            style={styles.email}
            placeholder={i18n.t('login.email')}
            placeholderTextColor={UI.color.text3}
            keyboardType="email-address"
            autoCorrect={false}
            maxLength={11}
          />
          <TextInput
            style={styles.password}
            placeholder={i18n.t('login.password')}
            placeholderTextColor={UI.color.text3}
            // keyboardType="email-address"
            autoCorrect={false}
            secureTextEntry
          />
          <TouchableOpacity onPress={this.login} style={styles.btnView} activeOpacity={1}>
            <Text style={styles.loginText}>{i18n.t('login.login')}</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  logoImg: {
    width: UI.scaleSize(100),
    height: UI.scaleSize(100),
    alignSelf: 'center',
  },
  email: {
    width: UI.size.deviceWidth - UI.scaleSize(24 * 2),
    height: UI.scaleSize(50),
    marginTop: UI.scaleSize(44),
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: UI.scaleSize(10),
    paddingHorizontal: UI.scaleSize(20),
  },
  password: {
    width: UI.size.deviceWidth - UI.scaleSize(24 * 2),
    height: UI.scaleSize(50),
    marginTop: UI.scaleSize(15),
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: UI.scaleSize(10),
    paddingHorizontal: UI.scaleSize(20),
  },
  btnView: {
    width: UI.size.deviceWidth - UI.scaleSize(24 * 2),
    height: UI.scaleSize(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: UI.color.primary,
    borderRadius: UI.scaleSize(10),
    marginTop: UI.scaleSize(15),
  },
  loginText: {
    fontSize: UI.scaleSize(24),
    fontWeight: 'bold',
    color: UI.color.white,
  },
});

export default PageLogin;
