const path = require('path');

// const AssetsPlugin = require('assets-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const isDevelopment = process.env.NODE_ENV !== 'production';
//false
// const isDevelopment = process.env.NODE_ENV === 'production';
//true
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
//use only test
console.log('isDev?', isDevelopment);

module.exports = {
  name: 'codingTest',
  mode: isDevelopment ? 'development' : 'production',
  // mode: isDevelopment ? 'production' : 'development',
  // devtool: isDevelopment ? '' : 'eval',
  devtool: isDevelopment && 'eval',
  // devtool: 'eval',
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', 'json'],
  },
  entry: './client.jsx',
  module: {
    rules: [
      {
        test: /\.js?/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/transform-runtime'],
              // plugins: [
              //   isDevelopment && require.resolve('react-refresh/babel'),
              // ].filter(Boolean),
              // My guess is that you've included the react-refresh/babel plugin
              // to process node_modules. This will break because some code (as used by Webpack and WDS) will inevitably run before the plugin.
            },
          },
        ],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  plugins: [
    ['@babel/plugin-transform-runtime'],
    {
      regenerator: true,
      corejs: 3,
    },
  ],
  plugins: [
    // new BundleAnalyzerPlugin(),
    isDevelopment && new webpack.HotModuleReplacementPlugin(),
    isDevelopment && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  //use only test
  plugins: [new CleanWebpackPlugin()],
  output: {
    // filename: 'client.js',
    filename: '[name].bundle.js',
    // chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  devServer: {
    port: 9000,
    publicPath: '/dist/',
    hot: true,
  },
  optimization: {
    // runtimeChunk: "single",
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
};
