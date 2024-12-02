import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
console.log("VITE_AGENTS_URL", process.env.VITE_AGENTS_URL);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api/centrala": {
          target: env.VITE_CENTRALA_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/centrala/, ""),
        },
        "/api": {
          target: env.VITE_AGENTS_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
