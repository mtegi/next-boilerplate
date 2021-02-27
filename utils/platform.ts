import UAParser from 'ua-parser-js';

export const ALLOWED_BROWSERS = [
  { os: 'Mac OS', name: 'Firefox', version: 80 },
  { os: 'Mac OS', name: 'Safari', version: 13 },
  { os: 'Mac OS', name: 'Chrome', version: 84 },
  { os: 'Mac OS', name: 'Edge', version: 83 },
  { os: 'Windows', name: 'Firefox', version: 80 },
  { os: 'Windows', name: 'Chrome', version: 84 },
  { os: 'Windows', name: 'Edge', version: 83 },
  { os: 'iOS', name: 'Mobile Safari', version: 13 },
  { os: 'Android', name: 'Chrome' },
  { os: 'Android', name: 'Firefox' },
];
export const minWindowSize = {
  width: 1024,
  height: 680,
};
export const isBrowser = () => typeof window !== 'undefined';
export const UA = new UAParser();
const { name, version } = UA.getBrowser();
export const { device, os } = UA.getResult();
const getUA = () =>
  isBrowser() ? navigator.userAgent || navigator.vendor : '';

export const isTouchDevice = () => {
  if (!isBrowser()) return false;
  return (
    'ontouchstart' in window ||
    'ontouchstart' in document.documentElement ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};
export const isIOS = () => os.name === 'iOS';
export const isAndroid = () => os.name === 'Android';
export const isMobile = () => device.type === 'mobile';
export const isTablet = () => device.type === 'tablet' || isRecentIPadSafari();
export const isDesktop = () => !isMobile() && !isTablet();
// As of Safari iOS 13, iPads return UA strings identical to Mac OS, instead of iOS
export const isRecentIPadSafari = () =>
  isTouchDevice() && isSafari() && !isIOS();
export const isRecentOS = () =>
  (isAndroid() && parseFloat(os.version) >= 9) ||
  (isIOS() && parseFloat(os.version) >= 13) ||
  isRecentIPadSafari();

// Browsers
export const isSafari = () =>
  isBrowser() && name.toLowerCase().indexOf('safari') > -1;
export const isOpera = () =>
  isBrowser() && name.toLowerCase().indexOf('opera') > -1;
export const isFirefox = () =>
  isBrowser() && name.toLowerCase().indexOf('firefox') > -1;
export const isIE = () => isBrowser() && name.indexOf('IE') > -1;
export const isEdge = () =>
  isBrowser() && (name.indexOf('Edge') > -1 || /.*EdgA*/.test(getUA()));
export const isChrome = () => isBrowser() && name.indexOf('Chrome') > -1;
export const isFacebook = () =>
  isBrowser() && (getUA().indexOf('FBAN') > -1 || getUA().indexOf('FBAV') > -1);
export const isInstagram = () =>
  isBrowser() && getUA().indexOf('Instagram') > -1;
export const isTwitter = () => isBrowser() && getUA().indexOf('Twitter') > -1;

export const isSocialBrowser = () =>
  isFacebook() || isInstagram() || isTwitter();

export const isStorybook = () =>
  isBrowser() &&
  window.location.pathname === '/iframe.html' &&
  window.location.port === '6006';

export const isSupportedBrowser = () => {
  if (!isBrowser() || !UA) return {};
  let isSupported = false;
  let fromSocial = false;
  let needsUpgrade = false;

  if (!isBrowser() || !UA) {
    return { isSupported, fromSocial, needsUpgrade };
  }

  const supportedBrowser = ALLOWED_BROWSERS.find(
    browser => browser.os === os.name && name.match(browser.name)
  );

  if (supportedBrowser) {
    isSupported = true;
  }

  if (isSocialBrowser()) {
    fromSocial = true;
  }

  if (
    supportedBrowser &&
    !!supportedBrowser.version &&
    parseFloat(version) < supportedBrowser.version
  ) {
    needsUpgrade = true;
  }

  return { isSupported: isSupported && !needsUpgrade && !fromSocial };
};

export const hasWebGl = () => {
  try {
    return Boolean(isBrowser() && window.WebGLRenderingContext);
  } catch (e) {
    return null;
  }
};

export const isLandscape = () =>
  isBrowser() &&
  (isDesktop()
    ? window.innerWidth > window.innerHeight
    : Math.abs(parseInt(`${window.orientation}`)) === 90);

export const isInputFocused = () =>
  isBrowser() && document.activeElement
    ? document.activeElement.tagName.toLowerCase() === 'input' ||
      document.activeElement.tagName.toLowerCase() === 'textfield' ||
      document.activeElement.tagName.toLowerCase() === 'select'
    : false;

export const hasURLBar = () => {
  if (!isBrowser()) return false;

  const bodyHeight = Math.round(document.body.getBoundingClientRect().height);
  const htmlHeight = Math.round(
    document.querySelector('html').getBoundingClientRect().height
  );
  // Safari uses the device's width regardless of current orientation
  const screenHeight =
    isSafari() && isLandscape() ? window.screen.width : window.screen.height;

  return isSafari()
    ? bodyHeight !== screenHeight
    : window.innerHeight < htmlHeight;
};

export const isSquareDisplay = () => innerWidth / innerHeight < 1.6;

export const documentZoom = () =>
  isBrowser() ? document.body.clientWidth / window.innerWidth : 1;

export const isWebGLSupported = () => {
  let canvas = document.createElement('canvas');
  const gl =
    canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  canvas = null;
  return Boolean(gl && gl instanceof WebGLRenderingContext);
};
