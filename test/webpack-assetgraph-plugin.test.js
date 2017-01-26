var unexpected = require('unexpected').clone();

var webpack = require('webpack');
var plugin = require('../lib');
var config = require('../webpack.config.test');

function testWebpackWithConfig (config, expectedFiles) {
  console.log(config);
  var compiler = webpack(config);
  var outputFileSystem = new webpack.MemoryOutputFileSystem();

  compiler.outputFileSystem = outputFileSystem;

  return new Promise(function (resolve, reject) {
    compiler.run(function (err, result) {
      if (err) {
        return reject(err)
      }

      return resolve(result);
    });
  })
  .then(function (stats) {
    console.log(stats);
  });
}

describe('webpack-assetgraph-plugin', function () {
  it('should not fail', function () {
    return testWebpackWithConfig(config);
  });
});
