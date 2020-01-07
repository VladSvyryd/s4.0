import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i4 from "../assets/pics/2-chemielaboreingang/start_grau.jpg";
import i1 from "../assets/pics/2-chemielaboreingang/tuer_btn_falsch.jpg";
import i2 from "../assets/pics/2-chemielaboreingang/tuer_btn_richtig.jpg";
import i3 from "../assets/pics/2-chemielaboreingang/tuer_richtig.jpg";
import i5 from "../assets/pics/2-chemielaboreingang/dusche_btn.jpg";
import i6 from "../assets/pics/2-chemielaboreingang/augendusche_btn_falsch.jpg";
import i7 from "../assets/pics/2-chemielaboreingang/augendusche_btn_richtig.jpg";
import i13 from "../assets/pics/2-chemielaboreingang/augendusche_btn_richtig_inactive.jpg";
import i9 from "../assets/pics/achtung.png";
import i10 from "../assets/pics/2-chemielaboreingang/kenn_btn_falsch.jpg";
import i11 from "../assets/pics/2-chemielaboreingang/kenn_btn_richtig.jpg";
import i12 from "../assets/pics/2-chemielaboreingang/kenn_richtig.jpg";

function Ringang_chem_labor(props) {
  // global state of pages
  const [tocPages] = useContext(PagesContext);
  // state to go through active page
  const [tocState] = useContext(TocContext);
  // state to manage exercise object state
  const [exercise] = useState(tocPages[tocState.activeMenu]);
  const pathname = props.location.pathname;
  const instructions = [
    "Suchen Sie im Bild nach aktiven Bereichen, die nicht in Ordnung sind!",
    "Labortür",
    "Körpernotdusche",
    "Augennotdusche",
    "Ventile der Notduschen"
  ];
  const [currentInstruction, setCurrentInstruction] = useState(instructions[0]);

  const introExercise = () => {
    return (
      <>
        <div className="exerciseFrame">
          <div className="relative">
            <Image src={i4} />
            <Link
              onMouseEnter={() => setCurrentInstruction(instructions[1])}
              onMouseLeave={() => setCurrentInstruction(instructions[0])}
              className="absolute hoverReveal pointer"
              style={{
                right: "275px",
                top: "118px",
                backgroundImage: `url('${exercise.pages[0].done && i3}')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "232px 371px"
              }}
              //onClick={() => setExerciseView(1)}
              to={{
                pathname: `${pathname}/${exercise.pages[0].filename}`,
                state: {
                  currentExercise: exercise.pages[0]
                }
              }}
            >
              {exercise.pages[0].done ? <Image src={i2} /> : <Image src={i1} />}
            </Link>
            <Link
              onMouseEnter={() => setCurrentInstruction(instructions[2])}
              onMouseLeave={() => setCurrentInstruction(instructions[0])}
              className="absolute hoverReveal pointer"
              style={{
                right: "66px",
                top: "18px"
              }}
              to={{
                pathname: `${pathname}/${exercise.pages[2].filename}`,
                state: {
                  currentExercise: exercise.pages[2]
                }
              }}
            >
              <Image src={i5} />
            </Link>
            <Link
              onMouseEnter={() => setCurrentInstruction(instructions[3])}
              onMouseLeave={() => setCurrentInstruction(instructions[0])}
              className="absolute hoverReveal pointer"
              style={{
                right: "160px",
                top: "252px",
                backgroundImage: `url('${exercise.pages[1].done && i13}')`,
                backgroundRepeat: "no-repeat"
              }}
              to={{
                pathname: `${pathname}/${exercise.pages[1].filename}`,
                state: {
                  currentExercise: exercise.pages[1]
                }
              }}
            >
              {exercise.pages[2].done ? <Image src={i7} /> : <Image src={i6} />}
            </Link>
            <Link
              onMouseEnter={() => setCurrentInstruction(instructions[4])}
              onMouseLeave={() => setCurrentInstruction(instructions[0])}
              className="absolute hoverReveal pointer"
              style={{
                right: "77px",
                top: "347px",
                backgroundImage: `url('${exercise.pages[3].done && i12}')`,
                backgroundPositionX: "right",

                backgroundRepeat: "no-repeat"
              }}
              to={{
                pathname: `${pathname}/${exercise.pages[3].filename}`,
                state: {
                  currentExercise: exercise.pages[3]
                }
              }}
            >
              {exercise.pages[3].done ? (
                <Image src={i11} />
              ) : (
                <Image src={i10} />
              )}
            </Link>
          </div>
          <div className="centered">
            <div className="textIntro" style={{ width: "200px" }}>
              <div className="gridList">
                <Image src={i9} />
                <div>
                  <p>
                    <b>
                      Ansicht <br /> Eingang chemisches Labor
                    </b>
                  </p>
                  <p>
                    Alle sicherheitstechnischen Einrichtungen eines Labors
                    müssen einwandfrei funktionieren, damit sie im Gefahrfall
                    einsatzbereit sind.
                  </p>
                  <p>
                    Finden Sie heraus, was Sie an dieser Situation noch
                    verbessern können.
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

export default Ringang_chem_labor;
