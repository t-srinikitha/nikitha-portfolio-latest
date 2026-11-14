import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      // /plastic gets its own HTML entry so link previews show PlasticOptics meta tags.
      input: {
        main: path.resolve(__dirname, "index.html"),
        plastic: path.resolve(__dirname, "plastic.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
