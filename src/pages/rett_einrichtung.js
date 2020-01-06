import React, { useContext, useState, useEffect, createRef } from "react";
import { Link } from "react-router-dom";
import { Image, Popup } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";

import i1 from "../assets/pics/3-rettungseinrichtungen/Startbild_mit_Chart.png";
import i2 from "../assets/pics/3-rettungseinrichtungen/Verbandkasten_aktiv_blockiert.png";
import i3 from "../assets/pics/3-rettungseinrichtungen/feuerleoscher_blockiert.png";
import i4 from "../assets/pics/achtung_rot.png";
import i5 from "../assets/pics/3-rettungseinrichtungen/verbandkasten_aktiv.png";
import i7 from "../assets/pics/12-sterilisationsauklav/richtig2.jpg";
import i8 from "../assets/pics/3-rettungseinrichtungen/Startbild_ohne_Chart.png";
import i10 from "../assets/pics/3-rettungseinrichtungen/feuerleoscher_aktiv.png";
import i11 from "../assets/pics/3-rettungseinrichtungen/Flipchart_aktiv.png";

import i9 from "../assets/pics/achtung.png";

function Rett_einrichtung(props) {
  // global state of pages
  const [tocPages] = useContext(PagesContext);
  // state to go through active page
  const [tocState, setTocState] = useContext(TocContext);

  // state to manage exercise object state
  const [exercise, setExercise] = useState(tocPages[tocState.activeMenu]);

  const [warningState, setWarningState] = useState(false);
  const [warningState1, setWarningState1] = useState(false);
  const pathname = props.location.pathname;

  // instructions for pictures
  const instructions = [
    "Suchen Sie im Bild nach aktiven Bereichen und überfürüfen Sie, ob alles in Ordnung ist!",
    "Verbandkasten",
    "Feuerlöscher",
    "Flipchart"
  ];
  const [currentInstruction, setCurrentInstruction] = useState(instructions[0]);

  // opens warning by click on Link which is block due to exercise is not done
  const handleWarning = () => {
    setWarningState(old => (old = !old));
  };

  // recursive find all connectiog nodes and final node , return id of them as array last->first
  let exercisesState = { allExercises: [], doneCount: 0, totalExercisesCount: 0 };
  function checkNodeArrays(page) {
    for (let index = 0; index < page.length; index++) {
      const element = page[index];
      if (element.type === 1) {
        // push in array
        //console.log(element);
        exercisesState.allExercises.push(element);
        if (element.done) exercisesState.doneCount++
      } else {
        if (element.pages) {
          checkNodeArrays(element.pages);
        }
      }
    }
    exercisesState.totalExercisesCount = exercisesState.allExercises.length
    console.log(exercisesState);

    return exercisesState;
  }
  // function to change state of current exercise and trigger useEffect function to save it in local storage
  // callback function to trigger save of exercise in localStorage each time exercise state has been changed
  useEffect(() => {
    tocPages[tocState.activeMenu] = exercise;
    localStorage.setItem("pagesList", JSON.stringify(tocPages));
  }, [exercise]);
  const style_verbandkasten = {
    left: "261px",
    top: "110px"
  };
  const style_feuerleoscher = {
    left: "287px",
    top: "226px"
  };
  const style_flipchart = {
    left: "308px",
    top: "36px"
  };
  const introExercise = () => {
    return (
      <>
        <div className="exerciseFrame">
          <div className="relative">
            {exercise.pages[0].done ? <Image src={i8} /> : <Image src={i1} />}
            {exercise.pages[0].done ? (
              <Link
                className="absolute hoverReveal pointer"
                style={style_verbandkasten}
                onMouseEnter={() => setCurrentInstruction(instructions[1])}
                onMouseLeave={() => setCurrentInstruction(instructions[0])}
                to={{
                  pathname: `${pathname}/${exercise.pages[1].filename}`,
                  state: {
                    currentExercise: exercise.pages[1]
                  }
                }}
              >
                {exercise.pages[0].done ? (
                  <Image src={i5} />
                ) : (
                    <Image src={i2} />
                  )}
              </Link>
            ) : (
                <div
                  onMouseEnter={() => setCurrentInstruction(instructions[2])}
                  onMouseLeave={() => setCurrentInstruction(instructions[0])}
                  className="absolute hoverReveal pointer"
                  style={style_verbandkasten}
                  onClick={() => setWarningState1(true)}
                >
                  <Popup
                    open={warningState1}
                    trigger={<Image src={i2} />}
                    position="top center"
                    basic
                    content={
                      <div className="">
                        <Popup.Header as="span">
                          <div
                            className="headerPop "
                            style={{
                              textAlign: "center",
                              fontWeight: "bold",
                              color: "rgb(122,122,122)"
                            }}
                          >
                            Hinweis
                        </div>
                        </Popup.Header>
                        <Popup.Content
                          style={{ paddingLeft: "7px", paddingTop: "10px" }}
                        >
                          <div
                            className="gridList"
                            style={{ alignItems: "center" }}
                          >
                            <Image src={i4} />
                            <span>
                              An den Verbandkasten kommen Sie nicht heran, da er
                              von dem Flipchart verstellt ist.
                          </span>
                          </div>
                        </Popup.Content>
                      </div>
                    }
                    onClose={warningState1 ? () => setWarningState1(false) : null}
                  />
                </div>
              )}
            {exercise.pages[0].done ? (
              <Link
                onMouseEnter={() => setCurrentInstruction(instructions[2])}
                onMouseLeave={() => setCurrentInstruction(instructions[0])}
                className="absolute hoverReveal pointer"
                style={
                  exercise.pages[1].done
                    ? exercise.pages[0].done
                      ? style_feuerleoscher
                      : style_flipchart
                    : style_feuerleoscher
                }
                to={{
                  pathname: `${pathname}/${exercise.pages[2].filename}`,
                  state: {
                    currentExercise: exercise.pages[2]
                  }
                }}
              >
                {exercise.pages[0].done ? (
                  <Image src={i10} />
                ) : (
                    <Image src={i3} />
                  )}
              </Link>
            ) : (
                <div
                  onMouseEnter={() => setCurrentInstruction(instructions[2])}
                  onMouseLeave={() => setCurrentInstruction(instructions[0])}
                  className="absolute hoverReveal pointer"
                  style={
                    exercise.pages[1].done
                      ? exercise.pages[0].done
                        ? style_feuerleoscher
                        : style_flipchart
                      : style_feuerleoscher
                  }
                  onClick={handleWarning}
                >
                  <Popup
                    open={warningState}
                    trigger={<Image src={i3} />}
                    position="top center"
                    basic
                    content={
                      <div className="">
                        <Popup.Header as="span">
                          <div
                            className="headerPop "
                            style={{
                              textAlign: "center",
                              fontWeight: "bold",
                              color: "rgb(122,122,122)"
                            }}
                          >
                            Hinweis
                        </div>
                        </Popup.Header>
                        <Popup.Content
                          style={{ paddingLeft: "7px", paddingTop: "10px" }}
                        >
                          <div
                            className="gridList"
                            style={{ alignItems: "center" }}
                          >
                            <Image src={i4} />
                            <span>
                              An den Feuerlöscher kommen Sie nicht heran, da er
                              von dem Flipchart verstellt ist.
                          </span>
                          </div>
                        </Popup.Content>
                      </div>
                    }
                    onClose={warningState ? handleWarning : null}
                  />
                </div>
              )}
            <Link
              onMouseEnter={() => setCurrentInstruction(instructions[3])}
              onMouseLeave={() => setCurrentInstruction(instructions[0])}
              className="absolute hoverReveal pointer"
              style={
                exercise.pages[1].done
                  ? exercise.pages[0].done
                    ? style_flipchart
                    : style_flipchart
                  : style_flipchart
              }
              to={{
                pathname: `${pathname}/${exercise.pages[0].filename}`,
                state: {
                  currentExercise: exercise.pages[0]
                }
              }}
            >
              {!exercise.pages[0].done && <Image src={i11} />}
            </Link>
          </div>
          <div className="centered">
            <div className="textIntro" style={{ width: "250px" }}>
              <div className="gridList">
                <Image src={i9} onClick={() => checkNodeArrays(tocPages)} />
                <div>
                  <p>
                    <b>
                      Ansicht <br /> Rettungseinrichtungen
                    </b>
                  </p>
                  <p>
                    Trotz aller Sorgfalt kann es im Labor zu gefährlichen
                    Situationen kommen.
                  </p>
                  <p>
                    In diesem Fall muss die Gefahr schnell beseitigt werden und
                    rasche Hilfe möglich sein.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="instructionsField">
          <span>{currentInstruction}</span>
        </div>
      </>
    );
  };

  return introExercise();
}

export default Rett_einrichtung;
