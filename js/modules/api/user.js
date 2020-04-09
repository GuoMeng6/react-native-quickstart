/** 用户相关接口 */
import Config from 'react-native-config';
import request from '~/modules/services/request';
import { store } from '~/modules/redux-app-config';
import { getHeader, filterUrl } from '~/modules/services/utils';

const { API_URL } = Config;

// 登录
async function login(params) {
  return new Promise(res => {
    setTimeout(() => {
      res({ msg: 'success', result: { token: '111', name: '小明' } });
    }, 2000);
  });
  return request('/user/login', {
    method: 'POST',
    body: params,
  });
}

async function logout(params) {
  return request('/user/logout', {
    method: 'POST',
    body: params,
    headers: getHeader(store),
  });
}

module.exports = {
  login,
  logout,
};
