var AssetGraph = require('assetgraph');

function WebpackAssetgraphPlugin (options) {
  console.log('options', options);
}

WebpackAssetgraphPlugin.prototype.apply = function WebpackAssetgraphPluginApply(compiler) {
  compiler.plugin('after-emit', function (compilation, cb) {
    cb();
  });

  // compiler.plugin('done', function(stats) {
  //   console.log('stats', stats);
  // });
};

module.exports = WebpackAssetgraphPlugin;
