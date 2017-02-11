var expect = require('unexpected').clone();

var webpack = require('webpack');
var AssetgraphPlugin = require('../lib');
var config = require('../webpack.config.test');

var HtmlWebpackPlugin = require('html-webpack-plugin');

function testWebpackWithConfig (config, expectedFiles) {
  var compiler = webpack(config);
  // var outputFileSystem = new webpack.MemoryOutputFileSystem();

  // compiler.outputFileSystem = outputFileSystem;

  return new Promise(function (resolve, reject) {
    compiler.run(function (err, result) {
      if (err) {
        return reject(err)
      }

      return resolve(result);
    });
  })
  .then(function (stats) {
    var compilationAssets = stats.toJson({assets: true}).assets;

    var compilationFiles = compilationAssets.map(function (compilationAsset) {
      return compilationAsset.name;
    });

    return expect(compilationFiles, 'to exhaustively satisfy', expectedFiles);
  });
}

describe('webpack-assetgraph-plugin', function () {
  it('should load a basic test case with only one file', function () {
    return testWebpackWithConfig(config, [
      'output.js'
    ]);
  });

  describe('html-webpack-plugin', function () {
    it.only('should load secondary pages, images and stylesheets', function () {
      var config = {
        bail: true,
        context: './testdata/html-webpack-plugin/',
        entry: './entry.js',
        output: {
          path: '.testgarbage',
          filename: 'output.js'
        },
        plugins: [
          new AssetgraphPlugin(),
          new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
          })
        ]
      };

      return testWebpackWithConfig(config, [
        'output.js',
        'index.html',
        'style.css',
        'image.png',
        'about.html'
      ]);
    });
  });
});
