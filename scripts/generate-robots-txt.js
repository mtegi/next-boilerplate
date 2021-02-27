const fs = require('fs');
const config = require('../site-config.json');

const generateRobotsTxt = async () => {
  const robots = `User-agent: *
Disallow:

Sitemap: ${config.url}/sitemap.xml`;

  fs.writeFileSync('public/robots.txt', robots);
};

module.exports = generateRobotsTxt;
