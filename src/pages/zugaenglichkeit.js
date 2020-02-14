import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { TocContext } from "../util/TocProvider";
import markNodeDone from "../util/externalFunctions";
import { Grid, Checkbox, Popup, Image, Transition } from "semantic-ui-react";
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/3-rettungseinrichtungen/flipchart_frage.png";
import i2 from "../assets/pics/3-rettungseinrichtungen/flipchart_loesung.png";
import i6 from "../assets/pics/achtung_rot.png";
import i4 from "../assets/pics/frage.png";
import i5 from "../assets/pics/achtung_gruen.png";
import i_q from "../assets/pics/querverweis.png";

function Zugaenglichkeit(props) {
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
  const [radioGroupState, setRadioGroupState] = useState(" ");

  const [animationTrigger, setAnimationTrigger] = useState(false);
  // label of radio buttons and answerIndex which is index in array of labels that is a right answer.
  const aufgabe = {
    labels: [
      "Das Flipchart darf nicht an die Wand gelehnt werden, da es umfallen könnte.",
      "Feuerlöscheinrichtungen und Fluchtwege dürfen kurzzeitig mit leichten Gegenständen verstellt werden.",
      "Feuerlöscheinrichtungen und Fluchtwege müssen immer frei zugänglich sein."
    ],
    answerIndex: 2 /// right answer index in array of questions
  };

  const instructions = [
    "Klicken Sie die Aussage an, die Ihrer Meinung nach zutrifft.",
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
            Diese Antwort war leider falsch!
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
  // set up current exercise state and set click event to reset radio button states
  const tryAgain = value => {
    setRadioGroupState(value);
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
            <Grid.Column width="7">
              <div
                className="relative fullHeight"
                style={{ paddingLeft: "14px" }}
              >
                <Transition
                  visible={my_exercise && !my_exercise.done}
                  animation="fade"
                  duration={animationTrigger ? 700 : 0}
                >
                  <div
                    className="absolute"
                    style={{ top: "11%", maxWidth: "360px" }}
                  >
                    <div className="gridList">
                      <div>
                        <h1 className="my_title small">
                          Rettungseinrichtungen müssen schnell zur Hand sein,
                          wenn es darauf ankommt.
                        </h1>
                        <h1 className="my_title small">
                          Kreuzen Sie die richtige Aussage an.
                        </h1>
                      </div>
                      <Image src={i4} />
                    </div>
                    <div
                      className="exerciseContainer"
                      style={{ width: "300px", marginTop: "20px" }}
                    >
                      {generateRadioButtons()}
                    </div>
                    <div style={{ marginTop: "20px", width: "270px" }}>
                      <p>
                        Weitere Informationen zu dieser Frage erhalten Sie in
                        den Kapiteln
                        {"  "}
                        <a
                          target="_blank"
                          href="../../fachinformation-responsiv/kapb/feuerloescheinrichtungen.htm"
                          className="externalLink"
                        >
                          <span className="linkContent">
                            <Image src={i_q} />B 5.4 Feuerlöscheinrichtungen
                          </span>
                        </a>
                        {"  "}
                        <a
                          target="_blank"
                          href="../../fachinformation-responsiv/kapb/flucht_rettungswege.htm"
                          className="externalLink"
                        >
                          <span className="linkContent">
                            <Image src={i_q} />B 6.3.2 Flucht- und Rettungswege
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
                  <div
                    className="absolute "
                    style={{ top: "13%", maxWidth: "300px" }}
                  >
                    <div className="gridList" style={{}}>
                      <Image src={i5} />
                      <div>
                        <span className="my_title small">Richtig!</span>
                        <p style={{ marginTop: "5px" }}>
                          Feuerlöscheinrichtungen und Fluchtwege müssen immer
                          frei zugänglich sein.
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

export default withRouter(Zugaenglichkeit);
