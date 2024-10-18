import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";
import resolve from "@rollup/plugin-node-resolve";

import packageJson from "./package.json";

const devMode = process.env.NODE_ENV !== "production";

const commonPaths = {
  root: __dirname,
  fontsFolder: "assets/fonts",
  imagesFolder: "assets/images",
};

export default defineConfig({
  plugins: [
    react(),
    resolve({
      extensions: [".mjs", ".js", ".jsx", ".tsx", ".ts", ".json", ".scss"],
    }),
    svgr({
      babel: false,
      svgo: true,
      svgoConfig: {
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: false,
              },
            },
          },
        ],
      },
    }),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Multi",
        short_name: "Multi",
        description: "Multi - Lojas, promoções, programa de fidelidade e mais!",
        background_color: "#015C40",
        theme_color: "#015C40",
        orientation: "portrait",
        display: "standalone",
        icons: [
          {
            src: path.resolve(
              commonPaths.root,
              `${commonPaths.imagesFolder}/pwa/icon.png`
            ),
            sizes: "120x120",
            ios: true,
          },
          {
            src: path.resolve(
              commonPaths.root,
              `${commonPaths.imagesFolder}/pwa/icon.png`
            ),
            sizes: "1024x1024",
            ios: "startup",
          },
          {
            src: path.resolve(
              commonPaths.root,
              `${commonPaths.imagesFolder}/pwa/icon.png`
            ),
            sizes: "36x36 48x48 72x72 96x96 144x144 192x192 512x512",
          },
        ],
      },
    }),
  ],
  define: {
    VERSION: JSON.stringify(packageJson.version),
    // multiStorage: 'window.multiStorage',
    // 'window.tracking': 'window.tracking',
  },
  server: {
    port: 8080,
    open: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(commonPaths.root, "src"),
      "@styles": path.resolve(commonPaths.root, "src/styles"),
      utils: path.resolve(commonPaths.root, "src/utils"),
      services: path.resolve(commonPaths.root, "src/services"),
      components: path.resolve(commonPaths.root, "src/components"),
      hooks: path.resolve(commonPaths.root, "src/hooks"),
      constants: path.resolve(commonPaths.root, "src/constants"),
      theme: path.resolve(commonPaths.root, "src/theme"),
      config: path.resolve(commonPaths.root, "src/config"),
      images: path.resolve(commonPaths.root, "src/images"),
      lottie: path.resolve(commonPaths.root, "src/lottie"),
      icons: path.resolve(commonPaths.root, "src/icons"),
      screens: path.resolve(commonPaths.root, "src/screens"),
    },
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx", ".json"],
  },
  esbuild: {
    loader: "jsx",
    include: /\.(js)$/,
    exclude: /node_modules/,
  },
  assetsInclude: ["**/*.svg"],
  optimizeDeps: {
    // esbuildOptions: {
    //   loader: {
    //     '.js': 'jsx',
    //   },
    // },
    // include: [
    //   "src/index.js",
    //   "src/statics/storage/index.js",
    //   "src/statics/tracking/index.js",
    // ],
    // exclude: ["jimp", "@jimp/custom", "@jimp/types", "@jimp/plugins"],
  },
  // build: {
  //   sourcemap: true,
  //   outDir: "dist",
  //   rollupOptions: {
  //     input: {
  //       main: "@/index.js",
  //       storage_head: "@/statics/storage/index.js",
  //       tracking_head: "@/statics/tracking/index.js",
  //     },
  //     output: {
  //       assetFileNames: (assetInfo) => {
  //         if (/\.(png|jpg|gif|webp|svg)$/.test(assetInfo.name)) {
  //           return `${commonPaths.imagesFolder}/[hash][extname][query]`;
  //         }
  //         if (/\.(woff2|ttf|otf|woff|eot)$/.test(assetInfo.name)) {
  //           return `${commonPaths.fontsFolder}/[hash][extname][query]`;
  //         }
  //         return "[hash][extname][query]";
  //       },
  //     },
  //   },
  // },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `
  //         @import "@styles/utils/_fonts.scss";
  //         @import "@styles/utils/_mixins.scss";
  //         @import "@styles/utils/_rem.scss";
  //         @import "@styles/utils/_scroll.scss";
  //         @import "@styles/_var.scss";
  //       `,
  //     },
  //   },
  //   modules: {
  //     generateScopedName: devMode
  //       ? "[local]--[hash:base64:5]"
  //       : "[hash:base64:5]",
  //   },
  // },
});
