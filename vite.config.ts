import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fixReactVirtualized from "esbuild-plugin-react-virtualized";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [fixReactVirtualized], // Call the plugin as a function
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
