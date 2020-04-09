import { NativeModules } from 'react-native';

const { MyPackage } = NativeModules;

function callNative(params, res) {
  return;
}

module.exports = {
  callNative,
};
