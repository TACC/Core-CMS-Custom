#!/usr/bin/env node

/** Build CSS using the Core-Styles API */

const buildStylesheets = require('@tacc/core-styles').buildStylesheets;

const ROOT = __dirname + '/..';
const BUILD_ID = process.env.BUILD_ID;
const VERBOSE = process.env.VERBOSE;

/** Build stylesheets */
(() => {
  const stylePath = `${ROOT}/css`;
  const options = {
    verbose: VERBOSE,
    buildId: BUILD_ID,
    fileExt: '.min.css',
    // If custom configuration is desired, then create and pass this file
    // customConfigs: [`${stylePath}/.postcssrc.extra.yml`],
  }

  // Build unnested stylesheets
  buildStylesheets(
    `${stylePath}/*.postcss`,
    `${stylePath}`,
    options
  );
})();
