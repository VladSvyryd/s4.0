import React, { useContext, useState, useEffect } from "react";
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
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/5-druckgasflaschenschrank/exercise_pic.jpg";
import i2 from "../assets/pics/5-druckgasflaschenschrank/finish.jpg";
import i6 from "../assets/pics/achtung_rot.png";
import i4 from "../assets/pics/frage.png";
import i5 from "../assets/pics/achtung_gruen.png";
import i3 from "../assets/pics/5-druckgasflaschenschrank/finish_1.jpg";
import markNodeDone from "../util/externalFunctions";
import i_q from "../assets/pics/querverweis.png";

function Druckgasflasche(props) {
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
      "Druckgasflaschen müssen immer gegen Umfallen gesichert werden.",
      "In Laboratorien mit erhöhter Brandgefahr müssen Druckgasflaschen in Sicherheitsschränken aufbewahrt oder nach Arbeitsende entfernt werden.",
      "Das Laboratorium muss entsprechend gekennzeichnet sein."
    ],
    answerBitValue: 7 // to complete exercise compare BitValue of radioGroupState and this answerBitValue
  };
  const instructions = [
    "Klicken Sie die Aussagen an, die Ihrer Meinung nach zutreffen",
    "Klicken Sie auf eine beliebige Position, um in die vorherige Ansicht zu gelangen."
  ];

  // parse radioButtons from aufgabe object
  const generateRadioButtons = () => {
    return aufgabe.labels.map((radioButton, i) => {
      return (
        <Checkbox
          key={`radioButton-${i}`}
          name={"r" + i}
          label={radioButton}
          value={i > 0 ? i * 2 : 1}
          onChange={handleChange}
        />
      );
    });
  };

  // check if answerBitValue match bitValue of checkbox group ->
  //set state of exercise,
  //add click event to get back to other exercise
  const handleSubmit = () => {
    let sum = Object.values(radioGroupState).reduce(
      (accumulator, currentValue) => accumulator + currentValue
    );
    if ((sum & aufgabe.answerBitValue) === aufgabe.answerBitValue) {
      isDone();
      setAnimationTrigger(true);
    } else {
      setTrigger(true);
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
    props.history.goBack();
  };

  // reset state of current exercise
  const resetAllAnswers = () => {
    setRadioGroupState("this");
    removeClick();
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
    pagesFromLocalStorage.forEach(e => markNodeDone(my_exercise.id, e));

    // trigger tocPages function to resave Pages on local storage
    setTocPages(pagesFromLocalStorage);
    // change local state of exercise as done to trigger changes on the Page
    setMyExercise(old => ({
      ...old,
      done: !old.done
    }));
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
            <Grid.Column width="9" className="relative">
              <Image
                src={i1}
                className="absolute"
                style={{ top: "0", left: "13px" }}
              />
              <Transition
                visible={animationTrigger || (my_exercise && my_exercise.done)}
                animation="fade"
                duration={animationTrigger ? 700 : 0}
                className="absolute"
              >
                <Image src={i2} />
              </Transition>
            </Grid.Column>
            <Grid.Column width="7">
              <div className="relative fullHeight">
                <Transition
                  visible={my_exercise && !my_exercise.done}
                  animation="fade"
                  duration={animationTrigger ? 700 : 0}
                >
                  <div className="absolute" style={{ top: "13%" }}>
                    <div className="gridList" style={{ width: "300px" }}>
                      <h1 className="my_title small">
                        Welche Aussagen bezüglich Druckgasflaschen sind richtig?
                      </h1>
                      <Image src={i4} />
                    </div>
                    <Popup
                      className="warning"
                      trigger={
                        <div
                          className="exerciseContainer"
                          style={{ width: "300px" }}
                        >
                          {generateRadioButtons()}
                          <Button
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
                      onClose={() => setTrigger(false)}
                      open={triggerWarning}
                    >
                      <Popup.Header as="span" className="headerPop">
                        Diese Antwort war leider falsch!
                      </Popup.Header>
                      <Popup.Content>
                        <Image src={i6} centered />
                      </Popup.Content>
                    </Popup>
                    <div style={{ marginTop: "20px", width: "270px" }}>
                      <p>
                        Weitere Informationen zu dieser Frage erhalten Sie in
                        Kapitel {"  "}
                        <a
                          target="_blank"
                          href="../../fachinformation-responsiv/kapc/allgemeines_druck_aufstellen.htm"
                          className="externalLink"
                        >
                          <span className="linkContent">
                            <Image src={i_q} />C 6.2.1 Druckgasflaschen
                            aufstellen
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
                  <div className="absolute " style={{ top: "13%", left: "4%" }}>
                    <div className="gridList" style={{ width: "270px" }}>
                      <Image src={i5} />
                      <div>
                        <span className="my_title small">Richtig</span>
                        <p style={{ marginTop: "5px" }}>
                          Um eine Gefährdung durch Druckgasflaschen zu
                          vermeiden, sollten sie außerhalb des Labors oder in
                          Sicherheitsschränken aufbewahrt werden. Gasflaschen
                          müssen gegen Umfallen gesichert sein.
                        </p>
                      </div>
                    </div>
                    <Image src={i3} centered style={{ marginTop: "20px" }} />
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

export default withRouter(Druckgasflasche);
