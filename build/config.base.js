var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var precss = require('precss');

// 引入常量
var CONST = require('./constants');

// eslint 和 postcss(css自动匹配兼容模式)
var eslintAndPostcss = {
  options: {
    eslint: {
      configFile: CONST.ESLINTRC
    },
    postcss: function postcss() {
      return [precss, autoprefixer({
        remove: false,
        browsers: ['ie >= 8', '> 1% in CN'],
      })];
    }
  }
}

module.exports = {
  entry: {
    polyfills: ['babel-polyfill', 'event-source-polyfill'],
    vendor: [
      'react',
      'react-dom',
      'jquery',
      'lodash'
    ],
    main: CONST.ENTRY
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: 'jquery',
        _: 'lodash'
    }),
    new HtmlWebpackPlugin({
      title: 'JUST DEMO',
      filename: 'index.html',
      template: path.resolve(CONST.SRC, './assets/templates/index.html'),
      minify: {
        // removeComments: true,
        // collapseWhitespace: true
      },
      hash: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // webpack 是从右到左读取
      name: ['vendor', 'polyfills']
    }),
    new webpack.LoaderOptionsPlugin(eslintAndPostcss),
  ],
  output: {
    filename: 'index/js/[name].bundle.js',
    // filename: '[name].bundle.[chunkhash:5].js',
    path: CONST.DIST
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: [CONST.MODULES, path.resolve(CONST.SRC, './assets')],
      use: ['babel-loader', 'eslint-loader']
    }, {
      test: /\.(png|svg|jpg|gif)$/,
      // use: ['file-loader']
      exclude: [CONST.MODULES],
      use: {
        loader: 'url-loader',
        options: {
          limit: '10240',
          name: 'index/img/[name].[ext]'
        }
      }
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: '8192',
          name: 'index/font/[name].[ext]'
        }
      }
    }, {
      test: /\.(csv|tsv)$/,
      use: ['csv-loader']
    }, {
      test: /\.xml$/,
      use: ['xml-loader']
    }]
  }
};