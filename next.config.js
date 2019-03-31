const withCSS = require("@zeit/next-css");

config = withCSS();

if (process.env.DEPLOY) {
  config.target = "serverless";
} else {
  config.publicRuntimeConfig = {
    highload: process.env.HIGHLOAD
  };
}

module.exports = config;
