import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Grid, Checkbox, Image, Popup, Transition } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/4-chemiekalienschrank/regal_mit_flasche.jpg";
import i2 from "../assets/pics/4-chemiekalienschrank/regal_ohne_flasche.jpg";
import i3 from "../assets/pics/achtung_rot.png";
import i4 from "../assets/pics/frage.png";
import i5 from "../assets/pics/achtung_gruen.png";
import markNodeDone from "../util/externalFunctions";

function Regal(props) {
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

  // label of radio buttons and answerIndex which is index in array of labels that is a right answer.
  const aufgabe = {
    labels: [
      "Ja, wenn der Behälter richtig verschlossen ist.",
      "Ja, in verschlossenen Originalgebinden.",
      "Nein, innerhalb des Laborraums müssen leicht entzündbare Flüssigkeiten über 1 l Nennvolumen im Sicherheitsschrank gelagert werden."
    ],
    answerIndex: 2
  };
  const instructions = [
    "Klicken Sie auf eine beliebige Position, um in die vorherige Ansicht zu gelangen.",
    "Klicken Sie die Aussage an, die Ihrer Meinung nach zutrifft"
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
            <Image src={i3} centered />
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
      document.addEventListener("mousedown", handleClickToReturnBack);
    }
  };
  // add click event to document to return to other exercises and reset click events
  const handleClickToReturnBack = () => {
    document.removeEventListener("mousedown", handleClickToReturnBack);
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
            <Grid.Column width="10" className="relative">
              <Image
                src={i1}
                className="absolute"
                style={{ top: "0", left: "15px" }}
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
            <Grid.Column width="6">
              <div className="relative fullHeight">
                <Transition
                  visible={my_exercise && !my_exercise.done}
                  animation="fade"
                  duration={animationTrigger ? 700 : 0}
                >
                  <div className="absolute" style={{ top: "13%" }}>
                    <div className="gridList" style={{ width: "300px" }}>
                      <h1 className="my_title small">
                        Dürfen Sie 2,5-l-Glasflaschen mit leicht entzündbaren
                        Flüssigkeiten im Regal am Arbeitsplatz lagern?
                      </h1>
                      <Image src={i4} />
                    </div>
                    <div
                      className="exerciseContainer"
                      style={{ width: "300px" }}
                    >
                      {generateRadioButtons()}
                    </div>
                    <div style={{ marginTop: "20px", width: "330px" }}>
                      <p>
                        Weitere Informationen zu dieser Frage erhalten Sie in
                        Kapitel ÄNDERN!!!!
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
                    <div
                      className=" gridList "
                      style={{ width: "270px", columnGap: "30px" }}
                    >
                      <Image src={i5} />
                      <div>
                        <span className="my_title small">Richtig</span>
                        <p style={{ marginTop: "5px" }}>
                          Bewahren Sie Behälter mit Gefahrstoffen nur so auf,
                          dass Sie sie sicher entnehmen und wieder abstellen
                          können.
                        </p>
                        <p>
                          Innerhalb des Labors müssen entzündbare Flüssigkeiten
                          über 1 | Nennvolumen an geschützter Stelle (im
                          Sicherheitsschrank) gelagert werden.
                          <button
                            onClick={() => isDone()}
                            style={{ background: "red" }}
                          >
                            RESET
                          </button>
                        </p>
                      </div>
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
            ? instructions[instructions.length - 2]
            : instructions[instructions.length - 1]}
        </span>
      </div>
    </>
  );
}

export default withRouter(Regal);
