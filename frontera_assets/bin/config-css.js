#!/usr/bin/env node

const fs = require('fs');
const yaml = require('js-yaml');

configJson = {
  plugins: {
    'postcss-banner': {
      banner: process.env.npm_package_version
    }
  }
};

fs.writeFileSync(__dirname + '/../.postcssrc.extra.yml', yaml.dump(configJson), 'utf8');
