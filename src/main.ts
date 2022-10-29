import * as Transition from "./transition"
import "./style.css"
  ; (() => {
    const button = document.querySelector<HTMLButtonElement>("#button-0")!
    const wrapper = document.querySelector<HTMLDivElement>("#transition-wrapper-0")!

    button.addEventListener("click", () => {
      const state = wrapper.getAttribute("data-transition-state")!
      wrapper.setAttribute("data-transition-state", state === "show" ? "hide" : "show")
    })

    Transition.init(wrapper, wrapper)
  })()
  ; (() => {
    const button = document.querySelector<HTMLButtonElement>("#button-1")!
    const wrapper = document.querySelector<HTMLDivElement>("#transition-wrapper-1")!

    button.addEventListener("click", () => {
      wrapper.setAttribute("data-transition-state", "hide")
      setTimeout(() => {
        wrapper.setAttribute("data-transition-state", "show")
      }, 600)
    })

    Transition.init(wrapper, wrapper)
  })()
