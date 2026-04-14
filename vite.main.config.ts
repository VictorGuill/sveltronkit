import { defineConfig } from "vite";
import { builtinModules } from "node:module";

const external = [
  "electron",
  "electron/main",
  "electron-squirrel-startup",
  ...builtinModules,
  ...builtinModules.map((moduleName) => `node:${moduleName}`),
];

// https://vitejs.dev/config
export default defineConfig(({ command }) => ({
  define:
    command === "serve"
      ? {}
      : {
          MAIN_WINDOW_VITE_DEV_SERVER_URL: "undefined",
          MAIN_WINDOW_VITE_NAME: JSON.stringify("main_window"),
        },
  build: {
    copyPublicDir: false,
    emptyOutDir: false,
    outDir: ".vite/build",
    target: "node22",
    lib: {
      formats: ["es"],
      entry: "electron/main.ts",
      fileName: "main",
    },
    rollupOptions: {
      external,
    },
  },
  resolve: {
    conditions: ["node"],
    mainFields: ["module", "jsnext:main", "jsnext"],
  },
}));
