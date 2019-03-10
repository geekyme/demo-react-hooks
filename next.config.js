const path = require("path");

module.exports = {
  webpack: function(config, { dev }) {
    config.resolve.alias.components = path.join(__dirname, "components");

    return config;
  }
};
