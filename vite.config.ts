import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const backendUrl = "http://127.0.0.1:5000";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: backendUrl,
        changeOrigin: true,
      },
      "/auth": {
        target: backendUrl,
        changeOrigin: true,
      },
    },
  },
});
