var AssetGraph = require('assetgraph');

function WebpackAssetgraphPlugin (options) {
  console.log('options', options);
}

WebpackAssetgraphPlugin.prototype.apply = function WebpackAssetgraphPluginApply(compiler) {
  compiler.plugin('done', function() {
    console.log('Hello World!');
  });
};

module.exports = WebpackAssetgraphPlugin;
