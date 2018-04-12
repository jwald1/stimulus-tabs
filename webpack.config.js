const path = require("path")

module.exports = {
  entry: {
    bundle: "./src/index.js"
  },

  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build")
  },


  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: [
          /node_modules/
        ],
        use: [
          { loader: "babel-loader" }
        ]
      }
    ]
  }
}
