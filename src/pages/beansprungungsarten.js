import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Checkbox, Image, Popup, Transition } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/1_buero/teilnahme_loesung.jpg";
import i2 from "../assets/pics/1_buero/teilnahme.jpg";
import i3 from "../assets/pics/achtung_rot.png";
import i4 from "../assets/pics/frage.png";
import i5 from "../assets/pics/achtung_gruen.png";
import markNodeDone from "../util/externalFunctions";
import i_q from "../assets/pics/querverweis.png";

function Beansprungungsarten(props) {
  // state to go through active page
  const [tocState] = useContext(TocContext);
  // load global state of tocPages
  const [, setTocPages] = useContext(PagesContext);
  // recieved exercise object as state from page with exercises
  // each Link to exercise has such params
  // if this page is opened from link than it will grab exercise looking through json exerciselist
  const [my_exercise, setMyExercise] = useState(
    (props.location.state && props.location.state.currentExercise) ||
      tocState.currentExerciseByPath
  );
  const [radioGroupState, setRadioGroupState] = useState(" ");
  const [animationTrigger, setAnimationTrigger] = useState(false);
  // label of radio buttons and answerIndex which is index in array of labels that is a right answer.
  const aufgabe = {
    labels: ["Halbjährlich", "Jährlich", "Zweijährlich"],
    answerIndex: 1
  };
  // instructions for pictures
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
              style={{ padding: "5px 10px" }}
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
  // if page refreshs go to Grundriss page
  //const path = props.location.pathname.split("/");
  //path.pop();
  //const r = path.join("/");
  //if (!my_exercise) props.history.push("/virtuelles_labor/grundriss");

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
      <div className="exerciseFrame" style={{ position: "relative" }}>
        <Image
          src={i2}
          className="absolute"
          style={{ bottom: "40px", left: "85px" }}
        />
        <Transition
          visible={animationTrigger || (my_exercise && my_exercise.done)}
          animation="fade"
          duration={animationTrigger ? 700 : 0}
          className="absolute"
        >
          <Image
            src={i1}
            className="absolute"
            style={{ bottom: "40px", left: "85px" }}
          />
        </Transition>
        <div style={{ display: "flex", width: "100%" }}>
          <Transition
            visible={my_exercise && !my_exercise.done}
            animation="fade"
            duration={animationTrigger ? 700 : 0}
          >
            <>
              <div className="absolute" style={{ top: "15px", left: "38px" }}>
                <div className="gridList" style={{ columnGap: "20px" }}>
                  <Image src={i4} />
                  <div>
                    <h1
                      className="my_title small"
                      style={{ width: "630px", paddingBottom: 0 }}
                    >
                      Alle Labormitarbeiter müssen in regelmäßigen Abständen
                      über die Gefährdungen unterwiesen werden, die mit ihrer
                      Tätigkeit zusammenhängen.
                    </h1>
                    <div className="gridList">
                      <h1
                        className="my_title small"
                        style={{ paddingBottom: 0 }}
                      >
                        In welchem Turnus sollte dies mindestens geschehen?
                      </h1>
                      <div className="exerciseContainer">
                        {generateRadioButtons()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {my_exercise && !my_exercise.done && (
                <div
                  className="absolute"
                  style={{ bottom: "15px", left: "190px" }}
                >
                  <p>
                    Weitere Informationen zu dieser Frage erhalten Sie in
                    Kapitel {"  "}
                    <a
                      target="_blank"
                      href="../../fachinformation-responsiv/kapb/unterweisungen.htm"
                      className="externalLink"
                    >
                      <span className="linkContent">
                        <Image src={i_q} />B 1.3.2 Unterweisungen
                      </span>
                    </a>
                  </p>
                </div>
              )}
            </>
          </Transition>
          <Transition
            as="div"
            visible={animationTrigger || (my_exercise && my_exercise.done)}
            animation="fade"
            duration={animationTrigger ? 700 : 0}
          >
            <div
              className="absolute "
              style={{
                top: "15px",
                left: "38px",
                width: "780px",
                height: "74px",
                backgroundColor: "white"
              }}
            >
              <div
                className=" gridList "
                style={{ width: "720px", columnGap: "36px" }}
              >
                <Image src={i5} />
                <div>
                  <span className="my_title small">Richtig</span>
                  <p style={{ marginTop: "5px" }}>
                    Unterweisungen sollten mindestens jährlich stattfinden. Der
                    Mitarbeiter Rykowski wurde seit 3 Jahren nicht mehr über die
                    gefährlichen Eigenschaften von Stoffen unterwiesen. Die
                    Unterweisung ist unverzüglich nachzuholen!
                  </p>
                </div>
              </div>
            </div>
          </Transition>
        </div>
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

export default withRouter(Beansprungungsarten);
