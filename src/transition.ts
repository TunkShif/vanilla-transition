import type { TransitionClasses, TransitionStage } from "./types";

const waitForTransition = (el: HTMLElement, callback: () => void) => {
  const handler = () => {
    callback();
    el.removeEventListener("transitionend", handler, false);
  };
  el.addEventListener("transitionend", handler, false);
};

export const doTransition = (
  el: HTMLElement,
  stage: TransitionStage,
  classes: TransitionClasses
) => {
  let base: string[];
  let from: string[];
  let to: string[];
  switch (stage) {
    case "enter":
      base = classes.enter;
      from = classes.enterFrom;
      to = classes.enterTo;
      break;
    case "leave":
      base = classes.leave;
      from = classes.leaveFrom;
      to = classes.leaveTo;
      break;
  }

  if (stage === "enter") {
    el.removeAttribute("hidden");
    el.style.display = "";
  }

  el.classList.add(...base, ...from);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.classList.remove(...from);
      el.classList.add(...to);

      waitForTransition(el, () => {
        el.classList.remove(...base);

        if (stage === "leave") {
          el.style.display = "none";
        }
      });
    });
  });
};
