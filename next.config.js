const withCSS = require("@zeit/next-css");

config = withCSS();

if (process.env.DEPLOY) {
  config.target = "serverless";
}

module.exports = config;
