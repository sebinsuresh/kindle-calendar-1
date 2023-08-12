const path = require('path');

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
