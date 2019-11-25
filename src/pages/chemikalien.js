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
  // state to view different exercise on the same page in the same frame
  const [exerciseView, setExerciseView] = useState(0);
  const pathname = props.location.pathname;

  let contextRef = createRef(); // reference to instructions field

  // state to show default instructions
  const [defaultInstruction, setdefaultInstruction] = useState(true);
  // instructions for pictures
  const instructions = [
    "Suchen Sie im Bild nach aktiven Bereichen und überprüfen Sie ob alles in Ordnung ist!",
    "Sicherheitsschrank",
    "Regal mit Chemikalien"
  ];
  const handleOpenInstruction = () => {
    setdefaultInstruction(old => (old = !old));
  };
  // function to change state of current exercise and trigger useEffect function to save it in local storage
  // recieve exerices ID from Exercise_1,2,3,4 and loking of its state change array....
  const saveExercise = ID => {
    setExercise(old => ({
      ...old,
      firstLayer: old.firstLayer.map(e => {
        let result = e;
        if (e.secondLayer.id == ID) {
          e.done = !e.done;
          result = e;
        }
        return result;
      })
    }));
  };
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
              <Popup
                trigger={
                  exercise.firstLayer[0].done ? (
                    <Image src={i1} />
                  ) : (
                    <Image src={i2} />
                  )
                }
                basic
                context={contextRef}
                content={instructions[2]}
                position="top center"
                className="instructionsPopup"
                onOpen={handleOpenInstruction}
                onClose={handleOpenInstruction}
                mouseEnterDelay={200}
                mouseLeaveDelay={200}
              />
            </Link>

            <Link
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
              <Popup
                trigger={<Image src={i3} />}
                basic
                context={contextRef}
                content={instructions[1]}
                position="top center"
                className="instructionsPopup"
                onOpen={handleOpenInstruction}
                onClose={handleOpenInstruction}
                mouseEnterDelay={200}
                mouseLeaveDelay={200}
              />
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
          <strong ref={contextRef}></strong>
        </div>
        <Popup
          basic
          context={contextRef}
          content={instructions[0]}
          position="top center"
          className="instructionsPopup"
          open={defaultInstruction}
        />
      </>
    );
  };

  return introExercise();
}

export default Chemikalien;
