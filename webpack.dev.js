const paths = require("./paths");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  // Set the mode to development or production
  mode: "development",

  // Control how source maps are generated
  devtool: "inline-source-map",
  output: {
    path: paths.build,
    filename: "[name].[hash].bundle.js",
    publicPath: "/",
  },
  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    contentBase: paths.build,
    open: true,
    compress: true,
    hot: true,
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
  ],
});
