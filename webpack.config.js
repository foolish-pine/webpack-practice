const path = require("path")
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./js/main.js",
    clean: true,
  },
  devServer: {
    open: true,
    watchFiles: ["src/**/*.ejs"],
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    "targets": "> 0.25%, not dead"
                  },
                ]
              ],
            },
          },
        ]
      },
      {
        test: /\.ejs/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "ejs-plain-loader",
          }
        ],
      },
      {
        test: /\.scss/, // ファイル名の検知
        use: [
          {
            loader: miniCssExtractPlugin.loader, // loaderを変更する
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader", // loaderは下から上に順に適用される
          }
        ]
      },
      {
        test: /\.(png|jpg)/,
        type: "asset/resource",
        generator: {
          filename: "img/[name][ext]", // nameとextの間にドットは必要ない
        },
        use: [
          // {
          //   loader: "file-loader",
          //   options: {
          //     esModule: false,
          //     name: "img/[name].[ext]",
          //   }
          // },
        ]
      }
    ]
  },
  plugins: [ // pluginsを記述する階層に注意する
    new miniCssExtractPlugin({
      filename: "./css/main.css" // 出力ファイルのファイル名を指定する
    }),
    new htmlWebpackPlugin({
      template: "./src/templates/index.ejs", // index.htmlをテンプレートファイルに指定する
      filename: "index.html"
    }),
    new htmlWebpackPlugin({
      template: "./src/templates/access.ejs",
      filename: "access.html"
    }),
    new htmlWebpackPlugin({
      template: "./src/templates/members/taro.ejs",
      filename: "members/taro.html"
    }),
  ]
}