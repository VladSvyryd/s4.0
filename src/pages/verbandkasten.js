import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { TocContext } from "../util/TocProvider";
import {
  Grid,
  Checkbox,
  Popup,
  Button,
  Image,
  Transition
} from "semantic-ui-react";
import markNodeDone from "../util/externalFunctions";

import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/3-rettungseinrichtungen/verbandkasten_frage.png";
import i6 from "../assets/pics/achtung_rot.png";
import i4 from "../assets/pics/frage.png";
import i5 from "../assets/pics/achtung_gruen.png";
import i3 from "../assets/pics/3-rettungseinrichtungen/verbandkasten_leosung.png";
import i_q from "../assets/pics/querverweis.png";

function Verbandkasten(props) {
  // state to go through active page
  const [tocState] = useContext(TocContext);
  // load global state of tocPages
  const [, setTocPages] = useContext(PagesContext);
  // recieved exercise object as state from page with exercises
  // each Link to exercise has such params
  const [my_exercise, setMyExercise] = useState(
    (props.location.state && props.location.state.currentExercise) ||
      tocState.currentExerciseByPath
  );
  const [radioGroupState, setRadioGroupState] = useState({
    r0: false,
    r1: false,
    r2: false
  });
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [triggerWarning, setTrigger] = useState(false);
  // label of radio buttons and answerIndex which is index in array of labels that is a right answer.
  const aufgabe = {
    labels: [
      "Ein Verbandkasten muss grundsätzlich die vorgeschriebene Menge an Verbandmaterial und Hilfsmittel enthalten. ",
      "Medikamente wie z.B. Schmerztabletten sollten nicht darin aufbewahrt werden.",
      "Wenn mit akut toxischen Stoffen umgegangen wird, muss der Verbandkasten ggf. auch das jeweilige Gegenmittel enthalten. (u. U. unter Verschluss)"
    ],
    answerBitValue: 7 // to complete exercise compare BitValue of radioGroupState and this answerBitValue
  };
  const instructions = [
    "Klicken Sie die Aussagen an, die Ihrer Meinung nach zutreffen!",
    "Klicken Sie auf eine beliebige Position, um in die vorherige Ansicht zu gelangen."
  ];
  // parse radioButtons from aufgabe object
  // each button gets value 1=> which is used ba evaluation, compare bit value of multiple radiobuttons
  const generateRadioButtons = () => {
    return aufgabe.labels.map((radioButton, i) => {
      return (
        <Checkbox
          key={`radioButton-${i}`}
          name={"r" + i}
          label={radioButton}
          value={i > 0 ? i * 2 : 1}
          onChange={handleChange}
          checked={radioGroupState[`r${i}`] === (i > 0 ? i * 2 : 1)}
        />
      );
    });
  };

  // check if answerBitValue match bitValue of checkbox group ->
  //set state of exercise,
  //add click event to get back to other exercise
  const handleSubmit = () => {
    // get sum of objects values to get bitvalue of radio button group
    let sum = Object.values(radioGroupState).reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
    if ((sum & aufgabe.answerBitValue) === aufgabe.answerBitValue) {
      isDone();
      setAnimationTrigger(true);
      document
        .getElementById("panel")
        .addEventListener("mousedown", handleClickToReturnBack);
    } else {
      tryAgain();
    }
  };
  // handle change of radio button,
  const handleChange = (e, { name, value }) => {
    if (!radioGroupState[name]) {
      setRadioGroupState(old => ({ ...old, [name]: value }));
    } else {
      setRadioGroupState(old => ({ ...old, [name]: false }));
    }
    console.log(radioGroupState);
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
    setRadioGroupState({ r0: false, r1: false, r2: false });
    setTrigger(false);
    removeClick();
  };
  // set up current exercise state and set click event to reset radio button states
  const tryAgain = value => {
    setTrigger(true);
    document.addEventListener("mousedown", resetAllAnswers);
  };
  // reset click event on document
  const removeClick = () => {
    document.removeEventListener("mousedown", resetAllAnswers);
  };

  // check if any of radiobuttons are checked
  function checkRadioButtonsStatus() {
    let sum = Object.values(radioGroupState).reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
    return sum > 0 ? true : false;
  }

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
            <Grid.Column width="10" className="relative">
              <Image
                src={i1}
                className="absolute"
                style={{ top: "23px", left: "40px" }}
                centered
              />
              <Transition
                visible={animationTrigger || (my_exercise && my_exercise.done)}
                animation="fade"
                duration={animationTrigger ? 700 : 0}
                className="absolute"
                floated="left"
              >
                <Image
                  src={i3}
                  className="absolute"
                  style={{ top: "23px", left: "40px" }}
                  centered
                />
              </Transition>
            </Grid.Column>
            <Grid.Column width="6">
              <div className="relative fullHeight">
                <Transition
                  visible={my_exercise && !my_exercise.done}
                  animation="fade"
                  duration={animationTrigger ? 700 : 0}
                >
                  <div
                    className="absolute"
                    style={{ top: "4%", left: "4%", maxWidth: "300px" }}
                  >
                    <div
                      className="gridList"
                      style={{ gridTemplateColumns: "auto auto" }}
                    >
                      <div>
                        <h1 className="my_title small">
                          Dieser Verbandkasten ist nicht vollständig.
                        </h1>
                        <h1 className="my_title small">
                          Kreuzen Sie an, welche Aussage Ihrer Meinung nach
                          richtig ist?
                        </h1>
                      </div>
                      <Image src={i4} />
                    </div>

                    <Popup
                      className="warning"
                      hoverable={false}
                      trigger={
                        <div className="exerciseContainer">
                          {generateRadioButtons()}
                          <Button
                            disabled={!checkRadioButtonsStatus()}
                            type="submit"
                            compact
                            style={{ margin: "20px 30px" }}
                            onClick={() => handleSubmit()}
                          >
                            Auswertung
                          </Button>
                        </div>
                      }
                      offset="0, 25px"
                      position="left center"
                      open={triggerWarning}
                    >
                      <Popup.Header as="span" className="headerPop">
                        Diese Antwort war leider falsch!
                      </Popup.Header>
                      <Popup.Content>
                        <Image src={i6} centered />
                      </Popup.Content>
                    </Popup>
                    <div>
                      <p>
                        Weitere Informationen zu dieser Frage erhalten Sie in
                        der Technischen Regel Kapitel {"  "}
                        <a
                          target="_blank"
                          href="../../fachinformation-responsiv/kapb/erste_hilfe_einrichtungen.htm"
                          className="externalLink"
                        >
                          <span className="linkContent">
                            <Image src={i_q} />B 4.5 Erste-Hilfe-Einrichtungen
                          </span>
                        </a>
                      </p>
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
                  <div className="absolute " style={{ top: "33%" }}>
                    <div className="gridList" style={{ maxWidth: "280px" }}>
                      <Image src={i5} />
                      <div>
                        <span className="my_title small">Sehr gut!</span>
                        <p style={{ marginTop: "5px" }}>
                          Verbandkästen dienen der Ersten Hilfe. Deshalb sollten
                          sie immer vollständig gefüllt sein.
                        </p>
                      </div>
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

export default withRouter(Verbandkasten);
