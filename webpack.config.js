const webpack = require('webpack');
const path = require('path');

const AddModuleExportsPlugin = require('add-module-exports-webpack-plugin');

module.exports = {
    entry: './src/pwentk.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'pwentk.min.js',
        library: 'pwentk',
        libraryTarget: 'commonjs2',
        globalObject: 'this'
    },
    plugins: [
        new AddModuleExportsPlugin()
    ]
};