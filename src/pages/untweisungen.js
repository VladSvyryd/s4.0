import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i4 from "../assets/pics/1_buero/unterweisungen_start.jpg";
import i1 from "../assets/pics/1_buero/teilnahme_false_active.jpg";
import i2 from "../assets/pics/1_buero/teilnahme_true_active.jpg";
import i3 from "../assets/pics/1_buero/unterweisung_true_active.jpg";
import i5 from "../assets/pics/1_buero/unterweisung_false_active.jpg";
import i6 from "../assets/pics/1_buero/unterweisung_true_passive.jpg";
import i7 from "../assets/pics/1_buero/teilnahme_true_passive.jpg";

import i9 from "../assets/pics/achtung.png";

function Untweisungen(props) {
  // global state of pages
  const [tocPages] = useContext(PagesContext);
  // state to go through active page
  const [tocState, setTocState] = useContext(TocContext);

  console.log(tocPages[tocState.activeMenu].pages[1]);
  // state to manage exercise object state
  const [exercise, setExercise] = useState(
    (props.location.state && props.location.state.currentExercise) ||
      tocPages[tocState.activeMenu].pages[1]
  );
  const pathname = props.location.pathname;
  const instructions = [
    "Suchen Sie im Bild nach aktiven Bereichen und überprüfen Sie, ob alles in Ordnung ist!",
    "Dokumentation über die Durchführung einer Unterweisung",
    "Dokumentation der Teilnahme an den turnusmäßigen Unterweisungen"
  ];
  const [currentInstruction, setCurrentInstruction] = useState(instructions[0]);

  // function to change state of current exercise and trigger useEffect function to save it in local storage
  // callback function to trigger save of exercise in localStorage each time exercise state has been changed
  //useEffect(() => {
  //tocPages[tocState.activeMenu] = exercise;
  //localStorage.setItem("pagesList", JSON.stringify(tocPages));
  //}, [exercise]);
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
                right: "0px",
                top: "67px",
                backgroundImage: `url('${exercise &&
                  exercise.pages[1].done &&
                  i7}')`,
                backgroundRepeat: "no-repeat"
              }}
              to={{
                pathname: `${pathname}/${exercise.pages[1].filename}`,
                state: {
                  currentExercise: exercise.pages[1]
                }
              }}
            >
              {exercise.pages[1].done ? <Image src={i2} /> : <Image src={i1} />}
            </Link>
            <Link
              onMouseEnter={() => setCurrentInstruction(instructions[1])}
              onMouseLeave={() => setCurrentInstruction(instructions[0])}
              className="absolute hoverReveal pointer"
              style={{
                right: "306px",
                bottom: "-1px",
                backgroundImage: `url('${exercise &&
                  exercise.pages[0].done &&
                  i6}')`,
                backgroundRepeat: "no-repeat"
              }}
              //onClick={() => setExerciseView(1)}
              to={{
                pathname: `${pathname}/${exercise.pages[0].filename}`,
                state: {
                  currentExercise: exercise.pages[0]
                }
              }}
            >
              {exercise.pages[0].done ? <Image src={i3} /> : <Image src={i5} />}
            </Link>
          </div>
          <div className="centered">
            <div className="textIntro" style={{ width: "200px" }}>
              <div className="gridList">
                <Image src={i9} />
                <div>
                  <p>
                    <b>Ansicht Unterweisungen</b>
                  </p>
                  <p>
                    Die Gefahrstoffverordnung schreibt die Dokumentation von
                    durchgeführten Unter&shy;weisungen vor.
                  </p>
                  <p>
                    Diese Dokumentation muss auch die Teilnahme der
                    Labormitarbeiter an den Unterweisungen schriftlich
                    festhalten.
                  </p>
                  <p>
                    Finden Sie heraus, ob der Laborleiter seinen Pflichten
                    nachgekommen ist.
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

export default Untweisungen;
