const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: false
});

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    path.join(__dirname, 'client/app.jsx')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query:{
         presets:['react']
      }
    },
    {
      test: /\.scss$/,
      use: extractSass.extract({
      use: [
        {loader: "css-loader"}, 
        {loader: "resolve-url-loader"},
        {loader: "sass-loader"}],
        // use style-loader in development
        fallback: "style-loader"
      })
    },{
      test: /\.jpeg$/,
      loader: 'file-loader'
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    extractSass
  ]
};