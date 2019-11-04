import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Grid, Icon, Image } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/2-chemielaboreingang/tuer_loesung.jpg";
import i2 from "../assets/pics/2-chemielaboreingang/tuer_aufgabe.jpg";
import i3 from "../assets/pics/fragezeichen_neu.png";

function Ringang_chem_labor_first(props) {
  // state to go through active page
  const [tocState, setTocState] = useContext(TocContext);
  // load global state of tocPages
  const [tocPages, setTocPages] = useContext(PagesContext);

  const [my_exercise, setMyExercise] = useState(
    props.location.state && props.location.state.currentExercise
  );
  const path = props.location.pathname.split("/");
  var remove_last = path.pop();
  const r = path.join("/");
  if (!my_exercise) props.history.push("/virtueles_labor/grundriss");
  function done() {
    let pagesFromLocalStorage = JSON.parse(localStorage.getItem("pagesList"));

    pagesFromLocalStorage[tocState.activeMenu].firstLayer.map(e => {
      let result = e;
      if (e.secondLayer.id == my_exercise.secondLayer.id) {
        e.done = true;
        result = e;
      }
      return result;
    });
    setTocPages(pagesFromLocalStorage);
    setMyExercise(old => ({
      ...old,
      done: true
    }));
  }

  return (
    <div className="exerciseFrame">
      <Grid style={{ width: "100%" }}>
        <Grid.Row columns="2">
          <Grid.Column width="9">
            {my_exercise && my_exercise.done ? (
              <Image src={i1} />
            ) : (
              <Image src={i2} />
            )}
          </Grid.Column>
          <Grid.Column width="7">
            <div>
              <h1 className="my_title small">
                {" "}
                Entspricht diese Tür den Anforderungen der Technischen Regeln
                für Gefahrstoffe?
              </h1>
              <Image src={i3} />
            </div>
            <div onClick={() => done()}>Done</div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default withRouter(Ringang_chem_labor_first);
