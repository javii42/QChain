/* eslint-disable global-require */
const path = require('path');
const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const {
    ENDPOINT, NODE_ENV, PORT, GOOGLE_MAPS_API_KEY
} = process.env;

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    entry: {
        app: [
            'webpack/hot/only-dev-server',
            './src/app'
        ],
        client: `webpack-dev-server/client?http://localhost:${PORT}/`
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
        extensions: ['.js', '.jsx', '.scss', 'json'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
            './locale': 'moment/locale',
            '@data': path.resolve(__dirname, 'src/data'),
            '@reducers': path.resolve(__dirname, 'src/core/reducers'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@constants': path.resolve(__dirname, 'src/constants'),
            '@services': path.resolve(__dirname, 'src/services'),
            '@selectors': path.resolve(__dirname, 'src/core/selectors'),
            '@sagas': path.resolve(__dirname, 'src/core/sagas'),
            '@actions': path.resolve(__dirname, 'src/core/actions'),
            '@core': path.resolve(__dirname, 'src/core'),
            '@model': path.resolve(__dirname, 'src/model'),
            '@util': path.resolve(__dirname, 'src/util'),
            '@root': __dirname,
            '@pages': path.resolve(__dirname, 'src/pages')
        }
    },
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].bundle.js',
        crossOriginLoading: 'anonymous'
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                envName: 'development',
                plugins: ['react-hot-loader/babel'],
                cacheDirectory: '.babel-cache',
                presets: ['@babel/preset-react']
            }
        }, {
            test: /\.s?css$/,
            use: ['css-hot-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
        }, {
            test: /\.css$/,
            use: ['css-hot-loader', 'style-loader', 'css-loader']
        }, {
            exclude: [
                /\.html$/,
                /\.(js|jsx)$/,
                /\.json$/,
                /\.s?css$/,
                /\.(jpg|png)/
            ],
            loader: 'url-loader',
            options: {name: '[name].[ext]', limit: 10000}
        }, {
            test: /\.(jpg|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader',
            options: {name: '[name].[ext]'}
        }]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
            VERSION: JSON.stringify(require('./package.json').version),
            ENDPOINT: JSON.stringify(ENDPOINT),
            PROJECT_NAME: JSON.stringify(require('./package.json').name),
            GOOGLE_MAPS_API_KEY: JSON.stringify(GOOGLE_MAPS_API_KEY)
        }),
        new HtmlWebpackPlugin({
            title: require('./package.json').description,
            template: path.resolve('public', 'index.html'),
            favicon: 'public/images/favicon.png',
            inject: 'root',
            hash: true
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.HotModuleReplacementPlugin(),
        new CaseSensitivePathsPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new MiniCssExtractPlugin({filename: '[name].css'})
    ],
    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true,
        hot: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        },
        host: 'localhost',
        inline: true,
        port: PORT,
        progress: true,
        disableHostCheck: true
    }
};
