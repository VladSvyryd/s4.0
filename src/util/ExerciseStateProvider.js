import React, { useState, useContext, createContext } from "react";
import { PagesContext } from "./PagesProvider";

export const ExerciseContext = createContext();

export const ExerciseStateProvider = props => {
  // load global state of tocPages
  const [tocPages] = useContext(PagesContext);
  // create initial state at the start of the programm

  const [exerciseState, setExerciseState] = useState(
    JSON.parse(localStorage.getItem("labor_checklist_state")) || { tocPages }
  );
  // each time using setWindowsStates will save data into local storage
  localStorage.setItem("windowsStates", JSON.stringify(exerciseState));
  return (
    //provides windowsStates as flobal State in APP
    <ExerciseContext.Provider value={[exerciseState, setExerciseState]}>
      {props.children}
    </ExerciseContext.Provider>
  );
};
