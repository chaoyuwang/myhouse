const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyPlugin = require('uglifyjs-webpack-plugin')

module.exports = merge(baseConfig, {
  devTool: '#source-map',
  plugins: [
    new CleanWebpackPlugin('./dist'),
    new UglifyPlugin({
      uglifyOptions: {
        compress: {
          warning: false          
        },
        sourceMap: true,
        parallel: true
      }
    })
  ]
})