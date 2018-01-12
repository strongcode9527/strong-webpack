var path = require('path')

module.exports = {
  entry: path.resolve(__dirname, '../example/index.js'),
  output: path.resolve(__dirname, '../output/bundle.js')
}