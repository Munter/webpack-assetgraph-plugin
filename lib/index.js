var pathModule = require('path');

var AssetGraph = require('assetgraph');
var urlTools = require('urltools');
var query = AssetGraph.query;

var followRelations = {
  crossorigin: false,
  from: {
    type: query.not('JavaScript')
  }
};

function WebpackAssetgraphPlugin (options) {
  options = options || {};
  this.verbose = options.verbose || false;
}

WebpackAssetgraphPlugin.prototype.apply = function WebpackAssetgraphPluginApply(compiler) {
  var verbose = this.verbose;

  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (_, cb) {
      var basePath = compiler.context;

      var assetsToLoad = Object.keys(compilation.assets).map(function (name) {
        return {
          url: urlTools.fsFilePathToFileUrl(pathModule.resolve(basePath, name)),
          text: compilation.assets[name].source()
        };
      });

      if (compilation.errors.length) {
        throw compilation.errors[0];
      }

      var initialAssetUrls = assetsToLoad.map(function (assetConfig) {
        return assetConfig.url;
      });

      var assetgraph = new AssetGraph({
        root: pathModule.resolve(basePath),
        followRelations: followRelations
      });

      var transformQueue = verbose ? assetgraph.logEvents() : assetgraph;

      return transformQueue
        .loadAssets(assetsToLoad)
        .populate({ followRelations: followRelations })
        .queue(function (assetGraph) {
          var assets = assetGraph.findAssets({
            url: query.not(initialAssetUrls)
          });

          assets.forEach(function (asset) {
            compilation.assets[asset.fileName] = {
              source: function () { return asset.rawSrc; },
              size: function () { return asset.rawSrc.length; }
            };
          });
        })
        .run(cb);
    });

  });
};

module.exports = WebpackAssetgraphPlugin;
