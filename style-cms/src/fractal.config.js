'use strict';

const mandelbrot = require('@frctl/mandelbrot');
const minimist = require('minimist');

// Get base config
const fractal = require('./fractal.config.base.js');
const themeConfig = require('./fractal.theme.js');

// Get project name
const args = minimist( process.argv.slice( 2 ));
let cmsName = 'core-cms';
let projName = args['project'] || '';
    projName = ( projName !== cmsName ) ? projName : '';

// Set paths
// NOTE: These paths are to files in the container, not on the host
// const paths = {
//   source: {
//     patterns: {
//       root: __dirname + '/libs/patterns',
//     },
//     styles: {
//       root:__dirname + '/libs/styles',
//       cms: 'core-cms/site.css',
//       proj: ( projName )
//         ? `core-cms-resources/${projName}/static/${projName}/css/build/site.css`
//         : null,
//     },
//   },
//   target: {
//     app:{
//       root: __dirname + '/taccsite_custom/style-cms/static/style-cms/app',
//     },
//   },
// }
// Set paths
// NOTE: These paths are on container, NOT host
const paths = {
  source: {
    patterns: {
      root: '/code/taccsite_ui/libs/patterns',
    },
    styles: {
      root:'/code/taccsite_ui/libs/styles',
      cms: 'cms/site.css',
      proj: ( projName )
        ? `projects/${projName}/static/${projName}/css/build/site.css`
        : null,
    },
  },
  target: {
    app:{
      root: '/code/taccsite_custom/style-cms/static/style-cms/app',
    },
  },
}

// Set source paths
// (for components)
fractal.components.set('exclude', '*.md');
fractal.components.set('path', paths.source.patterns );
// (for stylesheets)
fractal.components.set('default.context', {
  styles: {
    shouldSkipBase: true, // true, because site.css includes components
    internal: {
      global: [ paths.source.styles.cms ].concat(
        // If project is just core cms, then there are no more styles to inject
        ( projName ) ? [ paths.source.styles.proj ] : []
      )
    },
    external: {
      global: [
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
      ]
    }
  }
});
fractal.cli.log(`+ Included CSS for "${cmsName}": '${cmsCSSFile}'`);
if ( projName ) {
  fractal.cli.log(`+ Included CSS for "${projName}": '${projCSSFile}'`);
}

// Set website paths
fractal.web.set('static.path', paths.source.styles.root );
fractal.web.set('builder.dest', paths.target.app.root );

// Customize theme
const theme = mandelbrot( themeConfig );
fractal.web.theme( theme );

// Export
module.exports = fractal;
