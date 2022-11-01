'use strict';

// Get base theme
const themeConfig = require('@tacc/core-styles/fractal.theme.js');

// Extend base theme
const newThemeConfig = Object.assign( themeConfig, {
  skin: Object.assign( themeConfig.skin, {
    links: '#877453',
  })
});

// Export new theme
module.exports = newThemeConfig;
