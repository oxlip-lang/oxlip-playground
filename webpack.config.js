const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
  entry: "./src/bootstrap.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  mode: "production",
  module: {
    rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] }],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: ['src/index.html']
    })
  ],
  experiments: {
    asyncWebAssembly: true
  },
  performance: {
    maxAssetSize: 2000000
  },
};
