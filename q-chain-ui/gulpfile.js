const {parallel, series} = require('gulp');

const {loadEnvConfig} = require('./gulp/config');
const {clean, dist, lint} = require('./gulp/dist');

exports.lint = lint;

exports.build = series(
    parallel(clean, loadEnvConfig),
    dist
);
