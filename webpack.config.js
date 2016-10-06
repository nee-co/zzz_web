const webpack = require("webpack");

module.exports = {
  context: __dirname + '/src',
  entry: {
   js: "./js/main.js",
  },

  output: {
    path: __dirname + '/public',
    filename: './js/app.js'
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
        query:{
          presets: ['es2015']
        }
      }
    ]
  }
};
