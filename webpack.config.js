const path = require("path")

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
            loader: "style-loader",
          },
          {
            loader: "css-loader", // loaderは下から上に順に適用される
          }
        ]
      }
    ]
  }
}