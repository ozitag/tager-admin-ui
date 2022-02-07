const path = require("path");
const svgr = require("@svgr/rollup");
const webpack = require("webpack");

function resolvePath(filePath) {
  return path.resolve(__dirname, "..", filePath);
}

module.exports = {
  framework: "@storybook/vue3",
  stories: ["../src/**/*.stories.@(ts|js)"],
  addons: ["@storybook/addon-essentials", "@storybook/preset-scss"],
  core: {
    builder: "webpack5",
  },
  features: {
    babelModeV7: true,
  },
  /**
   * Original webpack config: {@link https://github.com/storybookjs/storybook/blob/main/app/vue3/src/server/framework-preset-vue3.ts}
   */
  webpackFinal: (config) => {
    console.log("config", config.module.rules);
    config.experiments = {
      backCompat: false,
    };
    // config.module.rules.push({
    //   test: /\.scss$/,
    //   use: ["style-loader", "css-loader", "sass-loader"],
    //   // include: path.resolve(__dirname, '../'),
    // });
    //
    // config.module.rules.find((rule) => {
    //   if (rule.test && String(rule.test).includes("svg")) {
    //     rule.test = /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/;
    //   }
    // });
    //
    // // allow SVG as Vue components
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   use: [
    //     "babel-loader",
    //     {
    //       loader: "vue-svg-loader",
    //       options: { svgo: { plugins: [{ removeViewBox: false }] } },
    //     },
    //   ],
    //   include: path.resolve(__dirname, "../src/assets/svg"),
    // });
    //
    // config.plugins = config.plugins.filter(
    //   (plugin) => !(plugin instanceof webpack.DefinePlugin)
    // );
    return config;
  },
};
