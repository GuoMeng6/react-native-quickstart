import { PermissionsAndroid, Platform, Alert, Image, DeviceEventEmitter } from 'react-native';
import Config from 'react-native-config';
import _ from 'lodash';

/**
 * 获取当前路由的名字
 * @param {object} navigationState
 */
function getRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getRouteName(route);
  }
  return route.routeName;
}

/**
 * 获取区间随机整数
 * @param {number} max
 * @param {number} min
 */
function random(max = 10, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}

async function requestPermission(permission) {
  if (Platform.OS === 'ios') {
    return;
  }
  try {
    const granted = await PermissionsAndroid.request(permission, {});
  } catch (err) {}
}

async function requestPermissions(permissions) {
  if (Platform.OS === 'ios') {
    return;
  }
  try {
    const granted = await PermissionsAndroid.requestMultiple(permissions, {});
    return granted;
  } catch (err) {}
}

async function checkPermission(permission) {
  if (Platform.OS === 'ios') {
    return;
  }
  try {
    const granted = await PermissionsAndroid.check(permission);
    return granted;
  } catch (err) {}
}

function checkPhone(phone) {
  if (!/^1[3456789]\d{9}$/.test(phone)) {
    return false;
  }
  return true;
}

module.exports = {
  getRouteName,
  random,
  requestPermission,
  requestPermissions,
  checkPermission,
  checkPhone,
};
