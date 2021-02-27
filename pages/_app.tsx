import { DefaultSeo } from 'next-seo';
import React from 'react';
import Providers from 'components/Providers';
import NextApp from 'next/app';
import { ThemeProvider } from 'styled-components';
import createDefaultSeo from 'utils/seo';
import theme from 'utils/theme';
import GlobalStyles from 'utils/global-styles';

class App extends NextApp {
  render(): JSX.Element {
    const { Component, pageProps, router } = this.props;
    const seo = createDefaultSeo(router);
    const providers = [{ ProviderComponent: ThemeProvider, props: { theme } }];
    return (
      <Providers providers={providers}>
        <GlobalStyles />
        <DefaultSeo {...seo} />
        <Component key={router.route} router={router} {...pageProps} />
      </Providers>
    );
  }
}

export default App;
