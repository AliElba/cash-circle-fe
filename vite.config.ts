/// <reference types="vitest" />

import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import dotenv from "dotenv";

// Load environment variables from `.env` file
dotenv.config();

export default defineConfig(({ mode }) => {
  // Load `.env` files based on the mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), legacy()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "sass:math";
          `,
          quietDeps: true,
        },
      },
    },
  };
});
