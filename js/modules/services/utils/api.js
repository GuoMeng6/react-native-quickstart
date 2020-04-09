import { Platform } from 'react-native';
import _ from 'lodash';

function filterBody(body) {
  const filter = _.mapKeys(body, (value, key) => {
    if (value === undefined || value === null || value === '') {
      return;
    }
    if (typeof value === 'object' && _.isEmpty(value)) {
      return;
    }
    return key;
  });
  delete filter.undefined;
  return filter;
}

function filterUrl(url) {
  let newUrl = '';
  let count = 0;
  for (const p in url) {
    // 将函数过滤掉
    if (typeof url[p] === 'function') {
      continue;
    }
    if (url[p] || typeof (url[p] === 'number')) {
      if (count === 0) {
        newUrl = `${newUrl + p}=${url[p]}`;
      } else {
        newUrl = `${newUrl}&${p}=${url[p]}`;
      }
      count += 1;
    }
  }
  return newUrl;
}

function getHeader(store) {
  const headers = {};
  const { token } = store.getState().userInfo;
  if (token) {
    headers.token = token;
  }
  return headers;
}

module.exports = {
  filterUrl,
  filterBody,
  getHeader,
};
