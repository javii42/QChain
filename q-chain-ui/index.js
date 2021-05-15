/* eslint-disable global-require, consistent-return */

require('dotenv').config();

const {
    NODE_ENV, PORT
} = process.env;

const winston = require('winston');
const WebpackDevServer = require('webpack-dev-server');
const compiler = require('webpack');

let config;

if (NODE_ENV === 'production') {
    config = require('./webpack.config.prod');
} else {
    config = require('./webpack.config');
}

const app = new WebpackDevServer(
    compiler(config), config.devServer
);

app.listen(PORT, () => {
    winston.info(`Server started at port ${PORT} in ${NODE_ENV} mode`);
});
