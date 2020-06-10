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
    });

    // setup URL Alias
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    };
    return config;
  },
};
