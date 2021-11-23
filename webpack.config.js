const path = require("path")
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.css/, // ファイル名の検知
        use: [
          {
            loader: miniCssExtractPlugin.loader, // loaderを変更する
          },
          {
            loader: "css-loader", // loaderは下から上に順に適用される
          }
        ]
      }
    ]
  },
  plugins: [ // pluginsを記述する階層に注意する
    new miniCssExtractPlugin(),
    new htmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ]
}