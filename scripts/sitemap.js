const SitemapGenerator = require('nextjs-sitemap-generator');

SitemapGenerator({
  baseUrl: 'https://mentalsaathi.in',
  pagesDirectory: __dirname + "/../app", // your app router folder
  targetDirectory : __dirname +  '/../public/',
  ignoredExtensions: ['png', 'jpg'],
  ignoredPaths: ['[id]', 'admin','admin/*','test/*','test'],
  nextConfigPath: __dirname + "/../next.config.mjs"

})