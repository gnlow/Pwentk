const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/browser.pwentk.js',
    output: {
        path: path.resolve(__dirname, 'browser'),
        publicPath: '/browser/',
        filename: 'pwentk.min.js'
    },
    module: {
        rules: [
        {
            test: /\.js$/,
            include: path.join(__dirname),
            exclude: /(node_modules)|(dist)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        }
        ]
    }
};