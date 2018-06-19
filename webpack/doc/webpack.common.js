const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
// 在构建项目时设置路径值
// 1、如果预先定义过环境变量，就将其赋值给`ASSET_PATH`变量，否则赋值为根目录
const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  devServer: {
    contentBase: './dist'
  },
  entry: './src/app.js',
  plugins: [
    new cleanWebpackPlugin('dist'),
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
    }),
    // new extractTextPlugin({
    //   filename: (getPath)=>{
    //     return getPath('css/[name].[chunkhash].css').replace('css/js','css')
    //   }
    // })
    new extractTextPlugin('css/[name].[chunkhash].css'),
    //2、该插件帮助我们安心地使用环境变量
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    })
  ],
  output: {
    filename: 'js/[name].[chunkhash].js',
    path: path.resolve(__dirname,'dist'),
    publicPath: ASSET_PATH //3、为文件生成绝对路径，如提取出css后，css内图片路径错误问题得以解决
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: path.resolve(__dirname,'node_modules'),
        include: path.resolve(__dirname,'src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader','sass-loader']
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'images/'
        }
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  }
}
