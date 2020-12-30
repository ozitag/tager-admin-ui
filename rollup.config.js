import path from 'path';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import svg from 'rollup-plugin-vue-inline-svg';
import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import postcssImport from 'postcss-import';
import postcssUrl from 'postcss-url';

export default {
  input: 'src/main.ts',
  output: {
    file: 'dist/index.esm.js',
    format: 'esm',
  },
  external: [
    /@babel\/runtime/,
    'vue',
    '@vue/composition-api',
    '@tager/admin-services',
    '@ckeditor/ckeditor5-vue',
    '@tager/admin-wysiwyg',
    'lodash.get',
    'lodash.kebabcase',
    'vue-color',
    'leaflet',
    'autosize',
  ],
  plugins: [
    /**
     * Must be before rollup-plugin-typescript2 in the plugin list
     * Reference:
     * https://github.com/ezolenko/rollup-plugin-typescript2#rollup-plugin-node-resolve
     */
    resolve({ extensions: ['.ts', '.tsx', '.js', '.css', '.svg', '.vue'] }),
    commonjs(),
    typescript(),
    svg({ svgoConfig: { plugins: [{ removeViewBox: false }] } }),
    vue({ css: false }),
    babel({
      /**
       * Reference:
       * https://github.com/ezolenko/rollup-plugin-typescript2#rollup-plugin-babel
       * https://github.com/rollup/plugins/tree/master/packages/babel#extensions
       */
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],
      /**
       * Reference:
       * https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
       */
      babelHelpers: 'runtime',
      plugins: ['@babel/plugin-transform-runtime'],
    }),
    postcss({
      to: path.resolve('dist/admin-ui.css'),
      extract: path.resolve('dist/admin-ui.css'),
      plugins: [
        /** Reference: https://github.com/vansosnin/postcss-omit-import-tilde */
        function (css) {
          css.walkAtRules('import', function (rule) {
            if (rule.params.indexOf('~') === 1) {
              rule.params = rule.params.replace(/[~]+/, '');
            }
          });
        },
        postcssImport,
        postcssUrl([
          {
            url: 'copy',
            basePath: path.resolve('node_modules/leaflet/dist'),
            assetsPath: 'assets',
            useHash: true,
          },
        ]),
      ],
    }),
  ],
};
