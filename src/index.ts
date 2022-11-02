import { doTransition } from "./transition";
import type { TransitionOptions } from "./types";

export const createTransitionObserever = (
  el: HTMLElement,
  observing: HTMLElement,
  options: TransitionOptions
) => {
  if (!observing.hasAttribute(options.attribute)) return;

  const currentStage = () => observing.getAttribute(options.attribute) || "";

  if (currentStage() === options.stages.leave) {
    el.style.display = "none";
  } else {
    el.style.display = "";
  }

  const observer = new MutationObserver(mutations => {
    for (const mutation of mutations) {
      if (mutation.attributeName === options.attribute) {
        const nextStage = currentStage() === options.stages.leave ? "leave" : "enter";

        doTransition(el, nextStage, options.classes);
      }
    }
  });

  observer.observe(observing, { attributes: true });

  return () => observer.disconnect();
};

export { doTransition } from "./transition";
export * from "./types";
