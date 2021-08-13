const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const paths = require("./paths");

module.exports = {
  entry: {
    main: [paths.src + "/main.js"],
  },

  plugins: [
    // Clean the old dist
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${paths.src}/config/`, to: "./config/" },
        { from: `${paths.src}/assets/`, to: "./assets/" },
        {
          from: `${paths.public}/service-worker.js`,
          to: "./service-worker.js",
        },
        {
          from: `${paths.public}/manifest.json`,
          to: "./manifest.json",
        },
        {
          from: `${paths.public}/favicon/`,
          to: "./favicon/",
        },
      ],
    }),
    // Create index.html from template.html (index.js gets injected too as it's the main entry)
    new HtmlWebpackPlugin({
      title: "Webpack Boilerplate",
      //favicon: paths.src + "/src/assets/img/favicon.ico",
      template: paths.public + "/index.html", // template file
      filename: "index.html", // output file
    }),
  ],

  module: {
    rules: [
      // JavaScript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      // Images
      {
        test: /\.(ogg|mp3|wav|mpe?g|woff(2)?|ttf|eot|svg|jpg|png|webp)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              outputPath: "assets/",
              useRelativePaths: true,
            },
          },
        ],
      },
      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
      },
      // CSS, PostCSS, and Sass
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};
