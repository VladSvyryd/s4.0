import React, { useContext, useState, useEffect, useReducer } from "react";
import { Link, withRouter } from "react-router-dom";
import { Grid, Checkbox, Image, Popup, Transition } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i3 from "../assets/pics/frage.png";
import i1 from "../assets/pics/2-chemielaboreingang/ventil.jpg";
import i2 from "../assets/pics/2-chemielaboreingang/ventil_richtig.jpg";
import i4 from "../assets/pics/2-chemielaboreingang/ventil_bild.jpg";
import { useTransition, animated, config } from "react-spring";

function Augennotdusche(props) {
  // state to go through active page
  const [tocState, setTocState] = useContext(TocContext);
  // load global state of tocPages
  const [tocPages, setTocPages] = useContext(PagesContext);
  // recieved exercise object as state from page with exercises
  // each Link to exercise has such params
  const [my_exercise, setMyExercise] = useState((props.location.state && props.location.state.currentExercise) ||
      tocState.currentExerciseByPath);
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
  const [slides, setSlides] = useState([
    {
      id: 1,
      url: i1
    },
    {
      id: 2,
      url: i2
    },
    {
      id: 3,
      url: i3
    },
    {
      id: 4,
      url: i4
    }
  ]);
  const [index, set] = useState(0);
  const [onScreen, changeOnScreen] = useState([]);
  function fade_1() {
    return onScreen.map(item => (
      <div
        className="absolute"
        key={item.id}
        style={{ left: "0", top: "0", width: "100%", height: "100%" }}
      >
        <Image src={`${item.url}`} />
      </div>
    ));
  }

  function start() {
    if (slides.length > 0) {
      let nextSlide = slides.pop();
      changeOnScreen(old => [...old, nextSlide]);
      setSlides(slides.slice(0, slides.length));
    }
  }

  const startSequence = () => {
    const nIntervId = window.setInterval(() => start(), 800);
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
              {my_exercise && my_exercise.done && startSequence()}
              {fade_1()}
            </Transition.Group>
            <button
              style={{ position: "fixed", right: "50%", top: "30px" }}
              onClick={() => start()}
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
