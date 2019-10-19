import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";

function Buero() {
  const [tocState, setTocState] = useContext(TocContext);

  const isNewState = () => {
    if (!localStorage.getItem("labor_checklist_state")) {
      var id = tocState.activeMenuPage ? tocState.activeMenuPage.id : null;
      console.log(id);
      const dawd = { id: id, done: true };
      localStorage.setItem(
        "labor_checklist_state",
        JSON.stringify(...localStorage.getItem("labor_checklist_state"), dawd)
      );
    }
  };
  isNewState();
  return <Grid>awdawd</Grid>;
}

export default Buero;
