const { DefinePlugin, optimize } = require('webpack');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');

const env = process.env.NODE_ENV || 'local';
const analyze = process.env.ANALYZE_BUNDLE;

const plugins = [new Dotenv()];

plugins.push(new DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    GRAPH_API_URI: JSON.stringify(process.env.GRAPH_API_URI),
    AUTH_API_URI: JSON.stringify(process.env.AUTH_API_URI),
    STORAGE_API_URI: JSON.stringify(process.env.STORAGE_API_URI),
    INSTAGRAM_API_URI: JSON.stringify(process.env.INSTAGRAM_API_URI),
  },
}));

if (analyze) {
  plugins.push(new BundleAnalyzerPlugin());
}
plugins.push(new CompressionPlugin({
  filename: '[path].gz[query]',
  algorithm: 'gzip',
  test: /\.js$|\.css$|\.html$/,
  threshold: 1024,
  minRatio: 0.8,
}));
plugins.push(new optimize.AggressiveMergingPlugin());

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    app: [
      path.resolve(__dirname, 'src/app/index.jsx'),
    ],
  },
  mode: env === 'production' ? 'production' : 'development',
  output: {
    path: path.resolve(__dirname, 'public/build'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/build/',
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins,
  optimization: {
    minimizer: [
      new TerserPlugin(),
    ],
  },
  watch: env === 'local',
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
