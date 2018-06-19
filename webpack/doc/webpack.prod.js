const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new uglifyjsWebpackPlugin()
  ]
})
