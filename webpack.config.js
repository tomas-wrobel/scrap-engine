const path = require('path')

module.exports = {
  entry: './src/lib.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/, // both .js and .jsx
        loader: 'eslint-loader',
        include: path.resolve(process.cwd(), 'src'),
        enforce: 'pre',
        options: {
          fix: true
        }
      }
    ]
  },
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
