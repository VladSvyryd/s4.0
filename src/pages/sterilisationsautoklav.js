import React, { useContext, useState, useEffect, createRef } from "react";
import { Link } from "react-router-dom";
import { Image, Popup } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";

import i1 from "../assets/pics/12-sterilisationsauklav/falsch.jpg";
import i2 from "../assets/pics/12-sterilisationsauklav/mitarbeiter_false_active.jpg";
import i3 from "../assets/pics/12-sterilisationsauklav/pers_schutz_false_active.jpg";
import i4 from "../assets/pics/achtung_rot.png";
import i5 from "../assets/pics/12-sterilisationsauklav/richtig1.jpg";
import i6 from "../assets/pics/12-sterilisationsauklav/mitarbeiter_true_active.jpg";
import i7 from "../assets/pics/12-sterilisationsauklav/richtig2.jpg";
import i8 from "../assets/pics/12-sterilisationsauklav/mitarbeiter_all_true_active.jpg";
import i10 from "../assets/pics/12-sterilisationsauklav/pers_schutz_all_true_active.jpg";

import i9 from "../assets/pics/achtung.png";

function Sterilisationsautoklav(props) {
  // global state of pages
  const [tocPages] = useContext(PagesContext);
  // state to go through active page
  const [tocState, setTocState] = useContext(TocContext);

  // state to manage exercise object state
  const [exercise, setExercise] = useState(tocPages[tocState.activeMenu]);

  const [warningState, setWarningState] = useState(false);
  const pathname = props.location.pathname;

  // instructions for pictures
  const instructions = [
    "Suchen Sie im Bild nach aktiven Bereichen und beantworten Sie die Fragen zur sicheren Arbeit mit Sterilisationsautoklaven!",
    "Persönliche Schutzausrüstung",
    "Technische Ausstattung und autoklaviertes Gut"
  ];
  const [currentInstruction, setCurrentInstruction] = useState(instructions[0]);

  // opens warning by click on Link which is block due to exercise is not done
  const handleWarning = () => {
    setWarningState(old => (old = !old));
  };

  // function to change state of current exercise and trigger useEffect function to save it in local storage
  // callback function to trigger save of exercise in localStorage each time exercise state has been changed
  useEffect(() => {
    tocPages[tocState.activeMenu] = exercise;
    localStorage.setItem("pagesList", JSON.stringify(tocPages));
  }, [exercise]);

  const style_technische_ausstattung = {
    left: "234px",
    top: "356px"
  };
  const style_pers_schutz = {
    left: "13px",
    top: "48px"
  };
  const style_technische_ausstattung_first_true = {
    left: "233px",
    top: "352px"
  };
  const introExercise = () => {
    return (
      <>
        <div className="exerciseFrame">
          <div className="relative">
            {exercise.firstLayer[1].done ? (
              exercise.firstLayer[0].done ? (
                <Image src={i7} />
              ) : (
                <Image src={i5} />
              )
            ) : (
              <Image src={i1} />
            )}
            <Link
              className="absolute hoverReveal pointer"
              style={style_pers_schutz}
              onMouseEnter={() => setCurrentInstruction(instructions[1])}
              onMouseLeave={() => setCurrentInstruction(instructions[0])}
              to={{
                pathname: `${pathname}/${exercise.firstLayer[1].secondLayer.filename}`,
                state: {
                  currentExercise: exercise.firstLayer[1]
                }
              }}
            >
              {exercise.firstLayer[1].done ? (
                exercise.firstLayer[0].done ? (
                  <Image src={i8} />
                ) : (
                  <Image src={i6} />
                )
              ) : (
                <Image src={i2} />
              )}
            </Link>
            {exercise.firstLayer[1].done ? (
              <Link
                onMouseEnter={() => setCurrentInstruction(instructions[2])}
                onMouseLeave={() => setCurrentInstruction(instructions[0])}
                className="absolute hoverReveal pointer"
                style={
                  exercise.firstLayer[1].done
                    ? exercise.firstLayer[0].done
                      ? style_technische_ausstattung
                      : style_technische_ausstattung_first_true
                    : style_technische_ausstattung
                }
                to={{
                  pathname: `${pathname}/${exercise.firstLayer[0].secondLayer.filename}`,
                  state: {
                    currentExercise: exercise.firstLayer[0]
                  }
                }}
              >
                {exercise.firstLayer[1].done ? (
                  exercise.firstLayer[0].done ? (
                    <Image src={i10} />
                  ) : (
                    <Image src={i3} />
                  )
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
                  exercise.firstLayer[1].done
                    ? exercise.firstLayer[0].done
                      ? style_technische_ausstattung
                      : style_technische_ausstattung_first_true
                    : style_technische_ausstattung
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
                            Das autoklarierte Gut kann noch nicht entnommen
                            werden, da der Mitarbeiter nicht ordnungsgemäß
                            gekleidet ist.
                          </span>
                        </div>
                      </Popup.Content>
                    </div>
                  }
                  onClose={warningState ? handleWarning : null}
                />
              </div>
            )}
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

export default Sterilisationsautoklav;
