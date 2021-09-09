const path = require("path");
const webpack = require('webpack');

// TODO: Do not use alias and dedupe three if necessary
// TODO: Switch to index.ts once issues at loaders.gl are resolved

module.exports = (env) => {
  return {
    entry: './src/index.js',
    devtool: 'inline-source-map',
    resolve: {
      extensions: [ '.ts', '.js' ],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      publicPath: '/',
      filename: "bundle.js",
    },
    mode: "development",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        port: 8000,
        hot: true
    },
    plugins: [
       new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
      alias: {
        'three-loader-3dtiles': path.resolve(
            __dirname,
          '../../../dist/three-loader-3dtiles.esm.js'
        ),
        'three/examples/jsm/loaders/KTX2Loader': path.resolve(__dirname,'/node_modules/three/examples/jsm/loaders/KTX2Loader'),
        'three/examples/jsm/loaders/DRACOLoader': path.resolve(__dirname,'/node_modules/three/examples/jsm/loaders/DRACOLoader'),
        'three/examples/jsm/loaders/GLTFLoader': path.resolve(__dirname,'/node_modules/three/examples/jsm/loaders/GLTFLoader')
      }
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
       }
      ]
    }
  };
}
