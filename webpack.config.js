const path = require("path")
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin  } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./js/main.js",
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
      },
      {
        test: /\.(png|jpg)/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name: "img/[name].[ext]",
            }
          },
        ]
      }
    ]
  },
  plugins: [ // pluginsを記述する階層に注意する
    new miniCssExtractPlugin({
      filename: "./css/main.css" // 出力ファイルのファイル名を指定する
    }),
    new htmlWebpackPlugin({
      template: "./src/templates/index.html", // index.htmlをテンプレートファイルに指定する
    }),
    new CleanWebpackPlugin (), // build前にdistのファイルをすべて削除する
  ]
}