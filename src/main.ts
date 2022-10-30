import Transition from "./transition"
import "./style.css"
  ; (() => {
    const button = document.querySelector<HTMLButtonElement>("#button-0")!
    const wrapper = document.querySelector<HTMLDivElement>("#transition-wrapper-0")!

    button.addEventListener("click", () => {
      const state = wrapper.dataset.transitionState!
      wrapper.dataset.transitionState = state === "show" ? "hide" : "show"
    })

    Transition.init(wrapper, wrapper)
  })()
  ; (() => {
    const button = document.querySelector<HTMLButtonElement>("#button-1")!
    const wrapper = document.querySelector<HTMLDivElement>("#transition-wrapper-1")!

    button.addEventListener("click", () => {
      wrapper.dataset.transitionState = "hide"
      setTimeout(() => {
        wrapper.dataset.transitionState = "show"
      }, 600)
    })

    Transition.init(wrapper, wrapper)
  })()
  ; (() => {
    const button = document.querySelector<HTMLButtonElement>("#button-2")!
    const wrapper = document.querySelector<HTMLElement>("#transition-wrapper-2")!
    const textState = document.querySelector<HTMLElement>("#text-0")!
    const textDisplay = document.querySelector<HTMLElement>("#text-1")!

    button.addEventListener("click", () => {
      const state = wrapper.dataset.transitionState!
      wrapper.dataset.transitionState = state === "show" ? "hide" : "show"
    })

    Transition.init(textDisplay, wrapper)

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.attributeName === "data-transition-state") {
          textState.innerText = wrapper.dataset.transitionState!
        }
      }
    })
    observer.observe(wrapper, { attributes: true })
  })()
  ; (() => {
    const button = document.querySelector<HTMLButtonElement>("#button-3")!
    const modal = document.querySelector<HTMLElement>("#modal")!
    const modalOverlay = document.querySelector<HTMLElement>("#modal-overlay")!
    const modalContent = document.querySelector<HTMLElement>("#modal-content")!
    const closeButtons = document.querySelectorAll<HTMLButtonElement>("[data-modal-close]")

    button.addEventListener("click", () => {
      modal.dataset.modalState = "show"
    })
    closeButtons.forEach((el) =>
      el.addEventListener("click", () => {
        modal.dataset.modalState = "hide"
      })
    )

    const config = {
      attribute: "data-modal-state"
    }

    Transition.init(modalOverlay, modal, config)
    Transition.init(modalContent, modal, config)
  })()
