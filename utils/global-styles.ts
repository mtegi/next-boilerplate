import { createGlobalStyle, css } from 'styled-components';

const style = css`
  html,
  body {
    height: 100%;
    margin: 0;
    overflow: hidden;
    width: 100%;
    padding: env(safe-area-inset-top) env(safe-area-inset-right)
      env(safe-area-inset-bottom) env(safe-area-inset-left);
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  html {
    position: absolute;
  }

  body {
    overflow-x: hidden;
    font-family: 'HelveticaNeue', Helvetica, Arial, sans-serif;
    font-weight: normal;
  }

  #__next {
    height: 100%;
    width: 100%;
    z-index: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

export default createGlobalStyle`
  ${style}
`;
