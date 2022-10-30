type TransitionProperties = {
  enter?: string
  enterFrom?: string
  enterTo?: string
  leave?: string
  leaveFrom?: string
  leaveTo?: string
}

type TransitionClasses = {
  enter: string[]
  enterFrom: string[]
  enterTo: string[]
  leave: string[]
  leaveFrom: string[]
  leaveTo: string[]
}

type TransitionOptions = {
  attribute?: string
  states?: {
    show: string
    hide: string
  }
}

const getProperties = (el: HTMLElement) => {
  return {
    enter: el.dataset.enter,
    enterFrom: el.dataset.enterFrom,
    enterTo: el.dataset.enterTo,
    leave: el.dataset.leave,
    leaveFrom: el.dataset.leaveFrom,
    leaveTo: el.dataset.leaveTo
  } as TransitionProperties
}

const waitForTransition = (el: HTMLElement, callback: () => void) => {
  const handler = () => {
    callback()
    el.removeEventListener("transitionend", handler, false)
  }
  el.addEventListener("transitionend", handler, false)
}

const doTransition = (el: HTMLElement, state: "show" | "hide", props: TransitionProperties) => {
  const classes = Object.fromEntries(
    Object.entries(props).map(([key, val]) => [key, val?.split(" ").filter(Boolean) ?? []])
  ) as TransitionClasses

  let base: string[]
  let from: string[]
  let to: string[]
  switch (state) {
    case "show":
      base = classes.enter
      from = classes.enterFrom
      to = classes.enterTo
      break
    case "hide":
      base = classes.leave
      from = classes.leaveFrom
      to = classes.leaveTo
      break
  }

  if (state === "show") {
    el.removeAttribute("hidden")
    el.style.display = ""
  }

  el.classList.add(...base, ...from)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.classList.remove(...from)
      el.classList.add(...to)

      waitForTransition(el, () => {
        el.classList.remove(...base)

        if (state === "hide") {
          el.style.display = "none"
        }
      })
    })
  })
}

const init = (el: HTMLElement, observing: HTMLElement, options?: TransitionOptions) => {
  const opts = Object.assign(
    {
      attribute: "data-transition-state",
      states: {
        show: "show",
        hide: "hide"
      }
    },
    options
  )

  const state = observing.getAttribute(opts.attribute)
  const props = getProperties(el)

  if (state === opts.states.hide) {
    el.style.display = "none"
  } else {
    el.style.display = ""
  }

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === opts.attribute) {
        const mutatedState =
          observing.getAttribute(opts.attribute)! === opts.states.show ? "show" : "hide"

        doTransition(el, mutatedState, props)
      }
    }
  })

  observer.observe(observing, { attributes: true })

  return () => observer.disconnect()
}

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
