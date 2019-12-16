import React, { useContext, useState, useEffect, useReducer } from "react";
import { Link, withRouter } from "react-router-dom";
import { Grid, Checkbox, Image, Popup, Transition } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i3 from "../assets/pics/frage.png";
import i1 from "../assets/pics/2-chemielaboreingang/ventil.jpg";
import i2 from "../assets/pics/2-chemielaboreingang/ventil_richtig.jpg";
import i4 from "../assets/pics/2-chemielaboreingang/ventil_bild.jpg";
import i5 from "../assets/pics/2-chemielaboreingang/monteur_comes.png";
import i7 from "../assets/pics/2-chemielaboreingang/monteur.png";
import i8 from "../assets/pics/achtung_gruen.png";
import i6 from "../assets/pics/2-chemielaboreingang/ventil_bild_richtig.jpg";

function Augennotdusche(props) {
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
      "Wenn im Labor noch eine zweite Notdusche montiert ist, brauche ich gar nichts zu unternehmen. ",
      "Wenn im Labor noch eine zweite Notdusche montiert ist, brauche ich gar nichts zu unternehmen. ",
      "Ich verständige den Vorgesetzten und sorge dafür, dass eine Reparatur veranlasst wird und entsprechend gefährliche Arbeiten unterbleiben."
    ],
    answerIndex: 2
  };
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
      startSequence();
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
    pagesFromLocalStorage.forEach(e => findNode(my_exercise.id, e));

    // trigger tocPages function to resave Pages on local storage
    setTocPages(pagesFromLocalStorage);
    // change local state of exercise as done to trigger changes on the Page
    setMyExercise(old => ({
      ...old,
      done: !old.done
    }));
  }
  function findNode(currentExerciseId, currentNode) {
    var i, currentChild, result;

    if (currentExerciseId == currentNode.id) {
      currentNode.done = !currentNode.done;
    } else {
      // Use a for loop instead of forEach to avoid nested functions
      // Otherwise "return" will not work properly
      for (
        i = 0;
        currentNode.pages !== undefined && i < currentNode.pages.length;
        i += 1
      ) {
        currentChild = currentNode.pages[i];

        // Search in the current child
        result = findNode(currentExerciseId, currentChild);

        // Return the result if the node has been found
        if (result !== false) {
          currentNode.done = !currentNode.done;
        }
      }

      // The node has not been found and we have no more options
      return false;
    }
  }
  const [slides, setSlides] = useState(
    [
      {
        id: 1,
        div: (
          <div
            key="1"
            className="absolute"
            style={{
              top: "14px",
              left: "0px",
              width: "100%",
              height: "95%",
              backgroundColor: "white"
            }}
          >
            <Image
              className="absolute"
              style={{ top: "-1px", left: "0" }}
              src={i1}
            />

            <Image
              className="absolute"
              style={{ top: "6px", left: "350px" }}
              src={i5}
            />
            <Image
              className="absolute"
              style={{ top: "25px", right: "53px" }}
              src={i4}
            />
          </div>
        )
      },
      {
        id: 2,
        div: (
          <div
            key="1"
            className="absolute"
            style={{
              top: "14px",
              left: "0px",
              width: "100%",
              height: "95%",
              backgroundColor: "white"
            }}
          >
            <Image
              className="absolute"
              style={{ top: "-1px", left: "0" }}
              src={i2}
            />
            <Image
              className="absolute"
              style={{ top: "6px", left: "350px" }}
              src={i5}
            />
            <Image
              className="absolute"
              style={{ top: "25px", right: "53px" }}
              src={i6}
            />
          </div>
        )
      },
      {
        id: 3,
        div: (
          <div
            key="1"
            className="absolute"
            style={{
              top: "14px",
              left: "0px",
              width: "100%",
              height: "95%",
              backgroundColor: "white"
            }}
          >
            <Image
              className="absolute"
              style={{ top: "-1px", left: "0" }}
              src={i2}
            />
            <div className="absolute" style={{ top: "200px", left: "200px" }}>
              <div
                className=" gridList "
                style={{ width: "270px", columnGap: "30px" }}
              >
                <Image src={i8} />
                <div>
                  <span className="my_title small">Richtig</span>
                  <p style={{ marginTop: "5px" }}>
                    Körpernotduschen sind für den Ernstfall montiert und müssen
                    monatlich auf ihre Funktionsfähigkeit überprüft werden.
                  </p>
                </div>
              </div>
            </div>
            <Image
              className="absolute"
              style={{ top: "25px", right: "53px" }}
              src={i6}
            />
            <Image
              className="absolute"
              style={{ top: "6px", right: "-27px" }}
              src={i7}
            />
          </div>
        )
      }
    ].reverse()
  );
  // active frame array
  const [onScreen, changeOnScreen] = useState([]);

  function setUpAniationFrames() {
    // if is previously done
    if (my_exercise.done && !animationTrigger) {
      // push all frames till last state
      pushNewFrameToActiveFrameArray();
      return onScreen.map(item => (
        <div
          className="absolute"
          key={item.id}
          style={{ left: "0", top: "0", width: "100%", height: "100%" }}
        >
          {item.div}
        </div>
      ));
    } else {
      return onScreen.map(item => (
        <div
          className="absolute"
          key={item.id}
          style={{ left: "0", top: "0", width: "100%", height: "100%" }}
        >
          {item.div}
        </div>
      ));
    }
  }

  function pushNewFrameToActiveFrameArray() {
    if (slides.length > 0) {
      let nextSlide = slides.pop();
      changeOnScreen(old => [...old, nextSlide]);
      setSlides(slides.slice(0, slides.length));
    }
  }

  const startSequence = () => {
    const nIntervId = window.setInterval(
      () => pushNewFrameToActiveFrameArray(),
      1400
    );
    setTimeout(() => clearInterval(nIntervId), 6000);
  };
  return (
    <div className="exerciseFrame">
      <Grid
        style={{ width: "100%" }}
        padded="horizontally"
        className="relative"
      >
        <Grid.Row columns="2">
          <Grid.Column
            width="9"
            style={{ paddingLeft: "0" }}
            className="relative fullHeight"
          >
            <Image src={i1} className="absolute" style={{ top: "0" }} />
            <div
              className="gridList absolute"
              style={{ width: "310px", top: "80px", left: "230px" }}
            >
              <Image src={i3} />
              <div>
                <p className="my_title small">
                  Bei der monatlichen Routine&shy;überprüfung der
                  Körpernotdusche stellen Sie fest, dass das Ventil defekt ist.
                  Es kommt kein Wasser.
                </p>
                <p className="my_title small">Wie verhalten Sie sich?</p>
              </div>
            </div>
            <div
              className=" absolute"
              style={{ width: "270px", bottom: "40px", left: "200px" }}
            >
              <p>
                Weitere Informationen zu dieser Frage erhalten Sie im Kapitel
                <br />
                LINKKKKK
              </p>
            </div>
          </Grid.Column>
          <Grid.Column width="7" className="relative">
            <div>
              <Image src={i4} centered style={{ margin: "25px auto" }} />
            </div>

            <div
              className="exerciseContainer"
              style={{ width: "330px", margin: "0px 13px" }}
            >
              {generateRadioButtons()}
            </div>
          </Grid.Column>
        </Grid.Row>
        {my_exercise && my_exercise.done && (
          <div className="absolute" style={{ width: "100%", height: "100%" }}>
            <Transition.Group
              as="div"
              duration={animationTrigger || !my_exercise.done ? 700 : 0}
              style={{ width: "100%", height: "100%" }}
            >
              {setUpAniationFrames()}
            </Transition.Group>

            <button
              style={{ position: "fixed", right: "50%", top: "30px" }}
              onClick={() => isDone()}
            >
              PUSH
            </button>
          </div>
        )}
      </Grid>
    </div>
  );
}

export default withRouter(Augennotdusche);
