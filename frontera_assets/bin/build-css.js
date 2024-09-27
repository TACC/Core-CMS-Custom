#!/usr/bin/env node

const buildStylesheets = require('@tacc/core-styles').buildStylesheets;

const ROOT = __dirname + '/..';
const BUILD_ID = process.env.BUILD_ID || process.env.npm_package_version;

const options = {
  verbose: true,
  fileExt: '.css',
  buildId: BUILD_ID,
  // If custom configuration is desired, then create and pass this file
  // customConfigs: [`${ROOT}/.postcssrc.extra.yml`],
};

// FAQ: To build more:
//      1. Clone this function call.
//      2. Change the file name and path.
buildStylesheets(
  `${ROOT}/css/_imports/trumps/s-home.postcss`,
  `${ROOT}/css/_imports/trumps/`,
  options
);
