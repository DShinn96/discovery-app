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
    // Vite 8 Requirement: esbuild is now a separate peer dependency
    minify: "esbuild",
    rollupOptions: {
      output: {
        // Robust Object-based chunking for maximum build stability
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-analytics": ["@vercel/analytics", "@vercel/speed-insights"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
  },
});
