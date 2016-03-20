var path    = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry:  [
    'webpack-dev-server/client?http://127.0.0.1:' + (process.env.npm_package_config_devport || 3000) + '/',
    'webpack/hot/only-dev-server',
    './src/app'
  ],
  output: {
    path:     __dirname,
    filename: 'dist/bundle.js'
  },
  resolve: {
    modulesDirectories: ['node_modules', 'shared'],
    extensions:         ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'autoprefixer', 'sass?sourceMap']
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg|png|jpg|mp4)$/,
        loader: "file-loader"
      },
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel']
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    //new ExtractTextPlugin('dist/app.css'),
    new webpack.NoErrorsPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    proxy: {
      '*': 'http://127.0.0.1:' + (process.env.npm_package_config_devport || 3000)
    },
    host: '127.0.0.1'
  }
};
