const path = require("path");
const webpack = require('webpack');

module.exports = (env) => {
  return {
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    resolve: {
      extensions: [ '.ts', '.js', '.tsx' ],
      alias: process.env.USE_SRC && {
        'three-loader-3dtiles': path.resolve(__dirname, '../../src')
      }
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: '/',
      filename: "bundle.js",
    },
    mode: "development",
    devServer: {
        static: path.join(__dirname, "dist"),
        port: 8000,
        hot: true
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
       }
      ]
    }
  };
}
