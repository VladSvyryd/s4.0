import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/10-arbeitsplatz/startseite_auf_ohne.jpg";
import i2 from "../assets/pics/10-arbeitsplatz/startseite_zu_ohne.jpg";
import i3 from "../assets/pics/10-arbeitsplatz/fenster_auf_active.jpg";
import i9 from "../assets/pics/achtung.png";
import i4 from "../assets/pics/10-arbeitsplatz/schuettler_ohne_active.jpg";
import i5 from "../assets/pics/10-arbeitsplatz/schuettler_mit_active.jpg";
import i6 from "../assets/pics/10-arbeitsplatz/protokol_active.jpg";
import i7 from "../assets/pics/10-arbeitsplatz/schuettler_mit_passiv.png";
import i8 from "../assets/pics/10-arbeitsplatz/fenster_zu_active.jpg";

function Arbeitsplatz(props) {
  // global state of pages
  const [tocPages] = useContext(PagesContext);
  // state to go through active page
  const [tocState] = useContext(TocContext);

  // state to manage exercise object state
  const [exercise] = useState(tocPages[tocState.activeMenu]);

  // instructions for pictures
  const instructions = [
    "Suchen Sie im Bild nach aktiven Bereichen und überprüfen Sie ob alles in Ordnung ist!",
    "Geschlossenes Fenster",
    "Schüttler und Desinfektionsmittel",
    "Hygieneplan"
  ];
  const [currentInstruction, setCurrentInstruction] = useState(instructions[0]);

  const pathname = props.location.pathname;

  const style_1 = {
    left: "50px",
    top: "219px",
    backgroundImage: `url('${exercise && exercise.pages[1].done && i7}')`,
    backgroundRepeat: "no-repeat"
  };
  const style_2 = {
    left: "27px",
    top: "42px"
  };
  const style_3 = {
    left: "373px",
    top: "14px"
  };
  const introExercise = () => {
    return (
      <>
        <div className="exerciseFrame">
          <div className="relative">
            {exercise.pages[0].done ? (
              <Image src={i2} style={{ width: "591px" }} />
            ) : (
              <Image src={i1} style={{ width: "591px" }} />
            )}
            <Link
              onMouseEnter={() => setCurrentInstruction(instructions[1])}
              onMouseLeave={() => setCurrentInstruction(instructions[0])}
              className="absolute hoverReveal pointer"
              style={style_2}
              to={{
                pathname: `${pathname}/${exercise.pages[0].filename}`,
                state: {
                  currentExercise: exercise.pages[0]
                }
              }}
            >
              {exercise.pages[0].done ? <Image src={i8} /> : <Image src={i3} />}
            </Link>
            <Link
              onMouseEnter={() => setCurrentInstruction(instructions[2])}
              onMouseLeave={() => setCurrentInstruction(instructions[0])}
              className="absolute hoverReveal pointer"
              style={style_1}
              to={{
                pathname: `${pathname}/${exercise.pages[1].filename}`,
                state: {
                  currentExercise: exercise.pages[1]
                }
              }}
            >
              {exercise.pages[1].done ? <Image src={i5} /> : <Image src={i4} />}
            </Link>
            <Link
              onMouseEnter={() => setCurrentInstruction(instructions[3])}
              onMouseLeave={() => setCurrentInstruction(instructions[0])}
              className="absolute hoverReveal pointer"
              style={style_3}
              to={{
                pathname: `${pathname}/${exercise.pages[2].filename}`,
                state: {
                  currentExercise: exercise.pages[2]
                }
              }}
            >
              <Image src={i6} />
            </Link>
          </div>
          <div className="centered">
            <div className="textIntro" style={{ width: "250px" }}>
              <div className="gridList">
                <Image src={i9} />
                <div>
                  <p>
                    <b>Ansicht Arbeitsplatz</b>
                  </p>
                  <p>
                    Bei Tätigkeiten mit biologischen Arbeitsstoffen schreibt der
                    Gesetzgeber eine Reihe von Schutzmaßnahmen vor, die auch die
                    Gestaltung des Arbeitsplatzes und die Arbeitsorganisation
                    betreffen.
                  </p>
                  <p>
                    Überprüfen Sie, ob an diesem Arbeitsplatz der Schutzstufe 2
                    alle Vorschriften eingehalten werden.
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

export default Arbeitsplatz;
