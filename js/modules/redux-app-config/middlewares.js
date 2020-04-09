/* eslint-disable */
import { applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';

const middlewares = [];

if (__DEV__) {
  const createLogger = require('redux-logger');
  middlewares.push(
    createLogger({
      collapsed: () => true,
      predicate: (_, action) => action.type !== 'EX_NAVIGATION.BATCH'
    })
  );
}

export const sagaMiddleware = createSagaMiddleware();
const navReducerMiddleware = createReactNavigationReduxMiddleware(
  state => state.nav,
);

export default applyMiddleware(...middlewares, sagaMiddleware, navReducerMiddleware)

// export default middlewares;
