#!/usr/bin/env node

const buildStylesheets = require('@tacc/core-styles').buildStylesheets;

const ROOT = __dirname + '/..';
const BUILD_ID = process.env.BUILD_ID || process.env.npm_package_version;

buildStylesheets(
  /* input */ `${ROOT}/css/src/**/*.css`,
  /* output */ `${ROOT}/css/build`,
  /* options */ {
    verbose: true,
    buildId: BUILD_ID,
    customConfigs: [`${ROOT}/.postcssrc.yml`]
  }
);
