const path = require("path")
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const vueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "./js/[name]-[contenthash].js",
    clean: true,
  },
  devServer: {
    open: true,
    watchFiles: ["src/**/*.ejs"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ]
      },
      {
        test: /\.vue/,
        exclude: /node_modules/,
        use: [
          {
            loader: "vue-loader",
          },
        ]
      },
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
                ],
                "@babel/preset-react"
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
        test: /\.(png|jpg|jpeg)/,
        type: "asset/resource",
        generator: {
          filename: "img/[name]-[contenthash][ext]", // nameとextの間にドットは必要ない
        },
        use: [
          // {
          //   loader: "file-loader",
          //   options: {
          //     esModule: false,
          //     name: "img/[name].[ext]",
          //   }
          // },
          {
            loader: "image-webpack-loader",
          }
        ]
      }
    ]
  },
  plugins: [ // pluginsを記述する階層に注意する
    new vueLoaderPlugin(),
    new miniCssExtractPlugin({
      filename: "./css/[name]-[contenthash].css" // 出力ファイルのファイル名を指定する
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