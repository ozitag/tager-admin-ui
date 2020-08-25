import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import svg from 'rollup-plugin-vue-inline-svg';
import vue from 'rollup-plugin-vue';
import styles from 'rollup-plugin-styles';
import babel from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import { DEFAULT_EXTENSIONS } from '@babel/core';

export default {
  input: 'src/main.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'es',
      assetFileNames: '[name][extname]',
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'TagerAdminUi',
      assetFileNames: '[name][extname]',
    },
  ],
  external: [
    /@babel\/runtime/,
    'vue',
    '@vue/composition-api',
    '@tager/admin-services',
  ],
  plugins: [
    /**
     * Must be before rollup-plugin-typescript2 in the plugin list
     * Reference:
     * https://github.com/ezolenko/rollup-plugin-typescript2#rollup-plugin-node-resolve
     */
    resolve({ extensions: ['.ts', '.tsx', '.js', '.css', '.svg', '.vue'] }),
    typescript(),
    vue(),
    commonjs(),
    svg({ svgoConfig: { plugins: [{ removeViewBox: false }] } }),
    babel({
      /** Reference: https://github.com/ezolenko/rollup-plugin-typescript2#rollup-plugin-babel */
      extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx'],

      presets: ['@vue/cli-plugin-babel/preset'],
      plugins: ['@babel/plugin-transform-runtime'],
      /** Reference: https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers */
      babelHelpers: 'runtime',
    }),

    styles({
      mode: ['extract', './admin-ui.css'],
    }),
  ],
};
