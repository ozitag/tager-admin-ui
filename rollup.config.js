import path from 'path';

import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import svg from 'rollup-plugin-vue-inline-svg';
import vue from 'rollup-plugin-vue';
import styles from 'rollup-plugin-styles';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'es',
      assetFileNames: '[name][extname]',
      sourcemap: true,
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'TagerAdminUi',
      globals: {
        vue: 'Vue',
        '@tager/admin-services': 'adminServices',
      },
      assetFileNames: '[name][extname]',
    },
    {
      file: 'dist/index.min.js',
      format: 'iife',
      name: 'TagerAdminUi',
      globals: {
        vue: 'Vue',
        '@tager/admin-services': 'adminServices',
      },
      assetFileNames: '[name][extname]',
    },
  ],
  external: ['vue', '@tager/admin-services', '@babel/runtime'],
  plugins: [
    alias({
      entries: [
        {
          find: /^@\/(.*)$/,
          replacement: `${path.resolve(__dirname, 'src')}/$1`,
        },
      ],
    }),
    resolve({ extensions: ['.js', '.css', '.svg', '.vue'] }),
    commonjs(),
    svg({ svgoConfig: { plugins: [{ removeViewBox: false }] } }),
    vue(),
    babel({
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-transform-runtime'],
      babelHelpers: 'runtime',
    }),
    styles({
      mode: ['extract', './admin-ui.css'],
    }),
  ],
};
