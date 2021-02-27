import { getViewportInfo } from 'utils/dom';
import { isBrowser, isMobile } from 'utils/platform';
import * as VARS from './vars';

export const mqMobile = `(max-width: ${VARS.breakpointTablet - 1}px)`;
export const mediaMobile = (content: string) =>
  `@media ${mqMobile} {
    ${content}
  }`;

export const mqMobileSmallHeight = `(max-height: ${VARS.breakpointMobileSmallHeight}px)`;
export const mediaMobileSmallHeight = (content: string) =>
  `@media ${mqMobileSmallHeight} {
    ${content}
  }`;

export const mqTablet = `(min-width: ${VARS.breakpointTablet}px)`;
export const mediaTablet = (content: string) =>
  `@media ${mqTablet} {
    ${content}
  }`;

export const mqDesktop = `(min-width: ${VARS.breakpointDesktop}px) and (min-height: ${VARS.desktopMinHeight}px)`;
export const mediaDesktop = (content: string) =>
  `@media ${mqDesktop} {
    ${content}
  }`;

const mqDesktopLarge = `(min-width: ${VARS.breakpointDesktopLarge}px)`;
export const mediaDesktopLarge = (content: string) =>
  `@media ${mqDesktopLarge} {
    ${content}
  }`;

export const mqDesktopWide = `(min-width: ${VARS.breakpointDesktopWide}px) and (min-aspect-ratio: ${VARS.desktopWideAspectRatio})`;
export const mediaDesktopWide = (content: string) =>
  `@media ${mqDesktopWide} {
    ${content}
  }`;

export const mqLandscape = '(orientation: landscape)';
export const mediaLandscape = (content: string) =>
  `@media ${mqLandscape} {
    ${content}
  }`;

export const mqPortrait = '(orientation: portrait)';
export const mediaPortrait = (content: string) =>
  `@media ${mqPortrait} {
    ${content}
  }`;

export const mqTabletAndPortrait = `(min-width: ${VARS.breakpointTablet}px) and ${mqPortrait}`;
export const mediaTabletAndPortrait = (content: string) =>
  `@media ${mqTabletAndPortrait} {
    ${content}
  }`;

const matchMobile = {
  match: isBrowser() && window.matchMedia(mqMobile),
  scalableFontSize: VARS.mobileScalableFontSize,
  minFontSize: VARS.mobileMinFontSize,
  useVh: false,
};

const matchMobileSmallHeight = {
  match: isBrowser() && window.matchMedia(mqMobileSmallHeight),
  scalableFontSize: VARS.mobileSmallHeightScalableFontSize,
  minFontSize: VARS.mobileMinFontSize,
  useVh: false,
};

const matchTablet = {
  match: isBrowser() && window.matchMedia(mqTablet),
  scalableFontSize: VARS.tabletScalableFontSize,
  minFontSize: VARS.desktopMinFontSize,
  useVh: false,
};

const matchDesktop = {
  match: isBrowser() && window.matchMedia(mqDesktop),
  scalableFontSize: VARS.desktopScalableFontSize,
  minFontSize: VARS.desktopMinFontSize,
  useVh: false,
};

export const matchDesktopWide = {
  match: isBrowser() && window.matchMedia(mqDesktopWide),
  scalableFontSize: VARS.desktopWideScalableFontSize,
  minFontSize: VARS.desktopMinFontSize,
  useVh: true,
};

export const isMobileLayout = () =>
  isBrowser() &&
  (isMobile() || getViewportInfo().width < VARS.breakpointTablet);

export const getLineHeight = (fontSize: number, lineHeight: number) =>
  lineHeight / fontSize;

export const getLetterSpacing = (
  fontSize: number,
  letterSpacing: number | string
) => {
  if (typeof letterSpacing === 'string' && letterSpacing.match('em')) {
    return letterSpacing;
  }

  return `${parseFloat(`${letterSpacing}`) / fontSize}em`;
};

export const setFontSize = (
  fontSize: number,
  lineHeight?: number,
  letterSpacing?: number
) => {
  let result = '';

  if (lineHeight !== undefined) {
    result += `line-height: ${getLineHeight(fontSize, lineHeight)};`;
  }

  if (letterSpacing !== undefined) {
    result += `letter-spacing: ${getLetterSpacing(fontSize, letterSpacing)};`;
  }

  // Check from more specific to less specific media query
  const matchingMedia = isBrowser()
    ? [
        matchMobileSmallHeight,
        matchMobile,
        matchTablet,
        matchDesktopWide,
        matchDesktop,
      ].find(media => media.match.matches)
    : matchMobile; // Use mobile by default for SSR

  const fontSizeInPx =
    (fontSize *
      (matchingMedia.useVh
        ? isBrowser() && window.innerHeight
        : isBrowser() && window.innerWidth) *
      matchingMedia.scalableFontSize) /
    100;

  if (fontSizeInPx < matchingMedia.minFontSize) {
    result += `font-size: ${matchingMedia.minFontSize}px;`;
  } else {
    result += `font-size: ${fontSize}rem;`;
  }

  return result;
};

export const setScalableFontSize = () => {
  let result = '';

  result += `font-size: ${VARS.mobileScalableFontSize}vw;`;

  result += mediaMobileSmallHeight(
    `font-size: ${VARS.mobileSmallHeightScalableFontSize}vw;`
  );

  result += mediaTablet(`
    font-size: ${VARS.tabletScalableFontSize}vw;
  `);

  result += mediaDesktop(`
    font-size: ${VARS.desktopScalableFontSize}vw;
  `);

  result += mediaDesktopWide(`
    font-size: ${VARS.desktopWideScalableFontSize}vw;
  `);

  return result;
};
