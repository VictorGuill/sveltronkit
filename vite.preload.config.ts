import { defineConfig } from "vite";
import { builtinModules } from "node:module";

const external = [
  "electron",
  "electron/common",
  ...builtinModules,
  ...builtinModules.map((moduleName) => `node:${moduleName}`),
];

// https://vitejs.dev/config
export default defineConfig({
  build: {
    copyPublicDir: false,
    emptyOutDir: false,
    outDir: ".vite/build",
    target: "node22",
    lib: {
      formats: ["es"],
      entry: "electron/preload.ts",
      fileName: "preload",
    },
    rollupOptions: {
      external,
    },
  },
  resolve: {
    conditions: ["node"],
    mainFields: ["module", "jsnext:main", "jsnext"],
  },
});
