import { useContext } from "react";
import { TocContext } from "./TocProvider";
import { PagesContext } from "./PagesProvider";

export default function(state, action) {
  switch (action.type) {
    case "done":
      let newOne = {
        ...state[0],
        done: true
      };

      let newArray = state[0].map(e => {
        if (e.id === state[0]) {
          e = newOne;
        }
      });

      console.log("try to save", newOne);
      return newOne;

    default:
      return state;
  }
}
