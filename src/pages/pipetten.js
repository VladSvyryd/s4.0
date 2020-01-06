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
import i1 from "../assets/pics/11-sicherheitswerkbank/pipeten.jpg";
import i6 from "../assets/pics/achtung_rot.png";
import i4 from "../assets/pics/frage.png";
import i5 from "../assets/pics/achtung_gruen.png";
import i3 from "../assets/pics/11-sicherheitswerkbank/pipeten_ok.jpg";
import markNodeDone from "../util/externalFunctions";
import i_q from "../assets/pics/querverweis.png";

function Pipetten(props) {
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
      "Ich berühre die Pipettenspitze nicht mit der Hand, da eine Kontaminationsgefahr besteht.",
      "Ich presse die Flüssigkeit mit viel Druck aus der Pipette heraus. Dabei halte ich die Pipette in die Mitte des Gefäßes, um die Innenwände nicht zu kontaminieren.",
      "Ich halte die Spitze der Pipette immer nach unten. Ich lasse die Pipette am Innenrand des Gefäßes langsam auslaufen und streife sie ab, um ein Nachtropfen zu vermeiden.",
      "Einwegpipetten werfe ich sofort in den Abfall, eine Desinfektion ist nicht notwendig."
    ],
    answerBitValue: 5 // to complete exercise compare BitValue of radioGroupState and this answerBitValue
  };
  const instructions = [
    "Klicken Sie die Aussagen an, die Ihrer Meinung nach zutreffen!",
    "Klicken Sie auf eine beliebige Position, um in die vorherige Ansicht zu gelangen."
  ];

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
      document
        .getElementById("panel")
        .addEventListener("mousedown", handleClickToReturnBack);
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
    document
      .getElementById("panel")
      .removeEventListener("mousedown", handleClickToReturnBack);
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
  }, []);

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
            <Grid.Column width="8" className="relative">
              <Image
                src={i1}
                className="absolute"
                style={{ top: "33px", left: "85px" }}
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
                  style={{ top: "0", left: "0", maxWidth: "907px" }}
                />
              </Transition>
            </Grid.Column>
            <Grid.Column width="8">
              <div className="relative fullHeight">
                <Transition
                  visible={my_exercise && !my_exercise.done}
                  animation="fade"
                  duration={animationTrigger ? 700 : 0}
                >
                  <div
                    className="absolute"
                    style={{
                      top: "5%"
                    }}
                  >
                    <div className="gridList" style={{ width: "390px" }}>
                      <div>
                        <h1
                          className="my_title small"
                          style={{ paddingBottom: "0" }}
                        >
                          Wenn Sie biologische Arbeitsstoffe der Risikogruppe 2
                          pipettieren, müssen Sie in der Sicherheitswerkbank
                          arbeiten.
                        </h1>
                        <h1 className="my_title small">
                          Was sollten Sie dabei besonders beachten?
                        </h1>
                      </div>
                      <Image src={i4} />
                    </div>
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
                    <div style={{ marginTop: "20px", width: "380px" }}>
                      <p>
                        Weitere Informationen zu dieser Frage erhalten Sie in
                        der Kapitel {"  "}
                        <a
                          target="_blank"
                          href="../../fachinformation-responsiv/kapc/allgemeines_sicherheitswerk.htm"
                          className="externalLink"
                        >
                          <span className="linkContent">
                            <Image src={i_q} />C 2.10.1 Sicherheitswerkbänke
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
                    style={{ top: "9%", left: "-140px" }}
                  >
                    <div
                      className=" gridList "
                      style={{ width: "339px", columnGap: "30px" }}
                    >
                      <Image src={i5} />
                      <div>
                        <span className="my_title small">Richtig!</span>
                        <p style={{ marginTop: "5px" }}>
                          Diese Hygieneregeln sollten Sie beim Pipettieren
                          einhalten. So können Sie sicher und gefahrlos
                          arbeiten.
                        </p>
                        <ul
                          className="ul_no_padding"
                          style={{ lineHeight: 1.3 }}
                        >
                          <li style={{ padding: "5px 0" }}>
                            Die Pipettenspitze nicht mit der Hand berühren.
                          </li>
                          <li style={{ padding: "5px 0" }}>
                            Die Spitze der Pipette immer nach unten halten.
                          </li>
                          <li style={{ padding: "5px 0" }}>
                            Die Pipette am Innenrand des Gefäßes langsam
                            auslaufen lassen und abstreifen, um ein Nachtropfen
                            zu vermeiden.
                          </li>
                        </ul>
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

export default withRouter(Pipetten);
