import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"
import react from "@vitejs/plugin-react"

export default defineConfig(() => {
  return {
    build: {
      outDir: "dist",
    },
    plugins: [
      VitePWA({
        registerType: "autoUpdate",
        devOptions: {
          enabled: true,
        },
      }),
      react(),
    ],
  }
})
