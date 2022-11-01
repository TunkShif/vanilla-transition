import { init } from "./transition"

const VanillaTransition = {
  init
}

export default VanillaTransition

declare global {
  interface Window {
    VanillaTransition: typeof VanillaTransition
  }
}

if (typeof window !== "undefined") {
  window.VanillaTransition = VanillaTransition
}
