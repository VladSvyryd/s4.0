import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { TocContext } from "../util/TocProvider";
import markNodeDone from "../util/externalFunctions";
import { Grid, Checkbox, Popup, Image, Transition } from "semantic-ui-react";
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/7-mitarbeiter/tisch_leer.jpg";
import i6 from "../assets/pics/achtung_rot.png";
import i4 from "../assets/pics/frage.png";
import i5 from "../assets/pics/achtung_gruen.png";
import i3 from "../assets/pics/7-mitarbeiter/food_false_passive.jpg";
import i7 from "../assets/pics/7-mitarbeiter/noeating_sign.png";
import i9 from "../assets/pics/7-mitarbeiter/nosmoking_sign.png";
import i8 from "../assets/pics/7-mitarbeiter/sidebar_kittel.jpg";
import MitarbeiterPicture from "./mitarbeiterPicture";
import i11 from "../assets/pics/7-mitarbeiter/smoke_false_passive.jpg";
import i_q from "../assets/pics/querverweis.png";

function Laborkittel(props) {
  // state to go through active page
  const [tocState, setTocState] = useContext(TocContext);
  // load global state of tocPages
  const [tocPages, setTocPages] = useContext(PagesContext);
  // state to manage exercise object state
  const [exercise, setExercise] = useState(tocPages[tocState.activeMenu]);
  // recieved exercise object as state from page with exercises
  // each Link to exercise has such params
  const [my_exercise, setMyExercise] = useState(
    (props.location.state && props.location.state.currentExercise) ||
      tocState.currentExerciseByPath
  );
  const [radioGroupState, setRadioGroupState] = useState(" ");

  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [triggerWarning, setTrigger] = useState(false);
  // label of radio buttons and answerIndex which is index in array of labels that is a right answer.
  const aufgabe = {
    labels: [
      "Manchmal, z.B. im Sommer, wenn es warm ist, kann man den Laborkittel offen tragen.",
      "Der Laborkittel muss immer geschlossen sein.",
      "Der Laborkittel muss länger sein (Knielänge)."
    ],
    answerIndex: 1 /// right answer index in array of questions
  };
  const instructions = [
    "Klicken Sie die Aussage an, die Ihrer Meinung nach zutrifft",
    "Klicken Sie auf eine beliebige Position, um in die vorherige Ansicht zu gelangen."
  ];
  const [currentMittarbeiter, setMitarbeiter] = useState(0);
  const setMitarbeiterPicture = () => {
    if (
      !exercise.pages[0].done &&
      !exercise.pages[1].done &&
      !exercise.pages[2].done &&
      !exercise.pages[2].done
    )
      setMitarbeiter(0);
    if (exercise.pages[3].done) setMitarbeiter(1);
    if (exercise.pages[2].done) setMitarbeiter(2);
    if (exercise.pages[2].done && exercise.pages[3].done) setMitarbeiter(3);
    if (exercise.pages[1].done) setMitarbeiter(4);
    if (exercise.pages[1].done && exercise.pages[3].done) setMitarbeiter(5);
    if (exercise.pages[1].done && exercise.pages[2].done) setMitarbeiter(6);
    if (
      exercise.pages[1].done &&
      exercise.pages[2].done &&
      exercise.pages[2].done
    )
      setMitarbeiter(7);
    if (exercise.pages[0].done) setMitarbeiter(8);
    if (exercise.pages[0].done && exercise.pages[3].done) setMitarbeiter(9);
    if (exercise.pages[0].done && exercise.pages[2].done) setMitarbeiter(10);
    if (
      exercise.pages[0].done &&
      exercise.pages[2].done &&
      exercise.pages[1].done
    )
      setMitarbeiter(11);
    if (exercise.pages[0].done && exercise.pages[1].done) setMitarbeiter(12);
    if (
      exercise.pages[0].done &&
      exercise.pages[1].done &&
      exercise.pages[3].done
    )
      setMitarbeiter(13);
    if (
      exercise.pages[0].done &&
      exercise.pages[1].done &&
      exercise.pages[2].done
    )
      setMitarbeiter(14);
    if (
      exercise.pages[0].done &&
      exercise.pages[1].done &&
      exercise.pages[2].done &&
      exercise.pages[3].done
    )
      setMitarbeiter(15);
  };
  // if exercise has been already done, go back
  useEffect(() => {
    if (my_exercise.done)
      document
        .getElementById("panel")
        .addEventListener("mousedown", handleClickToReturnBack);

    setMitarbeiterPicture();
    return () => {
      document
        .getElementById("panel")
        .removeEventListener("mousedown", handleClickToReturnBack);
    };
  }, []);
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
      setMitarbeiterPicture();
      setRadioGroupState(value);
      setAnimationTrigger(true);
      document
        .getElementById("panel")
        .addEventListener("mousedown", handleClickToReturnBack);
    }
  };
  // add click event to document to return to other exercises and reset click events
  const handleClickToReturnBack = () => {
    document
      .getElementById("panel")
      .removeEventListener("mousedown", handleClickToReturnBack);
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
  const style_food_false = {
    left: "0",
    bottom: "111px"
  };
  const style_food_true = {
    position: "absolute",
    left: "158px",
    top: "38px",
    display: "flex"
  };
  const style_smoke_false = {
    left: "136px",
    top: "302px"
  };
  const style_smoke_true = {
    display: "flex",
    position: "absolute",
    left: "38px",
    top: "38px"
  };
  return (
    <>
      <div className="exerciseFrame">
        <Grid style={{ width: "100%" }} padded="horizontally">
          <Grid.Row columns="2">
            <Grid.Column width="11" className="relative">
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  bottom: "0",
                  display: "flex"
                }}
              >
                <Image src={i1} />
              </div>
              <div
                className="absolute  "
                style={
                  exercise.pages[5].done ? style_food_true : style_food_false
                }
              >
                {exercise.pages[5].done ? (
                  <Image src={i7} />
                ) : (
                  <Image src={i3} />
                )}
              </div>
              <div
                className="absolute  "
                style={
                  exercise.pages[4].done ? style_smoke_true : style_smoke_false
                }
              >
                {exercise.pages[4].done ? (
                  <Image src={i9} />
                ) : (
                  <Image src={i11} />
                )}
              </div>
              <div style={{ position: "absolute", right: "58px", top: "20px" }}>
                <MitarbeiterPicture currentMittarbeiter={currentMittarbeiter} />
              </div>
            </Grid.Column>
            <Grid.Column width="5">
              <div
                className="relative fullHeight"
                style={{ paddingLeft: "0px" }}
              >
                <Transition
                  visible={my_exercise && !my_exercise.done}
                  animation="fade"
                  duration={animationTrigger ? 700 : 0}
                >
                  <div
                    className="absolute"
                    style={{ top: "11%", maxWidth: "250px" }}
                  >
                    <div className="gridList">
                      <div>
                        <h1 className="my_title small">
                          Sagen Sie Ihrem Kollegen, wie er vorschriftsmäßig
                          gekleidet ist.
                        </h1>
                      </div>
                      <Image src={i4} />
                    </div>
                    <div
                      className="exerciseContainer"
                      style={{ marginTop: "20px" }}
                    >
                      {generateRadioButtons()}
                    </div>
                    <div style={{ marginTop: "70px", width: "230px" }}>
                      <p>
                        Weitere Informationen zu dieser Frage erhalten Sie in
                        Kapitel
                        {"  "}
                        <a
                          target="_blank"
                          href="../../fachinformation-responsiv/kapb/kittel_schuhe_brille.htm"
                          className="externalLink"
                        >
                          <span className="linkContent">
                            <Image src={i_q} />B 2.2.1 Kittel, Schuhe und Brille
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
                    style={{ top: "13%", maxWidth: "390px" }}
                  >
                    <div className=" gridList " style={{ columnGap: "30px" }}>
                      <Image src={i5} />
                      <div>
                        <span className="my_title small">Richtig!</span>
                        <p style={{ marginTop: "5px" }}>
                          Der geschlossene Laborkittel mit langen Ärmeln gehört
                          zur Grundausstattung im Labor.
                        </p>
                        <Image
                          src={i8}
                          style={{
                            marginTop: "40px",
                            border: " 1px solid grey"
                          }}
                        />
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

export default withRouter(Laborkittel);
