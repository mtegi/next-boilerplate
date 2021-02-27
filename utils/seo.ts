import { NextRouter } from 'next/router';
import config from 'site-config.json';

const createDefaultSeo = (router: NextRouter) => {
  return {
    titleTemplate: config.titleTemplate,
    openGraph: {
      type: 'website',
      locale: router.defaultLocale,
      url: config.url,
      site_name: config.name,
    },
  };
};

export default createDefaultSeo;
