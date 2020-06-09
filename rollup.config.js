import path from 'path';

import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import svg from 'rollup-plugin-vue-inline-svg';
import vue from 'rollup-plugin-vue';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'es',
      plugins: [
        getBabelOutputPlugin({
          presets: ['@babel/preset-env'],
          plugins: [['@babel/plugin-transform-runtime', { useESModules: true }]]
        })
      ]
    },
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'TagerAdminCore',
      globals: {
        vue: 'Vue',
        'vue-router': 'VueRouter'
      }
    },
    {
      file: 'dist/index.min.js',
      format: 'iife',
      name: 'TagerAdminCore',
      globals: {
        vue: 'Vue',
        'vue-router': 'VueRouter'
      }
    }
  ],
  external: ['vue', 'vue-router'],
  plugins: [
    alias({
      entries: [
        {
          find: /^@\/(.*)$/,
          replacement: `${path.resolve(__dirname, 'src')}/$1`
        }
      ]
    }),
    resolve(),
    svg({ svgoConfig: { plugins: [{ removeViewBox: false }] } }),
    vue()
    // babel({
    //   babelHelpers: 'runtime',
    //   plugins: ['@babel/plugin-transform-runtime']
    // })
  ]
};
