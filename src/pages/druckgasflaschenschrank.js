import React, { useContext, useState, useEffect, createRef } from "react";
import { Link } from "react-router-dom";
import { Image, Popup } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/5-druckgasflaschenschrank/startbild_sw_mit_flasche.jpg";
import i2 from "../assets/pics/5-druckgasflaschenschrank/startbild_sw_ohne_flasche.jpg";
import i3 from "../assets/pics/5-druckgasflaschenschrank/flasche.jpg";
import i9 from "../assets/pics/achtung.png";
import i4 from "../assets/pics/5-druckgasflaschenschrank/door_grey.jpg";
import i5 from "../assets/pics/5-druckgasflaschenschrank/door_orange.jpg";

function Druckgasflaschenschrank(props) {
  // global state of pages
  const [tocPages] = useContext(PagesContext);
  // state to go through active page
  const [tocState, setTocState] = useContext(TocContext);

  // state to manage exercise object state
  const [exercise, setExercise] = useState(tocPages[tocState.activeMenu]);

  const pathname = props.location.pathname;
  console.log(exercise);

  // state to show default instructions
  const [defaultInstruction, setdefaultInstruction] = useState(true);
  // instructions for pictures
  const instructions = [
    "Suchen Sie im Bild nach aktiven Bereichen und überprüfen Sie ob alles in Ordnung ist!",
    "Ungesicherte Druckflasche",
    "Druckgasflaschenschrank"
  ];
  const [currentInstruction, setCurrentInstruction] = useState(instructions[0]);

  // callback function to trigger save of exercise in localStorage each time exercise state has been changed
  //useEffect(() => {
  //  tocPages[tocState.activeMenu] = exercise;
  //  localStorage.setItem("pagesList", JSON.stringify(tocPages));
  //}, [exercise]);

  const style_as_done = {
    left: "181px",
    top: "126px",
    backgroundImage: `url('${exercise && exercise.pages[0].done && i4}')`,
    backgroundRepeat: "no-repeat"
  };
  const style_as_not_done = {
    left: "26px",
    top: "227px",
    backgroundImage: `url('${exercise && exercise.pages[0].done && i2}')`,
    backgroundRepeat: "no-repeat"
  };
  const introExercise = () => {
    return (
      <>
        <div className="exerciseFrame">
          <div className="relative">
            {exercise.pages[0].done ? <Image src={i2} /> : <Image src={i1} />}
            <Link
              onMouseEnter={() =>
                exercise.pages[0].done
                  ? setCurrentInstruction(instructions[2])
                  : setCurrentInstruction(instructions[1])
              }
              onMouseLeave={() => setCurrentInstruction(instructions[0])}
              className="absolute hoverReveal pointer"
              style={exercise.pages[0].done ? style_as_done : style_as_not_done}
              to={{
                pathname: `${pathname}/${exercise.pages[0].filename}`,
                state: {
                  currentExercise: exercise.pages[0]
                }
              }}
            >
              {exercise.pages[0].done ? <Image src={i5} /> : <Image src={i3} />}
            </Link>
          </div>
          <div className="centered">
            <div className="textIntro" style={{ width: "250px" }}>
              <div className="gridList">
                <Image src={i9} />
                <div>
                  <p>
                    <b>
                      Ansicht <br /> Druckgasflaschenschrank
                    </b>
                  </p>
                  <p>
                    Gase werden im Laboratorium häufig eingesetzt. Man entnimmt
                    sie aus fest verlegten Gasleitungen oder Druckgasflaschen.
                  </p>
                  <p>
                    Druckgasflaschen enthalten ein hohes Risikopotenzial. Sie
                    stehen unter hohem Innendruck. Werden sie undicht oder
                    brennt es im Labor, kann das verheerende Auswirkungen haben.
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

export default Druckgasflaschenschrank;
