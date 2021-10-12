const path = require('path')
const fs = require('fs')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

const htmlPlugin = new HtmlWebPackPlugin({
  template: path.join(__dirname, './public/index.html'),//源文件
  filename: 'index.html' //生成内存中首页面的名称
});

// 根据环境来读取配置文件（本地环境和对应的环境）
const dotenvFile = `.env.${process.env.NODE_ENV}`

if (fs.existsSync(dotenvFile)) {
  require('dotenv').config({
    path: dotenvFile
  })
}

module.exports = {
  plugins: [
    htmlPlugin,
    new webpack.DefinePlugin({
      // 如果需要web环境也能访问，必须用这个插件注入
      'process.env': JSON.stringify(process.env)
    })
  ],
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(sass|less|css)$/,
      loaders: ['style-loader', 'css-loader', 'less-loader']
    }, {
      test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
      loader: 'url-loader?limit=100000'
    }]
  }
};