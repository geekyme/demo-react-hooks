const withCSS = require("@zeit/next-css");
const withSASS = require("@zeit/next-sass");
const withFonts = require("next-fonts");
const withPlugins = require("next-compose-plugins");

const plugins = [
  [withCSS],
  [
    withSASS,
    {
      cssModules: true,
      cssLoaderOptions: { localIdentName: "[local]___[hash:base64:5]" }
    }
  ],
  [withFonts]
];

config = withPlugins([...plugins]);

if (process.env.DEPLOY) {
  config.target = "serverless";
}

module.exports = config;
