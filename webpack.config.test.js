'use strict';

var AssetgraphPlugin = require('./lib/index');

module.exports = {
  entry: './testdata/empty/entry.js',
  output: {
    path: '.testgarbage',
    filename: 'output.js'
  },
  plugins: [
    new AssetgraphPlugin()
  ]
};
