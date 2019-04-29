'user strict';

const path = require('path');
const fs = require('fs');

const publicPath = '/';
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HOST = '127.0.0.1';
const PORT = 9000;

module.exports = {
    entry:{
        index: ['./src/index.js']
    },
    output:{
        path: resolveApp('dist'),
        filename: 'assets/js/[name].[hash:4].js',
        chunkFilename: 'assets/js/[name].[hash:4].chunk.js',
		publicPath: publicPath,
    },
    devServer:{
        clientLogLevel: 'warning',
        hot: true,
        contentBase: 'dist',
        compress: true,
        host: HOST,
        port: PORT,
        open: true,
        historyApiFallback: true,
        overlay: {warning: false, errors: true},
        publicPath: publicPath,
        quiet: true,
        watchOptions:{
            poll: false,
            ignored: /node_modules/
        },
        
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader", "postcss-loader",
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            '@lodash': path.resolve(__dirname, 'src/@lodash'), 
            '@fuse':    path.resolve(__dirname, 'src/@fuse'),
            '@fake-db': path.resolve(__dirname, 'src/fake-db'),
            'app': path.resolve(__dirname, 'src/app'),
        }
    },
    plugins: [
        new Dotenv(),
        new CopyWebpackPlugin([
            {from:'src/assets/images', to: 'assets/images'},
            {from: 'src/assets/fonts', to: 'assets/fonts'}
        ]),
        new MiniCssExtractPlugin({
            filename: "src/styles/tailwind.css",
            chunkFilename: "src/styles/tailwind.css"
        }),
        new HtmlWebPackPlugin({
            template: "./public/index.html",
            filename: "./index.html",
            favicon: './public/favicon.ico'
        }),
    ]
};