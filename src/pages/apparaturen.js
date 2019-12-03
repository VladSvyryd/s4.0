import React, { useContext, useState, useEffect, createRef } from "react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i4 from "../assets/pics/6-apparaturen/apparaturenimabzug.jpg";
import i3 from "../assets/pics/6-apparaturen/apparaturen_start.jpg";
import i2 from "../assets/pics/6-apparaturen/abzug_start.jpg";
import i9 from "../assets/pics/achtung.png";
import Versuch_im_Abzug_hebebuehne from "./versuch_im_Abzug";
function Apparaturen(props) {
  // global state of pages
  const [tocPages] = useContext(PagesContext);
  // state to go through active page
  const [tocState, setTocState] = useContext(TocContext);

  // state to manage exercise object state
  const [exercise, setExercise] = useState(tocPages[tocState.activeMenu]);
  // for internal linking to exercises on this page
  const pathname = props.location.pathname;
  // instructions for pictures
  const instructions = [
    "Suchen Sie im Bild nach aktiven Bereichen und überprüfen Sie ob alles in Ordnung ist!",
    "Versuchsaufbau im Abzug",
    "Schalterleiste des Abzugs"
  ];
  const [currentInstruction, setCurrentInstruction] = useState(instructions[0]);

  // function to change state of current exercise and trigger useEffect function to save it in local storage
  // callback function to trigger save of exercise in localStorage each time exercise state has been changed
  useEffect(() => {
    tocPages[tocState.activeMenu] = exercise;
    localStorage.setItem("pagesList", JSON.stringify(tocPages));
  }, [exercise]);
  const [currentViewIndex, set_CurrentViewIndex] = useState(0);
  const changeView = (viewIndex = currentViewIndex) => {
    switch (viewIndex) {
      case 1:
        return <Versuch_im_Abzug_hebebuehne />;
        break;

      default:
        return introExercise();
        break;
    }
  };

  const introExercise = () => {
    return (
      <>
        <div className="exerciseFrame">
          <div className="relative">
            <Image src={i4} />
            <Link
              onMouseEnter={() => setCurrentInstruction(instructions[2])}
              onMouseLeave={() => setCurrentInstruction(instructions[0])}
              className="absolute hoverReveal pointer"
              style={{
                right: "3px",
                top: "13px"
              }}
              to={{
                pathname: `${pathname}/${exercise.firstLayer[0].secondLayer.filename}`,
                state: {
                  currentExercise: exercise.firstLayer[0]
                }
              }}
            >
              {exercise.firstLayer[0].done ? (
                <Image src={i2} />
              ) : (
                <Image src={i2} />
              )}
            </Link>

            <div
              onMouseEnter={() => setCurrentInstruction(instructions[1])}
              onMouseLeave={() => setCurrentInstruction(instructions[0])}
              onClick={() => set_CurrentViewIndex(1)}
              className="absolute hoverReveal pointer"
              style={{
                left: "76px",
                top: "83px"
              }}
              to={{
                pathname: `${pathname}/${exercise.firstLayer[1].secondLayer.filename}`,
                state: {
                  currentExercise: exercise.firstLayer[1],
                  siblingExercise: exercise.firstLayer[0]
                }
              }}
            >
              <Image src={i3} />
            </div>
          </div>
          <div className="centered">
            <div className="textIntro" style={{ width: "260px" }}>
              <div className="gridList">
                <Image src={i9} />
                <div>
                  <p>
                    <b>Ansicht Apparaturen</b>
                  </p>
                  <p>
                    Sie sehen eine typische Laborsituation. In vielen
                    Laboratorien müssen Arbeiten aufgrund der möglichen
                    auftretenden gefährlichen Gase und Dämpfe im Abzug
                    durchgeführt werden.
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

  return changeView();
}

export default Apparaturen;
