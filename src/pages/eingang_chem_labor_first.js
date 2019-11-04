import React, { useContext, useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { Grid, Icon, Image } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import reducer from "../util/reducer";
import i1 from "../assets/pics/2-chemielaboreingang/tuer_btn_falsch.jpg";
import i2 from "../assets/pics/2-chemielaboreingang/tuer_btn_richtig.jpg";
import i3 from "../assets/pics/2-chemielaboreingang/tuer_richtig.jpg";

function Ringang_chem_labor_first(props) {
  const [my_exercise] = useState(props.currentExercise);
  return (
    <div className="exerciseFrame">
      <div> Exercise 1</div>
      {my_exercise.done ? <div>I am Done</div> : <div>I am not Done</div>}

      <div onClick={() => props.backToParent(0)}></div>
      <div onClick={() => props.save(my_exercise.secondLayer.id)}>Done</div>
    </div>
  );
}

export default Ringang_chem_labor_first;
