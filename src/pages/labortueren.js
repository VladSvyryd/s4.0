import React, { useContext, useState, useEffect, useReducer } from "react";
import { Grid, Icon, Image } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import reducer from "../util/reducer";
import i1 from "../assets/pics/2-chemielaboreingang/start_grau.jpg";

function Labortueren(props) {
  if (props.location.state) {
    console.log("props", props.location.state);
  }
  const [tocPages] = useContext(PagesContext);
  const [tocState, setTocState] = useContext(TocContext);
  const [exercise, saveExerciseState] = useReducer(
    reducer,
    tocPages[tocState.activeMenu]
  );
  const saveExercise = () => {
    saveExerciseState({ type: "done", payload: exercise });
  };

  const [currentExercisesStateList, setCurrentExercisesStateList] = useState(
    props.location.state.node
  );
  console.log(currentExercisesStateList);

  return "dawdawdawdadada";
}

export default Labortueren;
