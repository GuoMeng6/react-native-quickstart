import { createStore, combineReducers, applyMiddleware } from 'redux';

import { persistStore, persistReducer, REHYDRATE } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import configureRedux from 'redux-config';
import { createNavigationReducer } from 'react-navigation-redux-helpers';

import { AppNavigator } from '~/AppRouter';
import config from '~/models';

import middlewares, { sagaMiddleware } from './middlewares';
import updateStore from './updateStore';
import sagas from './sagas';

const { actions, reducers, persists } = configureRedux(config);

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: persists,
};

export default actions;

// =================== reducer ===============
const navReducer = createNavigationReducer(AppNavigator);
const rootReducer = combineReducers({
  ...reducers,
  nav: navReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, middlewares);

sagaMiddleware.run(sagas);

export const asyncAction = type => store.dispatch({ type });

export function dispatch(type, payload) {
  if (type.indexOf('Navigation') > -1) {
    // 处理路由跳转
    store.dispatch({ type, routeName: payload });
    return;
  }
  store.dispatch({ type, payload });
}

export const persistor = persistStore(store, { manualPersist: true }, () => {
  updateStore({ persistor, store, actions });
});
