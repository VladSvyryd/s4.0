import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  Grid,
  Checkbox,
  Button,
  Image,
  Popup,
  Transition,
} from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/9-waschbecken/waschbecken.jpg";
import i2 from "../assets/pics/9-waschbecken/waschbecken_richtig.jpg";
import i3 from "../assets/pics/achtung_rot.png";
import i4 from "../assets/pics/frage.png";
import i5 from "../assets/pics/achtung_gruen.png";
import markNodeDone from "../util/externalFunctions";
import i_q from "../assets/pics/querverweis.png";

function Waschbecken_garderobe_2(props) {
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
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [triggerWarning, setTrigger] = useState(false);
  const [radioGroupState, setRadioGroupState] = useState({
    r0: false,
    r1: false,
    r2: false,
    r3: false,
  });
  // label of radio buttons and answerIndex which is index in array of labels that is a right answer.

  const aufgabe = {
    labels: [
      "Händewaschen ist grundsätzlich hautbelastend. Ich reduziere es daher auf ein notwendiges Minimum.",
      "Ich wasche die Hände vor Arbeitsbeginn oder beim Betreten des Biolabors sorgfältig, um mögliche Verschmutzungen zu entfernen.",
      "Ich wasche meine Hände nur bei sichtbarer Verschmutzung.",
      "Ich wasche meine Hände, wenn ich Kontakt mit Gefahrstoffen hatte.",
    ],
    answerBitValue: 11, // to complete exercise compare BitValue of radioGroupState and this answerBitValue
  };
  const instructions = [
    "Klicken Sie die Aussagen an, die Ihrer Meinung nach zutreffen.",
    "Klicken Sie auf eine beliebige Position, um in die vorherige Ansicht zu gelangen.",
  ];

  // parse radioButtons from aufgabe object
  // each button gets value 1=> which is used ba evaluation, compare bit value of multiple radiobuttons
  const generateRadioButtons = () => {
    return aufgabe.labels.map((radioButton, i) => {
      let index = 0;
      if (i === 0) {
        index = 1;
      }
      if (i === 1) {
        index = 2;
      }
      if (i === 2) {
        index = 4;
      }
      if (i === 3) {
        index = 8;
      }

      return (
        <Checkbox
          key={`radioButton-${index}`}
          name={"r" + i}
          label={radioButton}
          value={index}
          onChange={handleChange}
          checked={radioGroupState[`r${i}`] === index}
        />
      );
    });
  };

  // check if answerBitValue match bitValue of checkbox group ->
  //set state of exercise,
  //add click event to get back to other exercise
  const handleSubmit = () => {
    console.log(radioGroupState);
    // get sum of objects values to get bitvalue of radio button group
    let sum = Object.values(radioGroupState).reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
    if (sum === aufgabe.answerBitValue) {
      isDone();
      setAnimationTrigger(true);
    } else {
      tryAgain();
    }
  };
  // handle change of radio button,
  const handleChange = (e, { name, value }) => {
    if (!radioGroupState[name]) {
      setRadioGroupState((old) => ({ ...old, [name]: value }));
    } else {
      setRadioGroupState((old) => ({ ...old, [name]: false }));
    }
    //console.log(radioGroupState);
  };
  // reset state of current exercise
  const resetAllAnswers = () => {
    setRadioGroupState({ r0: false, r1: false, r2: false, r3: false });
    setTrigger(false);
    removeClick();
  };
  // add click event to document to return to other exercises and reset click events
  const handleClickToReturnBack = () => {
    props.history.goBack();
  };

  // set up current exercise state and set click event to reset radio button states
  const tryAgain = (value) => {
    setTrigger(true);
    document.addEventListener("mousedown", resetAllAnswers);
  };
  // reset click event on document
  const removeClick = () => {
    document.removeEventListener("mousedown", resetAllAnswers);
  };

  // set exercise as done
  // get pages object from local storage, change with new state, trigger tocPages events to save pages object back to local storage
  function isDone() {
    // parse pages from local storage
    let pagesFromLocalStorage = JSON.parse(localStorage.getItem("pagesList"));
    // performe change of property "done" in JSON Exerciselist object
    pagesFromLocalStorage.forEach((e) => markNodeDone(my_exercise.id, e));

    // trigger tocPages function to resave Pages on local storage
    setTocPages(pagesFromLocalStorage);
    // change local state of exercise as done to trigger changes on the Page
    setMyExercise((old) => ({
      ...old,
      done: !old.done,
    }));
  }
  // check if any of radiobuttons are checked
  function checkRadioButtonsStatus() {
    let sum = Object.values(radioGroupState).reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
    return sum > 0 ? true : false;
  }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleClickToReturnBack]);
  return (
    <>
      <div className="exerciseFrame">
        <Grid style={{ width: "100%" }}>
          <Grid.Row columns="2">
            <Grid.Column width="8" className="relative">
              <Image
                src={i1}
                className="absolute"
                style={{ top: "0", left: "-2px" }}
              />
              <Transition
                visible={animationTrigger || (my_exercise && my_exercise.done)}
                animation="fade"
                duration={animationTrigger ? 700 : 0}
                className="absolute"
              >
                <Image src={i2} style={{ top: "0", left: "-16px" }} />
              </Transition>
            </Grid.Column>
            <Grid.Column width="8">
              <div className="relative fullHeight">
                <Transition
                  visible={my_exercise && !my_exercise.done}
                  animation="fade"
                  duration={animationTrigger ? 700 : 0}
                >
                  <div className="absolute" style={{ top: "13%" }}>
                    <div className="gridList" style={{ width: "390px" }}>
                      <h1 className="my_title small">
                        Wann genau müssen Sie sich bei Tätigkeiten im Biolabor
                        der Schutzstufe 2 die Hände waschen?
                      </h1>
                      <Image src={i4} />
                    </div>
                    <div
                      className="exerciseContainer"
                      style={{ width: "390px", marginTop: "20px" }}
                    >
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
                          Diese Antwort war leider falsch!
                        </Popup.Header>
                        <Popup.Content>
                          <Image src={i3} centered />
                        </Popup.Content>
                      </Popup>
                    </div>
                    <div style={{ marginTop: "15px", width: "370px" }}>
                      <p>
                        Weitere Informationen zu dieser Frage erhalten Sie in
                        Kapitel
                        <a
                          target="_blank"
                          href="../../fachinformation-responsiv/kapc/mikro_grundregeln.htm"
                          className="externalLink"
                        >
                          <span className="linkContent">
                            <Image src={i_q} />C 2.9 Mikrobiologische
                            Grundregeln
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
                  <div className="absolute " style={{ top: "13%" }}>
                    <div className="gridList" style={{ width: "270px" }}>
                      <Image src={i5} />
                      <div>
                        <span className="my_title small">Richtig</span>
                        <p style={{ marginTop: "5px" }}>
                          Händewaschen ist grundsätzlich hautbelastend. Deshalb
                          sollten Sie es auf ein notwendiges Minimum reduzieren
                          und der Händedesinfektion den Vorzug geben.{" "}
                        </p>
                        <p>
                          Sie waschen sich die Hände vor Beginn und nach
                          Beendigung der Arbeit, vor der Pause, nach dem
                          Toilettengang, bei Verschmutzungen und bei Kontakt mit
                          Gefahrstoffen.
                        </p>
                        <p>
                          Vergessen Sie nicht, die Hände regelmäßig mit einem
                          geeigneten Hautpflegeprodukt zu pflegen!
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

export default withRouter(Waschbecken_garderobe_2);
