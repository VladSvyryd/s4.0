import React, { useContext, useState, useEffect, createRef } from "react";
import { Link } from "react-router-dom";
import { Image, Popup } from "semantic-ui-react";
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
import i10 from "../assets/pics/10-arbeitsplatz/fenster_zu_passiv.jpg";

function Arbeitsplatz(props) {
  // global state of pages
  const [tocPages] = useContext(PagesContext);
  // state to go through active page
  const [tocState, setTocState] = useContext(TocContext);

  // state to manage exercise object state
  const [exercise, setExercise] = useState(tocPages[tocState.activeMenu]);

  let contextRef = createRef(); // reference to instructions field
  // state to show default instructions
  const [defaultInstruction, setdefaultInstruction] = useState(true);
  // instructions for pictures
  const instructions = [
    "Suchen Sie im Bild nach aktiven Bereichen und überprüfen Sie ob alles in Ordnung ist!",
    "Geschlossenes Fenster",
    "Schüttler und Desinfektionsmittel",
    "Hygieneplan"
  ];
  const handleOpenInstruction = () => {
    setdefaultInstruction(old => (old = !old));
  };

  const pathname = props.location.pathname;
  console.log(exercise);

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

  const style_1 = {
    left: "50px",
    top: "219px",
    backgroundImage: `url('${exercise && exercise.firstLayer[1].done && i7}')`,
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
            {exercise.firstLayer[0].done ? (
              <Image src={i2} />
            ) : (
              <Image src={i1} />
            )}
            <Link
              className="absolute hoverReveal pointer"
              style={style_2}
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
                    <Image src={i8} />
                  ) : (
                    <Image src={i3} />
                  )
                }
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
            <Link
              className="absolute hoverReveal pointer"
              style={style_1}
              to={{
                pathname: `${pathname}/${exercise.firstLayer[1].secondLayer.filename}`,
                state: {
                  currentExercise: exercise.firstLayer[1]
                }
              }}
            >
              <Popup
                trigger={
                  exercise.firstLayer[1].done ? (
                    <Image src={i5} />
                  ) : (
                    <Image src={i4} />
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
            <div
              className="absolute hoverReveal pointer"
              style={style_3}
              to={{
                pathname: `${pathname}/${exercise.firstLayer[2].secondLayer.filename}`,
                state: {
                  currentExercise: exercise.firstLayer[2]
                }
              }}
            >
              <Popup
                trigger={<Image src={i6} />}
                context={contextRef}
                content={instructions[3]}
                position="top center"
                basic
                className="instructionsPopup"
                onOpen={handleOpenInstruction}
                onClose={handleOpenInstruction}
                mouseEnterDelay={200}
                mouseLeaveDelay={200}
              />
            </div>
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

export default Arbeitsplatz;
