import React, { useContext, useState, createRef } from "react";
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
import i1 from "../assets/pics/12-sterilisationsauklav/draussen.jpg";
import i2 from "../assets/pics/12-sterilisationsauklav/draussen_klein.jpg";
import i6 from "../assets/pics/achtung_rot.png";
import i4 from "../assets/pics/frage.png";
import i5 from "../assets/pics/achtung_gruen.png";
import i3 from "../assets/pics/12-sterilisationsauklav/draussen_loesung.jpg";
function Pers_schutz(props) {
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
      "Das autoklavierte Gut darf ich nur zusammen mit einem Kollegen entladen.",
      "Ich entnehme autoklaviertes Gut nur im abgekühlten Zustand, da es zu Siedeverzügen kommen könnte.",
      "Der Autoklav darf nur betrieben werden, wenn er einen Filter zur Nachbehandlung der Abluft enthält."
    ],
    answerBitValue: 6 // to complete exercise compare BitValue of radioGroupState and this answerBitValue
  };
  let contextRef = createRef(); // reference to instructions field
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
      document.addEventListener("mousedown", handleClickToReturnBack);
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
  };

  // add click event to document to return to other exercises and reset click events
  const handleClickToReturnBack = () => {
    document.removeEventListener("mousedown", handleClickToReturnBack);
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

  // if page refreshs go to Grundriss page
  //const path = props.location.pathname.split("/");
  //path.pop();
  //const r = path.join("/");
  //if (!my_exercise) props.history.push("/virtueles_labor/grundriss");

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
            <Grid.Column
              width={`${my_exercise && my_exercise.done ? 9 : 8}`}
              className="relative"
            >
              <Image
                src={i1}
                className="absolute"
                style={{ top: "0", left: "14px" }}
                floated="left"
              />
              <Transition
                visible={animationTrigger || (my_exercise && my_exercise.done)}
                animation="fade"
                duration={animationTrigger ? 700 : 0}
                className="absolute"
                floated="left"
              >
                <Image src={i3} />
              </Transition>
            </Grid.Column>
            <Grid.Column width={`${my_exercise && my_exercise.done ? 7 : 8}`}>
              <div className="relative fullHeight">
                <Transition
                  visible={my_exercise && !my_exercise.done}
                  animation="fade"
                  duration={animationTrigger ? 700 : 0}
                >
                  <div className="absolute" style={{ top: "4%", left: "4%" }}>
                    <div
                      className="gridList"
                      style={{ gridTemplateColumns: "auto auto" }}
                    >
                      <div>
                        <Image src={i2} />
                      </div>

                      <div
                        className="gridList"
                        style={{
                          width: "180px",
                          gridTemplateRows: "auto auto",
                          gridTemplateColumns: "auto"
                        }}
                      >
                        <Image src={i4} />

                        <h1
                          className="my_title small"
                          style={{ marginTop: "17px" }}
                        >
                          Ihr Kollege ist nun richtig gekleidet. Was müssen Sie
                          außerdem beachten, um den Autoklaven sicher zu
                          betreiben
                        </h1>
                      </div>
                    </div>

                    <Popup
                      className="warning"
                      hoverable={false}
                      trigger={
                        <div
                          className="exerciseContainer"
                          style={{ width: "390px" }}
                        >
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
                        Dieser Antwort war leider falsch!
                      </Popup.Header>
                      <Popup.Content>
                        <Image src={i6} centered />
                      </Popup.Content>
                    </Popup>
                    <div style={{ width: "330px" }}>
                      <p>
                        Weitere Informationen zu dieser Frage erhalten Sie in
                        der Technischen Regel Kapitel ÄNDERN!!!!
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
                    <div
                      className=" gridList "
                      style={{ width: "330px", columnGap: "30px" }}
                    >
                      <Image src={i5} />
                      <div>
                        <span className="my_title small">Sehr gut!</span>
                        <p style={{ marginTop: "5px" }}>
                          Um Siedeverzüge und das Herausschleudern von heißer
                          Flüssigkeit zu vermeiden, sollten Sie das
                          sterilisierte Gut nur im abgekühlten Zustand
                          entnehmen.
                        </p>
                        <p>
                          Außerdem muss bei biologischen Arbeitsstoffen ab der
                          Risikogruppe 2 die Abluft von Autoklaven, die in den
                          Arbeitsbereich zurückgeführt wird, gefiltert werden.
                        </p>
                      </div>
                    </div>

                    <div
                      style={{ position: "absolute", top: "0", right: "0" }}
                      onClick={() => isDone()}
                    >
                      Reset
                    </div>
                  </div>
                </Transition>
              </div>
              <button onClick={() => isDone()} style={{ marginTop: "20px" }}>
                RESET
              </button>
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

export default withRouter(Pers_schutz);
