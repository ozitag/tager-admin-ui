const path = require('path');
const webpack = require('webpack');

module.exports = {
  stories: ['../src/**/*.stories.[tj]s'],
  webpackFinal: (config) => {
    // allow SCSS
    config.module.rules.push({
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.find((rule) => {
      if (rule.test && String(rule.test).includes('svg')) {
        rule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/;
      }
    });

    // allow SVG as Vue components
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        'babel-loader',
        {
          loader: 'vue-svg-loader',
          options: { svgo: { plugins: [{ removeViewBox: false }] } },
        },
      ],
      include: path.resolve(__dirname, '../src/assets/svg'),
    });

    // setup URL Alias
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    };

    config.plugins = config.plugins.filter(
      (plugin) => !(plugin instanceof webpack.DefinePlugin)
    );
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.VUE_APP_API_ORIGIN': JSON.stringify(
          process.env.VUE_APP_API_ORIGIN
        ),
      })
    );
    return config;
  },
};
