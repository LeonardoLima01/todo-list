const path = require("path");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [new NodePolyfillPlugin()],
  resolve: {
    fallback: {
      fs: false,
      worker_threads: false,
      module: false,
      esbuild: false,
    },
  },
};
