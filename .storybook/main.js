const path = require('path');
const webpack = require('webpack');
const util = require('util');

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

    config.module.rules.find((rule) => {
      if (rule.test && String(rule.test) === '/\\.css$/') {
        delete rule.use;

        rule.oneOf = [
          // this matches `<style module>`
          {
            resourceQuery: /module/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]_[hash:base64:5]'
                }
              }
            ]
          },
          // this matches plain `<style>` or `<style scoped>`
          {
            use: [
              'vue-style-loader',
              'css-loader'
            ]
          }
        ];
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

    config.plugins = config.plugins.filter(
      (plugin) => !(plugin instanceof webpack.DefinePlugin)
    );
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.VUE_APP_API_ORIGIN': JSON.stringify(
          process.env.VUE_APP_API_ORIGIN
        ),
        'process.env.VUE_APP_ACCESS_TOKEN': JSON.stringify(
          process.env.VUE_APP_ACCESS_TOKEN
        ),
      })
    );

    console.log(util.inspect(config, {colors: true, depth: 20}));

    const isCssRule = rule =>
      rule.test && rule.test instanceof RegExp && rule.test.test("./file.css");

    return config;
    // return {
    //   ...config,
    //   module: {
    //     ...config.module,
    //     rules: [
    //       ...config.module.rules.filter(rule => !isCssRule(rule)),
    //       {
    //         test: /\.css$/,
    //         oneOf: [
    //           {
    //             resourceQuery: /module/,
    //             use: [
    //               'vue-style-loader',
    //               {
    //                 loader: 'css-loader',
    //                 options: {
    //                   modules: true
    //                 }
    //               },
    //               'postcss-loader'
    //             ]
    //           },
    //           {
    //             use: ['vue-style-loader', 'css-loader']
    //           }
    //         ]
    //       }        ]
    //   }
    // }
  },
};
