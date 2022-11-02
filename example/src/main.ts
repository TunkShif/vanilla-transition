import { createTransitionObserever } from "@tunkshif/vanilla-transition";
import type { TransitionClasses } from "@tunkshif/vanilla-transition";
import "./style.css";

const UI_STATE_ATTRIBUTE = "data-ui-state";

const flip = <T>(current: T, values: [T, T]) => (current === values[0] ? values[1] : values[0]);

const getTransitionClasses = (el: HTMLElement) =>
  Object.fromEntries(
    ["enter", "leave"]
      .map(v => [v, `${v}From`, `${v}To`])
      .flat()
      .map(key => [key, el.dataset[key]?.split(" ")?.filter(Boolean) ?? []] as const)
  ) as TransitionClasses;

(() => {
  const button = document.querySelector<HTMLButtonElement>("#button-0")!;
  const wrapper = document.querySelector<HTMLDivElement>("#transition-wrapper-0")!;
  const classes = getTransitionClasses(wrapper);

  button.addEventListener("click", () => {
    const state = wrapper.dataset.uiState || "";
    wrapper.dataset.uiState = flip(state, ["show", ""]);
  });

  createTransitionObserever(wrapper, wrapper, {
    classes,
    attribute: UI_STATE_ATTRIBUTE,
    stages: {
      enter: "show",
      leave: ""
    }
  });
})();

(() => {
  const button = document.querySelector<HTMLButtonElement>("#button-1")!;
  const wrapper = document.querySelector<HTMLDivElement>("#transition-wrapper-1")!;
  const classes = getTransitionClasses(wrapper);

  button.addEventListener("click", () => {
    wrapper.dataset.uiState = "";
    setTimeout(() => {
      wrapper.dataset.uiState = "show";
    }, 600);
  });

  createTransitionObserever(wrapper, wrapper, {
    classes,
    attribute: UI_STATE_ATTRIBUTE,
    stages: {
      enter: "show",
      leave: ""
    }
  });
})();

(() => {
  const button = document.querySelector<HTMLButtonElement>("#button-2")!;
  const wrapper = document.querySelector<HTMLElement>("#transition-wrapper-2")!;
  const textState = document.querySelector<HTMLElement>("#text-0")!;
  const textDisplay = document.querySelector<HTMLElement>("#text-1")!;
  const classes = getTransitionClasses(textDisplay);

  button.addEventListener("click", () => {
    const state = wrapper.dataset.textState || "";
    wrapper.dataset.textState = flip(state, ["show", ""]);
  });

  createTransitionObserever(textDisplay, wrapper, {
    classes,
    attribute: "data-text-state",
    stages: {
      enter: "show",
      leave: ""
    }
  });

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.attributeName === "data-text-state") {
        textState.innerText = wrapper.dataset.textState || "hidden";
      }
    }
  });
  observer.observe(wrapper, { attributes: true });
})();

(() => {
  const button = document.querySelector<HTMLButtonElement>("#button-3")!;
  const modal = document.querySelector<HTMLElement>("#modal")!;
  const modalOverlay = document.querySelector<HTMLElement>("#modal-overlay")!;
  const modalContent = document.querySelector<HTMLElement>("#modal-content")!;
  const closeButtons = document.querySelectorAll<HTMLButtonElement>("[data-modal-close]");

  button.addEventListener("click", () => {
    modal.dataset.uiState = "show";
  });

  closeButtons.forEach(el =>
    el.addEventListener("click", () => {
      modal.dataset.uiState = "";
    })
  );

  [modalOverlay, modalContent].forEach(el => {
    createTransitionObserever(el, modal, {
      attribute: UI_STATE_ATTRIBUTE,
      classes: getTransitionClasses(el),
      stages: {
        enter: "show",
        leave: ""
      }
    });
  });
})();
