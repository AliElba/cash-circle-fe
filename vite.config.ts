/// <reference types="vitest" />

import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legacy()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "bootstrap/scss/bootstrap-grid.scss";
        @use "bootstrap/scss/bootstrap-utilities.scss";
        `,
        quietDeps: true, // Suppress deprecation warnings from 3rd-party libraries
      },
    },
  },
});
