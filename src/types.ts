export type TransitionStage = "enter" | "leave";

export type TransitionClasses = {
  enter: string[];
  enterFrom: string[];
  enterTo: string[];
  leave: string[];
  leaveFrom: string[];
  leaveTo: string[];
};

export interface TransitionOptions {
  attribute: string;
  classes: TransitionClasses;
  stages: {
    enter: string;
    leave: string;
  };
}
