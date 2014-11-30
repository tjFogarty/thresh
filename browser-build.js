/**
 * For release we build the JS with browserify and attach the output to the
 * window.
 *
 * `npm run build`
 */
if (typeof require !== 'function') {
throw new Error('It appears you\'ve added the wrong Thresh script to your ' +
                'page, try using a release from the build/ folder. :)');
}
window.Thresh = require('./');
