const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: './src/pwentk.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'pwentk.js'
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