const { resolve } = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');

const rules = require('./webpack.rules');

module.exports = {
  module: {
    rules: [
      ...rules,
      {
        test: /\.(jpg|png|svg|ico|icns|css)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          publicPath: '..',
          context: 'src',
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(__dirname, '..', 'src', 'renderer', 'public'),
          to: resolve(__dirname, '..', '.webpack/renderer'),
        },
      ],
    }),
  ],
};
