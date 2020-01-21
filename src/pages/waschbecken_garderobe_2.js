import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Grid, Checkbox, Image, Popup, Transition } from "semantic-ui-react";
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
  const [radioGroupState, setRadioGroupState] = useState(" ");
  const [animationTrigger, setAnimationTrigger] = useState(false);

  // label of radio buttons and answerIndex which is index in array of labels that is a right answer.
  const aufgabe = {
    labels: [
      "Ich wasche meine Hände nur vor dem Verlassen des Labors.",
      "Ich wasche und desinfiziere meine Hände nach jeder zusammenhängenden Arbeitseinheit und vor dem Verlassen des Labors.",
      "Ich wasche und desinfiziere meine Hände nur dann, wenn ich mit kontaminierten Gegenständen in Kontakt gekommen bin.",
      "Ich wasche und desinfiziere meine Hände nur vor dem Verlassen des Labors."
    ],
    answerIndex: 1
  };
  const instructions = [
    "Klicken Sie die Aussage an, die Ihrer Meinung nach zutrifft!",
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
            <Grid.Column width="8" className="relative">
              <Image
                src={i1}
                className="absolute"
                style={{ top: "0", left: "14px" }}
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
              <div className="relative fullHeight">
                <Transition
                  visible={my_exercise && !my_exercise.done}
                  animation="fade"
                  duration={animationTrigger ? 700 : 0}
                >
                  <div className="absolute" style={{ top: "13%" }}>
                    <div className="gridList" style={{ width: "390px" }}>
                      <h1 className="my_title small">
                        Wann genau müssen Sie sich bei Tätigkeiten in der
                        Schutzstufe 2 die Hände waschen?
                      </h1>
                      <Image src={i4} />
                    </div>
                    <div
                      className="exerciseContainer"
                      style={{ width: "390px", marginTop: "20px" }}
                    >
                      {generateRadioButtons()}
                    </div>
                    <div style={{ marginTop: "30px", width: "270px" }}>
                      <p>
                        Weitere Informationen zu dieser Frage erhalten Sie in
                        Kapitel {"  "}
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
                    <div
                      className=" gridList "
                      style={{ width: "270px", columnGap: "30px" }}
                    >
                      <Image src={i5} />
                      <div>
                        <span className="my_title small">Richtig</span>
                        <p style={{ marginTop: "5px" }}>
                          Sie waschen sich die Hände nach jeder Arbeitseinheit
                          und vor dem Verlassen des Laboratoriums.
                        </p>
                        <p>
                          Vergessen Sie nicht, die Hände regelmäßig mit einer
                          geeigneten Feuchtigkeitscreme zu pflegen!
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
