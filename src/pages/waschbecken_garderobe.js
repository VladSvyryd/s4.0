import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/9-waschbecken/sanitaer.jpg";
import i2 from "../assets/pics/9-waschbecken/sanitaer_richtig.jpg";
import i3 from "../assets/pics/9-waschbecken/garderobe_active_start.jpg";
import i9 from "../assets/pics/achtung.png";
import i4 from "../assets/pics/9-waschbecken/waschbecken_active_start.jpg";
import i5 from "../assets/pics/9-waschbecken/garderobe_active_end.jpg";

function Waschbecken_garderobe(props) {
  // global state of pages
  const [tocPages] = useContext(PagesContext);
  // state to go through active page
  const [tocState] = useContext(TocContext);

  // state to manage exercise object state
  const [exercise] = useState(tocPages[tocState.activeMenu]);

  const pathname = props.location.pathname;

  // instructions for pictures
  const instructions = [
    "Suchen Sie im Bild nach aktiven Bereichen und überprüfen Sie ob alles in Ordnung ist!",
    "Waschbecken",
    "Garderobe für Arbeitskleidung"
  ];
  const [currentInstruction, setCurrentInstruction] = useState(instructions[0]);

  const style_garderobe = {
    left: "296px",
    top: "116px"
  };
  const style_waschbecken = {
    left: "13px",
    top: "159px"
  };
  const introExercise = () => {
    return (
      <>
        <div className="exerciseFrame">
          <div className="relative">
            {exercise.pages[1].done ? (
              <Image src={i2} style={{ width: "592px" }} />
            ) : (
              <Image src={i1} style={{ width: "592px" }} />
            )}

            <Link
              onMouseEnter={() => setCurrentInstruction(instructions[2])}
              onMouseLeave={() => setCurrentInstruction(instructions[0])}
              className="absolute hoverReveal pointer"
              style={style_garderobe}
              to={{
                pathname: `${pathname}/${exercise.pages[1].filename}`,
                state: {
                  currentExercise: exercise.pages[1]
                }
              }}
            >
              {exercise.pages[1].done ? <Image src={i5} /> : <Image src={i3} />}
            </Link>
            <Link
              onMouseEnter={() => setCurrentInstruction(instructions[1])}
              onMouseLeave={() => setCurrentInstruction(instructions[0])}
              className="absolute hoverReveal pointer"
              style={style_waschbecken}
              to={{
                pathname: `${pathname}/${exercise.pages[0].filename}`,
                state: {
                  currentExercise: exercise.pages[0]
                }
              }}
            >
              <Image src={i4} />
            </Link>
          </div>
          <div className="centered">
            <div className="textIntro" style={{ width: "250px" }}>
              <div className="gridList">
                <Image src={i9} />
                <div>
                  <p>
                    <b>
                      Ansicht <br /> Waschbecken und Garderobe
                    </b>
                  </p>
                  <p>
                    Durch kontaminierte Kleidungsstücke oder Geräte können
                    biologische Arbeitsstoffe schnell verbreitet werden und
                    möglicherweise zu Infektionen führen.
                  </p>
                  <p>
                    Die Hygieneregeln wie das Händewaschen oder das richtige
                    Aufbewahren der persönlichen Schutzausrüstung sind deswegen
                    wichtig!
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

export default Waschbecken_garderobe;
