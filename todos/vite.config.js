import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import { VitePWA } from "vite-plugin-pwa";
import eslintPlugin from "vite-plugin-eslint";
import inject from "@rollup/plugin-inject";

export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [
    react(),
    eslint(),
    eslintPlugin({
      cache: false, // Disable cache, or adjust as needed
    }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        short_name: "React App",
        name: "Create React App Sample",
        icons: [
          {
            src: "favicon.ico",
            sizes: "64x64",
            type: "image/x-icon",
          },
          {
            src: "logo192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "logo512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
        start_url: "/",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff",
        screenshots: [
          {
            src: "screenshot-desktop1.png",
            type: "image/png",
            sizes: "1918x1080",
            platform: "wide",
          },
          {
            src: "logo512.png",
            type: "image/png",
            sizes: "512x512",
            label: "Mobile screenshot",
          },
        ],
      },
    }),
    inject({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
  resolve: {
    alias: {
    
    }
  },
  server: {
    port: 5173,
    strictPort: true,
  },
  optimizeDeps: {
    include: ["ethers"],
  },
});
