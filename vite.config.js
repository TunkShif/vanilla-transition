import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig(({ mode }) => {
  if (mode === "production") {
    return {
      publicDir: false,
      build: {
        lib: {
          entry: resolve(__dirname, "src/transition.ts"),
          name: "VanillaTransition",
          fileName: "vanilla-transition"
        }
      }
    }
  }
  return {}
})
