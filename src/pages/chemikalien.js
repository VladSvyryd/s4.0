import React, { useContext, useState, useEffect, createRef } from "react";
import { Link } from "react-router-dom";
import { Image, Popup } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i4 from "../assets/pics/4-chemiekalienschrank/startbild_sw_mit_flasche.jpg";
import i1 from "../assets/pics/4-chemiekalienschrank/regal_ohne_flashe_markiert.jpg";
import i2 from "../assets/pics/4-chemiekalienschrank/regal_mit_flashe_markiert.jpg";
import i3 from "../assets/pics/4-chemiekalienschrank/btn_schrank.png";
import i5 from "../assets/pics/4-chemiekalienschrank/startbild_sw_ohne_flasche.jpg";
import i9 from "../assets/pics/achtung.png";

function Chemikalien(props) {
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
    "Sicherheitsschrank",
    "Regal mit Chemikalien"
  ];
  const [currentInstruction, setCurrentInstruction] = useState(instructions[0]);

  // function to change state of current exercise and trigger useEffect function to save it in local storage
  // callback function to trigger save of exercise in localStorage each time exercise state has been changed
  useEffect(() => {
    tocPages[tocState.activeMenu] = exercise;
    localStorage.setItem("pagesList", JSON.stringify(tocPages));
  }, [exercise]);
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
                right: "2px",
                top: "44px",
                backgroundImage: `url('${exercise.firstLayer[0].done && i5}')`,
                backgroundRepeat: "no-repeat"
              }}
              to={{
                pathname: `${pathname}/${exercise.firstLayer[0].secondLayer.filename}`,
                state: {
                  currentExercise: exercise.firstLayer[0]
                }
              }}
            >
              {exercise.firstLayer[0].done ? (
                <Image src={i1} />
              ) : (
                <Image src={i2} />
              )}
            </Link>

            <Link
              onMouseEnter={() => setCurrentInstruction(instructions[1])}
              onMouseLeave={() => setCurrentInstruction(instructions[0])}
              className="absolute hoverReveal pointer"
              style={{
                left: "16px",
                top: "10px"
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
            </Link>
          </div>
          <div className="centered">
            <div className="textIntro" style={{ width: "250px" }}>
              <div className="gridList">
                <Image src={i9} />
                <div>
                  <p>
                    <b>Ansicht Chemikalien</b>
                  </p>
                  <p>
                    Für die Lagerung von entzündbaren Flüssigkeiten gibt es
                    gesetzliche Vorschriften, die einzuhalten sind.
                  </p>
                  <p>
                    Dies ist notwendig, damit weder Sie noch die Umwelt im
                    Brandfall gefährdet werden können
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

export default Chemikalien;
