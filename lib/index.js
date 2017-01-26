var pathModule = require('path');

var AssetGraph = require('assetgraph');
var urlTools = require('urltools');
// var query = AssetGraph.query;

var followRelations = {
  crossorigin: false
};

function WebpackAssetgraphPlugin (options) {
  console.log('options', options);
}

WebpackAssetgraphPlugin.prototype.apply = function WebpackAssetgraphPluginApply(compiler) {
  compiler.plugin('emit', function (compilation, cb) {
    var config = compilation.options;
    var basePath = config.output.path;

    var assetGraph = new AssetGraph({
      root: compilation.options.context,
      followRelations: followRelations
    });

    if (config.output.publicPath) {
      basePath = pathModule.resolve(config.context, config.output.publicPath.replace(/^\//, ''));
    }

    var assetsToLoad = Object.keys(compilation.assets).map(function (name) {
      return {
        url: urlTools.fsFilePathToFileUrl(pathModule.resolve(basePath, name)),
        text: compilation.assets[name].source()
      };
    });

    return assetGraph
      .loadAssets(assetsToLoad)
      .queue(function (assetGraph) {
        var asset = assetGraph.findAssets()[0];

        compilation.assets['fakeFile.js'] = {
          source: function () {
            return asset.text;
          },
          size: function () {
            return asset.text.length;
          }
        };
      })
      .run(cb);
  });

  // compiler.plugin('done', function(stats) {
  //   console.log('stats', stats);
  // });
};

module.exports = WebpackAssetgraphPlugin;
