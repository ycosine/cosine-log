const { CONFIG } = require("./site.config")

module.exports = {
  siteUrl: CONFIG.link,
  outDir: "out",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  generateIndexSitemap: false,
}
