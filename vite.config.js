import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    // Performance: High-density compression for mobile LCP scores
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
    // Vite 8 Requirement: esbuild must be installed as a peer dependency
    minify: "esbuild",
    rollupOptions: {
      output: {
        // Build Fix: Using Function syntax to satisfy strict bundler requirements
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react") || id.includes("react-dom")) {
              return "vendor-react";
            }
            if (id.includes("framer-motion")) {
              return "vendor-motion";
            }
            if (
              id.includes("@vercel/analytics") ||
              id.includes("@vercel/speed-insights")
            ) {
              return "vendor-analytics";
            }
            return "vendor-base";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
  },
});
