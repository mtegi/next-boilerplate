const withOptimizedImages = require('next-optimized-images');
const withManifest = require('next-manifest');
const manifest = require('./manifest');
const generateSitemap = require('./scripts/generate-sitemap');
const generateRobots = require('./scripts/generate-robots-txt');
const withTranslation = require('next-translate');
const config = require('./site-config.json');

module.exports = withTranslation(
  withOptimizedImages(
    withManifest({
      manifest,
      i18n: config.i18n,
      webpack: (config, { isServer }) => {
        if (isServer) {
          generateSitemap();
          generateRobots();
        }
        return config;
      },
    })
  )
);
