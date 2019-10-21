import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";

function Buero() {
  const [tocState, setTocState] = useContext(TocContext);

  const isNewState = () => {
    if (!localStorage.getItem("labor_checklist_state")) {
      let activeExercise = tocState.activeMenuPage
        ? tocState.activeMenuPage
        : null;
      console.log("activeE");
      let { id } = activeExercise.node;
      const new_excercise = { id: id, done: true };
      localStorage.setItem(
        "labor_checklist_state",
        JSON.stringify(new_excercise)
      );
    }
  };

  return <Grid> {isNewState()}</Grid>;
}

export default Buero;
