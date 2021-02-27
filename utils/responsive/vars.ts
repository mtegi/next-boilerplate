/*
  Font sizes as per PSD (px => rem)
  16 => 0.66
  18 => 0.75
  20 => 0.8
  22 => 0.9
  24 => 1 (Base size)
  26 => 1.08
  28 => 1.16
  32 => 1.3
  34 => 1.4
  36 => 1.5
  44 => 1.83
  50 => 2.08
  54 => 2.25
  60 => 2.5
  72 => 3
  154 => 6.4
  246 => 10.25
*/

export const defaultFontSize = 24; // px

export const breakpointTablet = 768; // px
export const breakpointDesktop = 1025; // px
export const breakpointDesktopLarge = 1280; // px
export const breakpointDesktopWide = 2560; // px

export const desktopMinHeight = 640; // px
export const breakpointMobileSmallHeight = 600; // px

export const mobileBaseWidth = 750; // px
export const desktopBaseWidth = 1920; // px

export const mobileMinFontSize = 11; // px
export const desktopMinFontSize = 12; // px

export const mobileScalableFontSize = (100 * defaultFontSize) / mobileBaseWidth; // vw
export const mobileSmallHeightScalableFontSize = 2.8; // vw
export const tabletScalableFontSize = 1.7; // vw
export const desktopScalableFontSize =
  (100 * defaultFontSize) / desktopBaseWidth; // vw
export const desktopWideScalableFontSize = 1; // vw

export const desktopWideAspectRatio = '20 / 11';
