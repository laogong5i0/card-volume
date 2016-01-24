var path = require("path");
var webpack = require('webpack');
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var Clean = require("clean-webpack-plugin");

var rootDir = path.join(__dirname, "..");


module.exports = {
  context: path.join(rootDir, "app"),
  entry:{
    app:"./app-dev"
    // lib: ["react", "react-dom", "react-router", "history"]
  },
  output:{
    path: path.join(rootDir, "build"),
    filename: '[name].js',
    publicPath: "/"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.(jpe?g|png|gif|svg|woff|eot|ttf)$/, loader: 'url?limit=10000&name=assets/img/[sha512:hash:base64:7].[ext]' }
    ]
  },
  plugins:[
    new Clean(['build'], rootDir),
    new webpack.optimize.OccurenceOrderPlugin(),
  //   new webpack.optimize.CommonsChunkPlugin('lib', 'lib.js'),
  //   // new webpack.optimize.UglifyJsPlugin({warnings: false, minimize: true, sourceMap: false}),
    new ExtractTextPlugin("assets/styles.css"), //提取CSS. http://npm.taobao.org/package/extract-text-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'assets/index.html'
    })
  ]
}
