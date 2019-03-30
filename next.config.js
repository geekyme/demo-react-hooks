const withCSS = require("@zeit/next-css");

config = withCSS();

config.publicRuntimeConfig = {
  highload: process.env.HIGHLOAD
};

module.exports = config;
