import { Easing, Animated, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  StackActions,
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import { createReduxContainer } from 'react-navigation-redux-helpers';
import CardStackStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

import UI from '~/modules/UI';

import AuthLoading from '~/pages/AuthLoading.js';
import PageLogin from '~/pages/LoginNavigator/PageLogin';
import TabNavigator from '~/pages/MainNavigator/TabNavigator';

const TransitionConfiguration = () => ({
  screenInterpolator: sceneProps => {
    const { scene } = sceneProps;
    const { route } = scene;
    const params = route.params || {};
    const transition = params.transition || 'forHorizontal'; // forVertical
    return CardStackStyleInterpolator[transition](sceneProps);
  },
  transitionSpec: {
    duration: 200,
    easing: Easing.linear,
    timing: Animated.timing,
  },
});

// 登录模块路由
const LoginNavigator = createStackNavigator(
  {
    pageLogin: { screen: PageLogin },
  },
  {
    initialRouteName: 'pageLogin',
    headerMode: 'screen',
    mode: 'card',
    headerLayoutPreset: 'center',
    navigationOptions: {
      gesturesEnabled: false,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
      },
    },
  },
);

export const MainNavigator = createStackNavigator(
  {
    tab: { screen: TabNavigator },
  },
  {
    initialRouteName: 'tab',
    headerMode: 'float',
    mode: 'card',
    transitionConfig: TransitionConfiguration,
    headerLayoutPreset: 'center',
    navigationOptions: {
      gesturesEnabled: true,
    },
    defaultNavigationOptions: {
      headerStyle: {
        height: UI.size.statusBarHeight + UI.scaleSize(50),
        paddingTop: UI.size.statusBarHeight,
      },
    },
  },
);

const appRouteParams = {
  initialRouteName: 'auth',
  headerMode: 'none',
  mode: 'modal',
  headerLayoutPreset: 'center',
};
export const AppNavigator = createSwitchNavigator(
  {
    login: { screen: LoginNavigator },
    main: { screen: MainNavigator },
    auth: { screen: AuthLoading },
  },
  appRouteParams,
);

// 处理一个页面重复跳转的问题
const navigateOnce = getStateForAction => (action, lastState) => {
  const { type, routeName, params } = action;
  //此处需要注意，使用了createSwitchNavigator后，lastState.routes[lastState.routes.length - 1]拿不到我们想要的那个对象
  const mainStackRoutes = lastState && lastState.routes.find(item => item.key === 'main'); //拿到我们想要的那个对象

  return mainStackRoutes &&
  type === StackActions.PUSH && //此处原先使用NavigationActions.NAVIGATE
    routeName === mainStackRoutes.routes[mainStackRoutes.routes.length - 1].routeName &&
    JSON.stringify(params) ===
      JSON.stringify(mainStackRoutes.routes[mainStackRoutes.routes.length - 1].params)
    ? null
    : getStateForAction(action, lastState);
};

//使用，MainNavigator是主导航页面通过createAppContainer方法的返回值
AppNavigator.router.getStateForAction = navigateOnce(AppNavigator.router.getStateForAction);

const App = createReduxContainer(AppNavigator);
const mapStateToProps = state => ({
  state: state.nav,
});
const AppWithNavigationState = connect(mapStateToProps)(App);

export default AppWithNavigationState;
