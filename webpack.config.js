const path = require('path');

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "client", "Index.jsx"),
  output: {
    path:path.resolve(__dirname, "public"),
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
    ]
  }
}