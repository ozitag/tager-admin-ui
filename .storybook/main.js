const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.[tj]s'],
  webpackFinal: (config) => {
    // allow SCSS
    config.module.rules.push({
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });
    // setup URL Alias
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    };
    return config;
  },
};
