import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Grid, Checkbox, Image, Popup, Transition } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/2-chemielaboreingang/tuer_loesung.jpg";
import i2 from "../assets/pics/2-chemielaboreingang/tuer_aufgabe.jpg";
import i3 from "../assets/pics/achtung_rot.png";
import i4 from "../assets/pics/frage.png";
import i5 from "../assets/pics/achtung_gruen.png";

function Ringang_chem_labor_first(props) {
  // state to go through active page
  const [tocState, setTocState] = useContext(TocContext);
  // load global state of tocPages
  const [tocPages, setTocPages] = useContext(PagesContext);

  const [my_exercise, setMyExercise] = useState(
    props.location.state && props.location.state.currentExercise
  );
  const result = "three";
  const [radioGroupState, setRadioGroupState] = useState("this");
  const handleChange = (e, { value }) => {
    if (value !== result) {
      tryAgain(value);
    } else {
      isDone();
      setRadioGroupState(value);
      document.addEventListener("mousedown", handleClickToReturnBack);
    }
    //setRadioGroupState(value);
  };
  const handleClickToReturnBack = () => {
    document.removeEventListener("mousedown", handleClickToReturnBack);
    props.history.goBack();
  };
  const handleClickOutside = () => {
    setRadioGroupState("this");
    removeClick();
  };
  const tryAgain = value => {
    setRadioGroupState(value);
    document.addEventListener("mousedown", handleClickOutside);
  };
  const removeClick = () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
  // if refresh go to Grundriss page
  const path = props.location.pathname.split("/");
  var remove_last = path.pop();
  const r = path.join("/");
  if (!my_exercise) props.history.push("/virtueles_labor/grundriss");

  function isDone() {
    let pagesFromLocalStorage = JSON.parse(localStorage.getItem("pagesList"));

    pagesFromLocalStorage[tocState.activeMenu].firstLayer.map(e => {
      let result = e;
      if (e.secondLayer.id == my_exercise.secondLayer.id) {
        e.done = !e.done;
        result = e;
      }
      return result;
    });
    setTocPages(pagesFromLocalStorage);
    setMyExercise(old => ({
      ...old,
      done: !old.done
    }));
  }

  return (
    <div className="exerciseFrame">
      <Grid style={{ width: "100%" }}>
        <Grid.Row columns="2">
          <Grid.Column width="9" className="relative">
            {my_exercise && !my_exercise.done ? (
              <Image
                src={i2}
                className="absolute"
                style={{ top: "0", left: "15px" }}
              />
            ) : (
              <Image
                src={i1}
                className="absolute"
                style={{ top: "0", left: "15px" }}
              />
            )}

            <Transition
              visible={radioGroupState === "three"}
              animation="fade"
              duration={500}
            >
              <Image
                src={i1}
                className="absolute"
                style={{ top: "0", left: "15px" }}
              />
            </Transition>
          </Grid.Column>
          <Grid.Column width="7" verticalAlign="middle">
            {my_exercise && !my_exercise.done ? (
              <div>
                <div className="gridList" style={{ width: "300px" }}>
                  <h1 className="my_title small">
                    Entspricht diese Tür den Anforderungen der Technischen
                    Regeln für Gefahrstoffe?
                  </h1>
                  <Image src={i4} />
                </div>
                <div className="exerciseContainer" style={{ width: "300px" }}>
                  <Popup
                    className="warning"
                    trigger={
                      <Checkbox
                        label="Ja, die Tür ist in Ordnung."
                        value="one"
                        onChange={handleChange}
                        checked={radioGroupState === "one"}
                      />
                    }
                    offset="0, 25px"
                    position="left center"
                    open={radioGroupState === "one"}
                  >
                    <Popup.Header as="span" className="headerPop">
                      Dieser Antwort war leider falsch!
                    </Popup.Header>
                    <Popup.Content>
                      <Image src={i3} centered />
                    </Popup.Content>
                  </Popup>
                  <Popup
                    className="warning"
                    trigger={
                      <Checkbox
                        label="Nein, denn die Labortür ist nicht breit genug."
                        value="two"
                        checked={radioGroupState === "two"}
                        onChange={handleChange}
                      />
                    }
                    offset="0, 25px"
                    position="left center"
                    open={radioGroupState === "two"}
                  >
                    <Popup.Header as="span" className="headerPop">
                      Dieser Antwort war leider falsch!
                    </Popup.Header>
                    <Popup.Content>
                      <Image src={i3} centered />
                    </Popup.Content>
                  </Popup>

                  <Checkbox
                    label="Nein, denn Labortüren müssen eine Sichtverbindung nach innen und nach außen haben."
                    value="three"
                    checked={radioGroupState === "three"}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ marginTop: "20px", width: "330px" }}>
                  <p>
                    Die TRGS 526 „Laboratorien“ und die BGI/GUV-I 850-0
                    „Sicheres Arbeiten in Laboratorien“ schreiben zu Ihrer
                    eigenen Sicherheit bestimmte bauliche Maßnahmen bei der
                    Einrichtung eines Laborraums vor.
                  </p>
                  <p>
                    Weitere Informationen zu dieser Frage erhalten Sie in
                    Kapitel ÄNDERN!!!!
                  </p>
                </div>
              </div>
            ) : (
              <div className="gridList" style={{ width: "270px" }}>
                <Image src={i5} />
                <div>
                  <h1 className="my_title small">Richtig</h1>
                  <p>
                    Labortüren müssen eine Sichtverbindung nach innen und nach
                    außen haben.
                  </p>
                </div>
              </div>
            )}
            <button onClick={() => isDone()} style={{ marginTop: "20px" }}>
              RESET
            </button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default withRouter(Ringang_chem_labor_first);
