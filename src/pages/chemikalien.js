import React, { useContext, useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import { Grid, Icon, Image } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i4 from "../assets/pics/4-chemiekalienschrank/startbild_sw_mit_flasche.jpg";
import i1 from "../assets/pics/4-chemiekalienschrank/regal_mit_flasche.jpg";
import i2 from "../assets/pics/4-chemiekalienschrank/regal_ohne_flasche.jpg";
import i3 from "../assets/pics/2-chemielaboreingang/tuer_richtig.jpg";
import i5 from "../assets/pics/2-chemielaboreingang/dusche_btn.jpg";
import i6 from "../assets/pics/2-chemielaboreingang/augendusche_btn_falsch.jpg";
import i7 from "../assets/pics/2-chemielaboreingang/augendusche_btn_richtig.jpg";
import i8 from "../assets/pics/4-chemiekalienschrank/startbild_sw_mit_flasche.jpg";
import i9 from "../assets/pics/achtung.png";

function Chemikalien(props) {
  // global state of pages
  const [tocPages] = useContext(PagesContext);
  // state to go through active page
  const [tocState, setTocState] = useContext(TocContext);
  console.log(tocState);

  // state to manage exercise object state
  const [exercise, setExercise] = useState(tocPages[tocState.activeMenu]);
  // state to view different exercise on the same page in the same frame
  const [exerciseView, setExerciseView] = useState(0);
  const pathname = props.location.pathname;
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
      <div className="exerciseFrame">
        <div className="relative">
          <Image src={i4} />
          <Link
            className="absolute hoverReveal pointer"
            style={{
              right: "10px",
              top: "35px",
              backgroundImage: `url('${exercise.firstLayer[0].done && i3}')`,
              backgroundRepeat: "no-repeat",
              width: "266px"
            }}
            to={{
              pathname: `${pathname}/${exercise.firstLayer[0].secondLayer.filename}`,
              state: {
                currentExercise: exercise.firstLayer[0]
              }
            }}
          >
            {exercise.firstLayer[0].done ? (
              <Image src={i2} />
            ) : (
              <Image src={i1} />
            )}
          </Link>

          <Link
            className="absolute hoverReveal pointer"
            style={{
              left: "70px",
              top: "140px",
              backgroundImage: `url('${exercise.firstLayer[1].done && i8}')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "232px 371px"
            }}
            to={{
              pathname: `${pathname}/${exercise.firstLayer[1].secondLayer.filename}`,
              state: {
                currentExercise: exercise.firstLayer[1]
              }
            }}
          >
            {exercise.firstLayer[0].done ? (
              <Image src={i7} />
            ) : (
              <Image src={i6} />
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
                  Alle sicherheitstechnischen Einrichtungen eines Labors müssen
                  einwandfrei funktionieren, damit sie im Gefahrfall
                  einsatzbereit sind.
                </p>
                <p>
                  Finden Sie heraus, was Sie an dieser Situation noch verbessern
                  können.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return introExercise();
}

export default Chemikalien;
