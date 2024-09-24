#!/usr/bin/env node

const buildStylesheets = require('@tacc/core-styles').buildStylesheets;

const ROOT = __dirname + '/..';
const BUILD_ID = process.env.BUILD_ID || process.env.npm_package_version;

const options = {
  verbose: true,
  fileExt: '.css',
  buildId: BUILD_ID,
  customConfigs: [`${ROOT}/.postcssrc.extra.yml`]
};

buildStylesheets(
  /* input */ `${ROOT}/css/_imports/trumps/s-article-list.postcss`,
  /* output */ `${ROOT}/css/_imports/trumps/`,
  /* options */ options
);
buildStylesheets(
  /* input */ `${ROOT}/css/_imports/trumps/s-home.postcss`,
  /* output */ `${ROOT}/css/_imports/trumps/`,
  /* options */ options
);
buildStylesheets(
  /* input */ `${ROOT}/css/_migrations/v1_v2/frontera.postcss`,
  /* output */ `${ROOT}/css/_migrations/v1_v2/`,
  /* options */ options
);
