var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var config = require('./config.base');

// 引入常量
var CONST = require('./constants');

module.exports = webpackMerge(config, {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: [
      'react-hot-loader/patch',
      'webpack-dev-server/client?http://localhost:' + CONST.PORT,
      'webpack/hot/only-dev-server',
      CONST.ENTRY
    ]
  },
  output: {
    path: '/'
    // publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.less$/,
      use: ['style-loader', {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[local]_[hash:base64:5]'
        }
      }, 'less-loader']
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new OpenBrowserPlugin({
      url: 'http://localhost:' + CONST.PORT
    })
  ],
  devServer: {
    host: "0.0.0.0",
    historyApiFallback: true,
    disableHostCheck: true, // 参考：https://www.213.name/archives/1006
    port: CONST.PORT,
    hot: true,
    // inline: true,
    // compress: true, // 貌似没用，文件大小并不会减小
    // 参考：https://doc.webpack-china.org/configuration/stats/
    stats: {
      version: false,
      hash: false,
      chunks: false,
      colors: true
    },
    proxy: {
      '/': {
        //target: "http://10.1.53.31:7580", // r10
        // pathRewrite: { '^\/apm\/api': '' }
      }
    }
  }
});
