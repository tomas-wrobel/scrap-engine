const path = require('path')

module.exports = {
  entry: './src/lib.js',
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: `engine.js`,
    path: path.resolve(__dirname, 'dist'),
    library: 'blockLike'
  },
  devServer: {
    static: path.join(__dirname, ''),
    compress: true,
    host: '0.0.0.0', // your ip address
    port: 9000
  }
}
