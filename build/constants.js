var path = require('path');

// 常用路径
var ROOT = path.resolve(__dirname);
var SRC = path.resolve(ROOT, '../src/');
var DIST = path.resolve(ROOT, '../dist/');
var MODULES = path.resolve(ROOT, '../node_modules/');
var ESLINTRC = path.resolve(__dirname, '../.eslintrc')

// 入口 
var ENTRY = path.resolve(SRC, './entry');

// 端口
var PORT = 8081;

module.exports = {
    ROOT,
    SRC,
    DIST,
    MODULES,
    PORT,
    ENTRY
};