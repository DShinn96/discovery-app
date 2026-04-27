import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    // Generates .gz and .br files for faster transfer
    compression({
      algorithm: "brotliCompress",
      ext: ".br",
    }),
    compression({
      algorithm: "gzip",
      ext: ".gz",
    }),
  ],
  build: {
    // Slashing the payload size by splitting vendor code
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("framer-motion")) return "vendor-motion";
            if (id.includes("react")) return "vendor-react";
            return "vendor-libs";
          }
        },
      },
    },
    // Minimizer settings to squeeze every byte
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
