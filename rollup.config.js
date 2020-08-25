import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import svg from 'rollup-plugin-vue-inline-svg';
import vue from 'rollup-plugin-vue';
import styles from 'rollup-plugin-styles';
import typescript from 'rollup-plugin-typescript2';

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
  external: ['vue', '@vue/composition-api', '@tager/admin-services'],
  plugins: [
    typescript(),
    vue(),
    resolve({ extensions: ['.ts', '.js', '.css', '.svg', '.vue'] }),
    commonjs(),
    svg({ svgoConfig: { plugins: [{ removeViewBox: false }] } }),
    styles({
      mode: ['extract', './admin-ui.css'],
    }),
  ],
};
