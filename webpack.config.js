const path = require('path');
const TerserPlugin = require('./node_modules/terser-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  target: ['web', 'browserslist:Production'],
  // Disabling these two to avoid Kindle unsupported syntax errors:
  // mode: 'development',
  // devtool: 'source-map',
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          keep_fnames: true,
          mangle: false,
          compress: {
            // Some optimizations added by this option is not supported by IE,
            // so probably also not by Kindle
            typeofs: false,
          },
          // This only seems to change some undefined check
          ie8: true,
          format: {
            // beautify is deprecated, but will use anyway
            beautify: true,
            indent_level: 2,
            indent_start: 2,

            // These only apply when minified:
            // max_line_len: 110,
            // semicolons: false,
          },
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // TODO: replace with babel.config.js content?
          options: {
            presets: [['@babel/preset-env', {}]],
          },
        },
      },
    ],
  },
};
