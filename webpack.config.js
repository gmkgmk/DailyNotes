var path = require("path");
var webpack = require("webpack");
module.exports = {
  entry: {
    main: [path.join(__dirname, "Sidebar/js/main.js")]
  },
  output: {
    path: path.join(__dirname, "Sidebar/dist"),
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },
  resolve: {
    modules: [path.join(__dirname, "."), "node_modules"],
  }
}