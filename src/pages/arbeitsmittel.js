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
import i1 from "../assets/pics/11-sicherheitswerkbank/arbeitsmittel.jpg";
import i6 from "../assets/pics/achtung_rot.png";
import i4 from "../assets/pics/frage.png";
import i5 from "../assets/pics/achtung_gruen.png";
import i3 from "../assets/pics/11-sicherheitswerkbank/arbeitsmittel_ok.jpg";
import markNodeDone from "../util/externalFunctions";

function Arbeitsmittel(props) {
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
    r2: false,
    r3: false
  });
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [triggerWarning, setTrigger] = useState(false);
  // label of radio buttons and answerIndex which is index in array of labels that is a right answer.
  const aufgabe = {
    labels: [
      "Es dürfen so viele Arbeitsmittel abgestellt werden, wie es der Raum in der Sicherheitswerkbank zulässt. ",
      "Beim Pipettieren sollte ein Abfallbehälter für gebrauchte Pipetten bereitgestellt werden.",
      "Es dürfen nur die unbedingt notwendigen Arbeitsmittel in die Sicherheitswerkbank gestellt werden.",
      "Nur die Arbeitsmittel, die der Beschäftigte bei der Arbeit in der Hand hält, dürfen mit in die Sicherheitswerkbank genommen werden."
    ],
    answerBitValue: 6 // to complete exercise compare BitValue of radioGroupState and this answerBitValue
  };
  const instructions = [
    "Klicken Sie die Aussagen an, die Ihrer Meinung nach zutreffen",
    "Klicken Sie auf eine beliebige Position, um in die vorherige Ansicht zu gelangen."
  ];
  // if exercise has been already done, go back
  useEffect(() => {
    if (my_exercise.done)
      document.addEventListener("mousedown", handleClickToReturnBack);
    return () => {
      document.removeEventListener("mousedown", handleClickToReturnBack);
    }
  }, [])
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
    console.log(radioGroupState);
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
  // if (!my_exercise) props.history.push("/virtueles_labor/grundriss");

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
            <Grid.Column width="9" className="relative">
              <Image
                src={i1}
                className="absolute"
                style={{ top: "55px", left: "0px" }}
              />
              <Transition
                visible={animationTrigger || (my_exercise && my_exercise.done)}
                animation="fade"
                duration={animationTrigger ? 700 : 0}
                className="absolute"
              >
                <Image
                  src={i3}
                  className="absolute"
                  style={{
                    top: "0",
                    left: "0",
                    maxWidth: "942px",
                    width: "942px"
                  }}
                />
              </Transition>
            </Grid.Column>
            <Grid.Column width="7">
              <div
                className="relative fullHeight"
                style={{ paddingLeft: "10px" }}
              >
                <Transition
                  visible={my_exercise && !my_exercise.done}
                  animation="fade"
                  duration={animationTrigger ? 700 : 0}
                >
                  <div
                    className="absolute"
                    style={{
                      top: "7%"
                    }}
                  >
                    <div className="gridList" style={{ width: "360px" }}>
                      <h1 className="my_title small">
                        Welche Geräte und Materialien dürfen sich während der
                        Arbeit in der Sicherheitswerkbank befinden?
                      </h1>
                      <Image src={i4} />
                    </div>
                    <Popup
                      className="warning"
                      hoverable={false}
                      trigger={
                        <div
                          className="exerciseContainer"
                          style={{ width: "360px" }}
                        >
                          {generateRadioButtons()}
                          <Button
                            disabled={!checkRadioButtonsStatus()}
                            type="submit"
                            compact
                            style={{ margin: "20px 30px 5px 30px" }}
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
                    <div style={{ marginTop: "20px", width: "330px" }}>
                      <p>
                        Weitere Informationen zu dieser Frage erhalten Sie in
                        der Kapitel ÄNDERN!!!!
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
                  <div
                    className="absolute "
                    style={{ top: "9%", left: "-370px" }}
                  >
                    <div
                      className=" gridList "
                      style={{ width: "570px", columnGap: "30px" }}
                    >
                      <Image src={i5} />
                      <div>
                        <span className="my_title small">Richtig!</span>
                        <p style={{ marginTop: "5px" }}>
                          Die Arbeitsflächen dürfen nicht überfüllt werden. Nur
                          so kann die Sicherheitswerkbank sicher schützen und
                          Ihre Arbeit wird nicht durch unnötige Arbeitsmittel
                          gefährdet.
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

export default withRouter(Arbeitsmittel);
