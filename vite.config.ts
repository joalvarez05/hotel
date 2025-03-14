import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, rollupWarn) {
        if (
          warning.code === "UNUSED_EXTERNAL" ||
          warning.code === "MODULE_LEVEL_DIRECTIVE"
        ) {
          return;
        }
        rollupWarn(warning);
      },
    },
  },
  esbuild: {
    logLevel: "silent",
  },
});
