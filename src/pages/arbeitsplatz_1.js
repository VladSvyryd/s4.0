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
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/10-arbeitsplatz/fenster_auf.jpg";
import i2 from "../assets/pics/10-arbeitsplatz/fenster_zu.jpg";
import i6 from "../assets/pics/achtung_rot.png";
import i4 from "../assets/pics/frage.png";
import i5 from "../assets/pics/achtung_gruen.png";

function Arbeitsplatz_1(props) {
  // state to go through active page
  const [tocState, setTocState] = useContext(TocContext);
  // load global state of tocPages
  const [tocPages, setTocPages] = useContext(PagesContext);
  // recieved exercise object as state from page with exercises
  // each Link to exercise has such params
  const [my_exercise, setMyExercise] = useState(
    props.location.state && props.location.state.currentExercise
  );
  const [radioGroupState, setRadioGroupState] = useState(" ");

  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [triggerWarning, setTrigger] = useState(false);
  // label of radio buttons and answerIndex which is index in array of labels that is a right answer.
  const aufgabe = {
    labels: [
      "Fenster sollten während der Arbeit fünf Minuten lang weit geöffnet werden, um für eine gute Durchlüftung zu sorgen.",
      "Fenster sind während der Arbeit mit biologischen Arbeitsstoffen geschlossen zu halten.",
      "Fenster sollten immer auf Kipp stehen, um für eine angemessene Belüftung während der gesamten Arbeit zu sorgen.",
      "Fenster müssen abgeschlossen werden, sie dürfen zu keiner Zeit geöffnet werden."
    ],
    answerIndex: 1 /// right answer index in array of questions
  };
  let contextRef = createRef(); // reference to instructions field
  const instructions = [
    "Klicken Sie die Aussage an, die Ihrer Meinung nach zutrifft",
    "Klicken Sie auf eine beliebige Position, um in die vorherige Ansicht zu gelangen."
  ];
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

    // go throught all subpages of active page, search for same ID, change status of exercise to done: true
    pagesFromLocalStorage[tocState.activeMenu].firstLayer.map(e => {
      let result = e;
      if (e.secondLayer.id == my_exercise.secondLayer.id) {
        e.done = !e.done;
        result = e;
      }
      return result;
    });
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
            <Grid.Column width="8" className="relative">
              <Image
                src={i1}
                className="absolute"
                style={{ top: "0", left: "15px" }}
                floated="left"
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
            <Grid.Column width="8">
              <div
                className="relative fullHeight"
                style={{ paddingLeft: "15px" }}
              >
                <Transition
                  visible={my_exercise && !my_exercise.done}
                  animation="fade"
                  duration={animationTrigger ? 700 : 0}
                >
                  <div className="absolute" style={{ top: "11%" }}>
                    <div className="gridList" style={{ width: "390px" }}>
                      <h1 className="my_title small">
                        Dürfen Sie in einem Labor der Schutzstufe 2 die Fenster
                        öffnen?
                      </h1>
                      <Image src={i4} />
                    </div>
                    <p>
                      <b> Kreuzen Sie die richtigen Antworten an.</b>
                    </p>
                    <div
                      className="exerciseContainer"
                      style={{ width: "300px", marginTop: "20px" }}
                    >
                      {generateRadioButtons()}
                    </div>
                    <div style={{ marginTop: "20px", width: "330px" }}>
                      <p>
                        Hier erhalten Sie weitere Informationen zur Frage:
                        ÄNDERN!!!!
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
                      style={{ width: "390px", columnGap: "30px" }}
                    >
                      <Image src={i5} />
                      <div>
                        <span className="my_title small">Richtig!</span>
                        <p style={{ marginTop: "5px" }}>
                          Damit es durch einen Luftzug nicht zu einer
                          Verbreitung von Aerosolen kommt, müssen Fenster und
                          Türen während der Arbeit mit biologischen
                          Arbeitsstoffen geschlossen bleiben.
                        </p>
                        <p>
                          Erst wenn die biologischen Arbeitsstoffe sicher
                          verwahrt und alle Arbeitsmittel gereinigt und
                          desinfiziert wurden, dürfen die Fenster geöffnet
                          werden.
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
        <strong ref={contextRef}></strong>
      </div>
      <Popup
        basic
        context={contextRef}
        content={
          my_exercise && my_exercise.done
            ? instructions[instructions.length - 1]
            : instructions[instructions.length - 2]
        }
        position="top center"
        className="instructionsPopup"
        open
      />
    </>
  );
}

export default withRouter(Arbeitsplatz_1);
