webpack-assetgraph-plugin
=========================

[![NPM version](https://badge.fury.io/js/webpack-assetgraph-plugin.svg)](http://badge.fury.io/js/webpack-assetgraph-plugin)
[![Build Status](https://travis-ci.org/Munter/webpack-assetgraph-plugin.svg?branch=master)](https://travis-ci.org/Munter/webpack-assetgraph-plugin)
[![Coverage Status](https://img.shields.io/coveralls/Munter/webpack-assetgraph-plugin.svg)](https://coveralls.io/r/Munter/webpack-assetgraph-plugin?branch=master)
[![Dependency Status](https://david-dm.org/Munter/webpack-assetgraph-plugin.svg)](https://david-dm.org/Munter/webpack-assetgraph-plugin)

This webpack plugin leverages the very powerful Assetgraph dependency graph model discover assets that webpack doesn't know about.
It then adds these assets into webpacks compilation.

This means you can reduce your configuration by avoiding manual maintenance of a manifest of files that need to be copied to the output destination after a build.

Currently webpack-assetgraph-plugin hooks into [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)'s `html-webpack-plugin-after-emit`-hook. This makes html-webpack-plugin a hard dependency for now, which might change in the future.


Usage
------------

In your Webpack configuration add webpack-assetgraph-plugin like so:

```js
var WebpackAssetgraphPlugin = require('webpack-assetgraph-plugin');

module.exports = {
  context: 'path/to/source/root',
  plugins: [
    new WebpackAssetgraphPlugin({
      verbose: true
    })
  ]
}
```

**Configuring `context` is important!** Assetgraph needs an understanding of what your web root is in order to resolve root-relative urls.

If you don't define `context` it will default to `process.cwd()`, which is usually not correct.


Licence
-------
[MIT](https://tldrlegal.com/license/mit-license)
