import React, { useContext, useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { Grid, Icon, Image } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import reducer from "../util/reducer";
import i1 from "../assets/pics/2-chemielaboreingang/start_grau.jpg";

function Ringang_chem_labor_second(props) {
  const [my_exercise] = useState(props.currentExercise);
  return (
    <div className="exerciseFrame">
      <div> Exercise 2</div>
      {my_exercise.done ? <div>I am Done</div> : <div>I am not Done</div>}
      <div onClick={() => props.backToParent(0)}>Back</div>
      <div onClick={() => props.save(my_exercise.secondLayer.id)}>Done</div>
    </div>
  );
}

export default Ringang_chem_labor_second;
