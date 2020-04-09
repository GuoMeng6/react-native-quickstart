import { Platform, Dimensions, PixelRatio, NativeModules } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { StatusBarManager } = NativeModules;
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('screen').height;
const pixelRatio = PixelRatio.get();
const fontScale = PixelRatio.getFontScale();
const defaultPixel = 2;
const scale = Math.min(deviceHeight / 667, deviceWidth / 375); // 获取缩放比例

// iPhoneX Xs
const X_WIDTH = 375;
const X_HEIGHT = 812;

// iPhoneXR XsMax
const XR_WIDTH = 414;
const XR_HEIGHT = 896;

const color = {
  primary: '#FFD033',
  primary2: '#FE8811',
  bg: '#F9F9FA',
  white: '#ffffff',
  black: '#000000',
  text1: '#3C3C5C',
  text2: '#9D9DAD',
  text3: '#CECED6',
  text4: '#E6E6EA',
};

const size = {
  deviceWidth,
  deviceHeight,
  lineWidth: 1 / pixelRatio,
  statusBarHeight: Platform.OS === 'android' ? StatusBarManager.HEIGHT : getStatusBarHeight(),
  navBarHeight: 44,
  widthScale: scale,
};

const style = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

/**
 * 设置text为sp
 * @param size sp
 * return number dp
 */
function setSpText(number) {
  number = Math.round((number * scale * pixelRatio) / fontScale);
  return number / defaultPixel;
}

function scaleSize(number) {
  number = Math.round(number * scale);
  return number;
}

//判断是否为iphoneX或Xs
function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    ((deviceHeight === X_HEIGHT && deviceWidth === X_WIDTH) ||
      (deviceHeight === X_WIDTH && deviceWidth === X_HEIGHT))
  );
}

//判断是否为iphoneXR或XsMAX
function isIphoneXR() {
  return (
    Platform.OS === 'ios' &&
    ((deviceHeight === XR_HEIGHT && deviceWidth === XR_WIDTH) ||
      (deviceHeight === XR_WIDTH && deviceWidth === XR_HEIGHT))
  );
}
const { isPad } = Platform;

const UI = { color, size, scaleSize, isPad, style, isIphoneX, isIphoneXR };
module.exports = UI;
