import {
  trigger,
  state,
  style,
  animate,
  transition,
  stagger,
  query,
} from "@angular/animations";

export const showUpStaggered = () => {
  return trigger("showUpCollection", [
    transition("* => *", [
      query(
        ":enter",
        [
          style({ opacity: 0, transform: "scaleY(0)" }),
          stagger(70, [
            animate(
              300,
              style({
                opacity: 1,
                transform: "scaleY(1)",
              })
            ),
          ]),
        ],
        { optional: true }
      ),
    ]),
  ]);
};

export const showUp = () => {
  return trigger("showUpElement", [
    state("in", style({ opacity: 1, transform: "scaleY(1)" })),
    transition(":enter", [
      style({ opacity: 0, transform: "scaleY(0)" }),
      animate(250),
    ]),
  ]);
};
