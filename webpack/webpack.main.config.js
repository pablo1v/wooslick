const rules = require('./webpack.rules');

module.exports = {
  entry: './src/main/main.js',
  module: {
    rules,
  },
};
