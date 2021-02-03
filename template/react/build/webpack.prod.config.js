'use strict';
const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

function assetsPath(_path) {
  return path.posix.join('static', _path);
}

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  devtool: false,
});

module.exports = webpackConfig;
