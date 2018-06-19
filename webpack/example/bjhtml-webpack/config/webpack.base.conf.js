const path = require('path')
const webpack = require('webpack')
const extractTextPlugin = require('extract-text-webpack-plugin')

const ASSET_PATH = process.env.ASSET_PATH || '/'
function resolve (dir) {
  return path.join(__diename, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  entry: {
    index: '', // 首页入口 
    list: '', // 商品列表入口 
    details: '', // 商品详情入口 
    stock: '' // 库存管理
  },
  output: {
    name: '[name].[hash:7].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules'
      },
      {
        test: /\.css$/,
        use: extractTextPlugin({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
        // expose-loader兼容jQuery
        test: require.resolve('jquery'), // 此loader配置的目标是NPM中的jquery
        loader: 'expose?$!expose?jQuery' // 先把jquery对象声明为全局变量‘jquery’，再通过管道进一步又声明为全局变量‘$’
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.ASSET_PATH': JSON.stringify(ASSET_PATH)
    }),
    new extractTextPlugin('css/[name].[hash:7].css'),
    // 兼容jQuery
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    })
  ]
}