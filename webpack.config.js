var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bin/bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  resolveLoader: {
    modules: ['node_modules', './loaders']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.[efgh]$/, use: 'bin-loader' }
    ]
  },
  plugins: [new HtmlWebpackPlugin()]
}