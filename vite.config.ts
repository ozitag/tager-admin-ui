import { defineConfig } from "vite";
import * as path from "path";
import vue from "@vitejs/plugin-vue";

function resolvePath(filePath: string) {
  return path.resolve(__dirname, filePath);
}

/**
 * Source: {@link https://github.com/formik/tsdx/blob/158ee9a69c824b71b62cf987fe943a167f47f936/src/utils.ts#L22-L23}
 */
const external = (id: string) => !id.startsWith(".") && !path.isAbsolute(id);

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      formats: ["es"],
      fileName: () => "index.mjs",
    },
    rollupOptions: {
      external: external,
    },
  },
  plugins: [vue()],
  resolve: {
    alias: [
      /**
       * Support importing css files from `node_modules` via `~`.
       * e.g. `@import "~normalize.css";`
       */
      {
        find: /^~(.+)/,
        replacement: resolvePath("node_modules/$1"),
      },
    ],
  },
});