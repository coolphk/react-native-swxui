import {Dimensions, PixelRatio, Platform} from 'react-native'


export let screenW = Dimensions.get('window').width;
export let screenH = Dimensions.get('window').height;
export let screenWidth = Dimensions.get("screen").width;
export let screenHeight = Dimensions.get("screen").height;

let fontScale = PixelRatio.getFontScale();
let pixelRatio = PixelRatio.get();
// 设计宽度和高度
const designWidth = 1080.0;
const designHeight = 1920.0;


// iPhoneX Xs
const X_WIDTH = 375;
const X_HEIGHT = 812;

// iPhoneXR XsMax
const XR_WIDTH = 414;
const XR_HEIGHT = 896;

// 根据dp获取屏幕的px
let screenPxW = PixelRatio.getPixelSizeForLayoutSize(screenW);
let screenPxH = PixelRatio.getPixelSizeForLayoutSize(screenH);

if (Platform.OS === 'ios') {
  fontScale = 1.118
}


/**
 * 设置text
 * @param size  px
 * @returns {Number} dp
 */
export function setSpText(size) {
  var scaleWidth = screenW / designWidth;
  var scaleHeight = screenH / designHeight;
  var scale = Math.min(scaleWidth, scaleHeight);
  size = Math.round(size * scale / fontScale + 0.5);
  return size;
}

/**
 * 设置高度
 * @param size  px
 * @returns {Number} dp
 */
export function scaleSizeH(size) {
  var scaleHeight = size * screenPxH / designHeight;
  size = Math.round((scaleHeight / pixelRatio + 0.5));
  return size;
}

/**
 * 设置宽度
 * @param size  px
 * @returns {Number} dp
 */
export function scaleSizeW(size) {
  var scaleWidth = size * screenPxW / designWidth;
  size = Math.round((scaleWidth / pixelRatio + 0.5));
  return size;
}

//判断是否是iphoneX XS
export function isIphoneX_XS() {
  return (
    Platform.OS === 'ios' &&
    ((screenH === X_HEIGHT && screenW === X_WIDTH) ||
      (screenH === X_WIDTH && screenW === X_HEIGHT))
  )
}

//判断是否为iphoneXR或XsMAX
export function isIphoneXR_XSMAX() {
  return (
    Platform.OS === 'ios' &&
    ((screenH === XR_HEIGHT && screenW === XR_WIDTH) ||
      (screenH === XR_WIDTH && screenW === XR_HEIGHT))
  )
}

export function isIOS(){
  return Platform.OS === 'ios'
}

export function isAndroid(){
  return Platform.OS === 'android'
}

