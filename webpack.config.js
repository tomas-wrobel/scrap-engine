const path = require('path')

module.exports = {
  entry: './src/engine.js',
  mode: 'development',
  output: {
    filename: "engine.js",
    path: path.resolve(__dirname, 'dist'),
    library: 'Scrap'
  }
}
