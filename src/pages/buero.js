import React, { useContext, useState, useEffect, useReducer } from "react";
import { Grid, Icon, Image } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import reducer from "../util/reducer";

import i1 from "../assets/pics/1_buero/ordner.jpg";

function Buero() {
  const [tocPages] = useContext(PagesContext);
  const [tocState, setTocState] = useContext(TocContext);
  const [exercise, saveExerciseState] = useReducer(
    reducer,
    tocPages[tocState.activeMenu]
  );
  const saveExercise = () => {
    saveExerciseState({ type: "done", payload: exercise });
  };

  // callback function to trigger save of exercise each time exercise state has been changed
  useEffect(() => {
    tocPages[tocState.activeMenu] = exercise;
    localStorage.setItem("pagesList", JSON.stringify(tocPages));
  }, [exercise]);

  return (
    <>
      <div className="exerciseFrame">
        <div className="relative">
          <Image src={i1} />
          <div
            className="absolute"
            style={{
              right: "234px",
              top: "20px",
              width: "100px",
              height: "442px",
              backgroundColor: "orange"
            }}
          >
            Button 1
          </div>
          <div
            className="absolute"
            style={{
              right: "133px",
              top: "20px",
              backgroundColor: "red",
              width: "100px",
              height: "442px"
            }}
          >
            Button 2
          </div>
        </div>
        <div className="centered">
          <div className="textIntro">
            <p>
              <b>Ansicht Büro</b>
            </p>
            <p>
              Für den Laborbetrieb sind eine Reihe von Dokumentationen
              vorgeschrieben.
            </p>
            <p>
              Prüfen Sie die einzelnen Ordner, ob alle Angaben richtig und
              vollständig sind.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Buero;
