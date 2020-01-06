import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { TocContext } from "../util/TocProvider";
import { Grid, Checkbox, Popup, Image, Transition } from "semantic-ui-react";
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/6-apparaturen/hebebühne_schema.jpg";

import i3 from "../assets/pics/6-apparaturen/hebebühne_antwort1.jpg";
import i7 from "../assets/pics/6-apparaturen/hebebühne_antwort2.jpg";

import i6 from "../assets/pics/achtung_rot.png";
import i4 from "../assets/pics/frage.png";
import i5 from "../assets/pics/achtung_gruen.png";
import markNodeDone from "../util/externalFunctions";
import i_q from "../assets/pics/querverweis.png";

function Hebebuehne(props) {
  // state to go through active page
  const [tocState, setTocState] = useContext(TocContext);
  // load global state of tocPages
  const [tocPages, setTocPages] = useContext(PagesContext);
  // recieved exercise object as state from page with exercises
  // each Link to exercise has such params
  const [my_exercise, setMyExercise] = useState(
    (props.location.state && props.location.state.currentExercise) ||
      tocState.currentExerciseByPath
  );
  const [radioGroupState, setRadioGroupState] = useState(" ");

  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [triggerWarning, setTrigger] = useState(false);
  // label of radio buttons and answerIndex which is index in array of labels that is a right answer.
  const aufgabe = {
    labels: ["Anordnung 1", "Anordnung 2"],
    answerIndex: 0 /// right answer index in array of questions
  };
  const instructions = [
    "Wählen Sie die Befestigung des Heiztopfes, die Ihrer Meinung nach richtig ist!",
    "Klicken Sie auf eine beliebige Position, um in die vorherige Ansicht zu gelangen."
  ];
  // if exercise has been already done, go back
  useEffect(() => {
    if (my_exercise.done)
      document
        .getElementById("panel")
        .addEventListener("mousedown", handleClickToReturnBack);
    return () => {
      document
        .getElementById("panel")
        .removeEventListener("mousedown", handleClickToReturnBack);
    };
  }, []);
  // parse radioButtons from aufgabe object
  const generateRadioButtons = () => {
    return aufgabe.labels.map((radioButton, i) => {
      return i !== aufgabe.answerIndex ? (
        <Popup
          key={`${radioButton}-${i}`}
          className="warning"
          trigger={
            <Checkbox
              label={radioButton}
              value={i}
              onChange={handleChange}
              checked={radioGroupState === i}
            />
          }
          offset="0, 25px"
          position="left center"
          open={radioGroupState === i}
        >
          <Popup.Header as="span" className="headerPop">
            Dieser Antwort war leider falsch!
          </Popup.Header>
          <Popup.Content>
            <Image src={i6} centered />
          </Popup.Content>
        </Popup>
      ) : (
        <Checkbox
          key={`${radioButton}-${i}`}
          label={radioButton}
          value={i}
          checked={radioGroupState === i}
          onChange={handleChange}
        />
      );
    });
  };

  // handle change of radio button,
  //set state of exercise,
  //add click event to get back to other exercise
  const handleChange = (e, { value }) => {
    if (value !== aufgabe.answerIndex) {
      tryAgain(value);
    } else {
      isDone();
      setRadioGroupState(value);
      setAnimationTrigger(true);
      document
        .getElementById("panel")
        .addEventListener("mousedown", handleClickToReturnBack);
    }
  };
  // add click event to document to return to other exercises and reset click events
  const handleClickToReturnBack = () => {
    document
      .getElementById("panel")
      .removeEventListener("mousedown", handleClickToReturnBack);
    props.history.goBack();
  };

  // reset state of current exercise
  const resetAllAnswers = () => {
    setRadioGroupState("this");
    removeClick();
  };
  // set up current exercise state and set click event to reset radio button states
  const tryAgain = value => {
    setRadioGroupState(value);
    document.addEventListener("mousedown", resetAllAnswers);
  };
  // reset click event on document
  const removeClick = () => {
    document.removeEventListener("mousedown", resetAllAnswers);
  };
  // if page refreshs go to Grundriss page
  const path = props.location.pathname.split("/");
  path.pop();
  const r = path.join("/");
  if (!my_exercise) props.history.push("/virtueles_labor/grundriss");

  // set exercise as done
  // get pages object from local storage, change with new state, trigger tocPages events to save pages object back to local storage
  function isDone() {
    // parse pages from local storage
    let pagesFromLocalStorage = JSON.parse(localStorage.getItem("pagesList"));
    // performe change of property "done" in JSON Exerciselist object
    pagesFromLocalStorage.forEach(e => markNodeDone(my_exercise.id, e));

    // trigger tocPages function to resave Pages on local storage
    setTocPages(pagesFromLocalStorage);
    // change local state of exercise as done to trigger changes on the Page
    setMyExercise(old => ({
      ...old,
      done: !old.done
    }));
  }

  return (
    <>
      <div className="exerciseFrame">
        <Grid style={{ width: "100%" }}>
          <Grid.Row columns="2">
            <Grid.Column width="5" className="relative">
              <Image
                src={i1}
                className="absolute"
                style={{ top: "50px", left: "60px" }}
                floated="left"
              />
              <div className="absolute" style={{ top: "35%", left: "60px" }}>
                <div className="gridList" style={{ width: "200px" }}>
                  <div>
                    <h1 className="my_title small">
                      Nur ein Versuchs&shy;aufbau ist richtig.
                    </h1>
                    <h1 className="my_title small">Entscheiden Sie sich.</h1>
                  </div>

                  <Image src={i4} />
                </div>

                <div style={{ marginTop: "20px", width: "200px" }}>
                  <p>
                    Weitere Informationen zu dieser Frage erhalten Sie in
                    Kapitel {"  "}
                    <a
                      target="_blank"
                      href="../../fachinformation-responsiv/kapc/einleitung_apparaturen.htm"
                      className="externalLink"
                    >
                      <span className="linkContent">
                        <Image src={i_q} />C 3.1 Aufbau von Apparaturen
                      </span>
                    </a>
                    <a
                      target="_blank"
                      href="../../fachinformation-responsiv/kapc/beheizen_apparaturen.htm"
                      className="externalLink"
                    >
                      <span className="linkContent">
                        <Image src={i_q} />C 5.2.2 Beheizen von Apparaturen
                      </span>
                    </a>
                  </p>
                </div>
              </div>
              <Transition
                visible={animationTrigger || (my_exercise && my_exercise.done)}
                animation="fade"
                duration={animationTrigger ? 700 : 0}
                className="absolute"
              >
                <div
                  className="absolute"
                  style={{
                    top: "35%",
                    left: "60px",
                    width: "300px",
                    height: "210px",
                    backgroundColor: "white"
                  }}
                >
                  <div className="gridList" style={{ columnGap: "15px" }}>
                    <Image src={i5} />
                    <div>
                      <span className="my_title small">Richtig!</span>
                      <p style={{ marginTop: "5px" }}>
                        Achten Sie darauf, dass Heizbäder leicht und gefahrlos
                        von der Apparatur getrennt werden können.
                      </p>
                      <p>
                        Dies kann beispielsweise durch die Verwendung einer
                        Hebebühne geschehen.
                      </p>
                    </div>
                  </div>
                </div>
              </Transition>
            </Grid.Column>
            <Grid.Column width="11">
              <div
                className="relative fullHeight"
                style={{ paddingLeft: "15px", paddingTop: "20px" }}
              >
                <Transition
                  visible={my_exercise && !my_exercise.done}
                  animation="fade"
                  duration={animationTrigger ? 700 : 0}
                >
                  <div
                    className="exerciseContainer"
                    style={{ marginTop: "20px" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around"
                      }}
                    >
                      <Image src={i3} />
                      <Image src={i7} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around"
                      }}
                    >
                      {generateRadioButtons()}
                    </div>
                  </div>
                </Transition>
                <Transition
                  as="div"
                  visible={
                    animationTrigger || (my_exercise && my_exercise.done)
                  }
                  animation="fade"
                  duration={animationTrigger ? 700 : 0}
                >
                  <div
                    className="absolute "
                    style={{ top: "13%", left: "33%" }}
                  >
                    <Image src={i3} />

                    <div
                      style={{ position: "absolute", top: "0", right: "0" }}
                      onClick={() => isDone()}
                    >
                      Reset
                    </div>
                  </div>
                </Transition>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <div className="instructionsField">
        <span>
          {my_exercise && my_exercise.done
            ? instructions[instructions.length - 1]
            : instructions[instructions.length - 2]}
        </span>
      </div>
    </>
  );
}

export default withRouter(Hebebuehne);
