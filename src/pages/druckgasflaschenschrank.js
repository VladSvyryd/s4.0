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
    "Ungesicherte Druckflasche",
    "Druckgasflaschenschrank"
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

  const style_as_done = {
    left: "181px",
    top: "126px",
    backgroundImage: `url('${exercise && exercise.firstLayer[0].done && i4}')`,
    backgroundRepeat: "no-repeat"
  };
  const style_as_not_done = {
    left: "26px",
    top: "227px",
    backgroundImage: `url('${exercise && exercise.firstLayer[0].done && i2}')`,
    backgroundRepeat: "no-repeat"
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
              style={
                exercise.firstLayer[0].done ? style_as_done : style_as_not_done
              }
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
                content={
                  exercise.firstLayer[0].done
                    ? instructions[2]
                    : instructions[1]
                }
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

export default Druckgasflaschenschrank;
