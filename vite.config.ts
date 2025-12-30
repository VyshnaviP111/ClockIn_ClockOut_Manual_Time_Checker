import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");

  return {
    // ✅ GitHub Pages base path (repo name)
    base: "/ClockIn_ClockOut_Manual_Time_Checker/",

    server: {
      port: 3000,
      host: "0.0.0.0",
    },

    plugins: [react()],

    define: {
      "process.env.API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },

    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./", import.meta.url)),
      },
    },
  };
});
