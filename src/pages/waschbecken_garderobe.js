import React, { useContext, useState, useEffect, createRef } from "react";
import { Link } from "react-router-dom";
import { Image, Popup } from "semantic-ui-react";
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
  const [tocState, setTocState] = useContext(TocContext);

  // state to manage exercise object state
  const [exercise, setExercise] = useState(tocPages[tocState.activeMenu]);

  // state to view different exercise on the same page in the same frame
  const [exerciseView, setExerciseView] = useState(0);
  const pathname = props.location.pathname;
  console.log(exercise);

  let contextRef = createRef(); // reference to instructions field

  // state to show default instructions
  const [defaultInstruction, setdefaultInstruction] = useState(true);
  // instructions for pictures
  const instructions = [
    "Suchen Sie im Bild nach aktiven Bereichen und überprüfen Sie ob alles in Ordnung ist!",
    "Waschbecken",
    "Garderobe für Arbeitskleidung"
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
            {exercise.firstLayer[0].done ? (
              <Image src={i2} />
            ) : (
              <Image src={i1} />
            )}

            <Link
              className="absolute hoverReveal pointer"
              style={style_garderobe}
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
                    <Image src={i5} />
                  ) : (
                    <Image src={i3} />
                  )
                }
                context={contextRef}
                content={instructions[2]}
                position="top center"
                basic
                className="instructionsPopup"
                onOpen={handleOpenInstruction}
                onClose={handleOpenInstruction}
                mouseEnterDelay={200}
                mouseLeaveDelay={200}
              />
            </Link>
            <Link
              className="absolute hoverReveal pointer"
              style={style_waschbecken}
              to={{
                pathname: `${pathname}/${exercise.firstLayer[1].secondLayer.filename}`,
                state: {
                  currentExercise: exercise.firstLayer[1]
                }
              }}
            >
              <Popup
                trigger={<Image src={i4} />}
                context={contextRef}
                content={instructions[1]}
                position="top center"
                basic
                className="instructionsPopup"
                onOpen={handleOpenInstruction}
                onClose={handleOpenInstruction}
                mouseEnterDelay={200}
                mouseLeaveDelay={200}
              />
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

export default Waschbecken_garderobe;
