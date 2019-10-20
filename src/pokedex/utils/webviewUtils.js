/* eslint-disable */

export const rootContractId = {
  value: null,
  get() {
    return this.value;
  },
  set(val) {
    this.value = val;
  }
};

export const checkAppName = () => {
  return typeof Android !== 'undefined'
    ? 'android'
    : typeof Ios !== 'undefined'
    ? 'ios'
    : 'web';
};

const Web = {
  onBackPressed: () => {
    console.log('Load inside webview');
  },
  showErrorToast: val => {
    console.log('Toast:', val);
  },
  sessionExpiryEvent: () => {
    console.log('Session expiry called');
  },
  getGtmUrl: val => {
    return handleUrlSwitch(val);
  },
  sharePost: url => {
    console.log('Load inside webview', url);
  },
  startCameraForImageUpload: val => {
    console.log('Load inside webview', val);
  },
  startGalleryForImageUpload: val => {
    console.log('Load inside webview', val);
  },
  openCustomGallery: () => {
    console.log('Load inside webview');
  },
  setNumberOfImagesToBeUploaded: () => {
    console.log('load inside webview');
  },
  getGAEvents: (cat, value) => {
    console.log('GA:', cat, value);
  },
  getAuthData: () => {
    return '{"token":"b1588875-9a36-4100-bb94-ad7d1c016600","mid":"TVhmdu92708061714544","merchant_name":"Chanshu Arora","is_supported":true}';
  },
  getIPAddress: () => {
    return '10.10.10.10';
  },
  showLocationPrompt: () => {
    console.log('load inside webview');
  },
  getGASreenEvents: screen => {
    console.log('GAScreen: ', screen);
  },
  openNativeWebview: url => {
    console.log('Loading the following url in Native ', url);
  },
  sendDeepLink: deeplink => {
    console.log(deeplink);
  }
};

const myInterface =
  typeof Android !== 'undefined'
    ? Android
    : typeof Ios !== 'undefined'
    ? Ios
    : Web;

export function getAuthData() {
  return JSON.parse(myInterface.getAuthData());
}
export const APP_VERSION = getAuthData().app_version
  ? getAuthData().app_version
  : '2.5.5';

export function getIPAddress() {
  return myInterface.getIPAddress();
}
export function closeWebView() {
  myInterface.onBackPressed();
}

export function sendDeepLink(deeplink) {
  myInterface.sendDeepLink(deeplink);
}

export function sharePost(val) {
  gaTrack('Channels-details', 'share_offer');
  myInterface.sharePost(val);
}

export function showToast(val) {
  myInterface.showErrorToast(val);
}

export function getApiUrl(val) {
  return myInterface.getGtmUrl(val);
}

export function showLocationPrompt() {
  myInterface.showLocationPrompt();
}

export function gaTrack(category, action) {
  myInterface.getGAEvents(category, action, null);
}

export function gaScreenEventTrack(screen) {
  myInterface.getGASreenEvents(screen);
}

export function sessionExpiryEvent() {
  myInterface.sessionExpiryEvent();
}

export function startCameraForImageUpload(val) {
  myInterface.startCameraForImageUpload(val);
}

export function openCustomGallery(num) {
  myInterface.openCustomGallery(num);
}

export function startGalleryForImageUpload(val) {
  myInterface.startGalleryForImageUpload(val);
}
export function setNumberOfImagesToBeUploaded(val) {
  myInterface.setNumberOfImagesToBeUploaded(val);
}
export function showNativeLoader() {
  myInterface.showNativeLoader();
}
export function hideNativeLoader() {
  myInterface.hideNativeLoader();
}
export function openNativeWebview(url) {
  return myInterface.openNativeWebview(url);
}

export function pushHawkeyeEvent(payload) {
  if (myInterface.pushHawkeyeEvent) {
    myInterface.pushHawkeyeEvent(JSON.stringify(payload));
  }
}

// let baseUrl = "https://digitalproxy.paytm.com/chlbwp";
// let baseUrl = "https://digitalproxy-staging.paytm.com/chlbwp";
// let baseUrl = '//localhost:3000';
let baseUrl = 'https://ump-staging4.paytm.com';

function handleUrlSwitch(val) {
  switch (val) {
    case 'gvActivationStatus':
      return baseUrl + '/api/v1/voucher/status';
    case 'gvActivateApi':
      return baseUrl + '/api/v1/voucher/activate';
    case 'getTncApi':
      return baseUrl + '/api/v1/voucher/tnc';
    case 'getTemplateApi':
      return baseUrl + '/api/v1/voucher/template';
    case 'voucherList':
      return baseUrl + '/api/v1/voucher';
    default:
      return null;
  }
}

export function hardwareBackPressed(routerHistory) {
  if (window.location.hash === '#noNetwork') {
    return closeWebView();
  }
  // window.location.pathname = /staging-merchant.paytm.com/v1/index.html/review" --- for staging
  // window.location.pathname = /v1/index.html/review" --- Production
  let pathArr = window.location.pathname.split('/');
  let customPathname = '/' + pathArr[pathArr.length - 1];
  //back press on edit offer should goto view offer
  switch (customPathname) {
    case '/landing':
      return closeWebView();
    case '/profile':
      return routerHistory.push('/');
    case '/storeTiming':
      return routerHistory.push('/profile');
    case '/timeline':
      return closeWebView();
    case '/vouchers':
      return closeWebView();
    default:
      return window.history.back();
  }
}

export function trimCharacter(str, character) {
  let ans = '';
  if (str) {
    for (let i = 0; i < str.length; i++) {
      if (str[i] !== character) ans = ans + str[i];
    }
  }
  return ans;
}

export const merchantName = getAuthData().merchant_name;

export const pgMid = getAuthData().mid;

export const session_token = getAuthData().token;
export const osVersion = getAuthData().os_version
  ? getAuthData().os_version
  : '';
export const appVersion = getAuthData().app_version
  ? getAuthData().app_version
  : '';
export const client = getAuthData().client ? getAuthData().client : '';
export const deviceIdentifier = getAuthData().device_identifier
  ? getAuthData().device_identifier
  : '';
