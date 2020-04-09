import { NativeModules } from 'react-native';

const { MyPackage } = NativeModules;

function callNative(params, res) {
  MyPackage.sendMessage(params, res);
}

module.exports = {
  callNative,
};
