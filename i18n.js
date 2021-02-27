const config = require('./site-config.json');

module.exports = {
  locales: config.i18n.locales,
  defaultLocale: config.i18n.defaultLocale,
  pages: {
    '*': ['common'],
    '/': ['home'],
  },
};
