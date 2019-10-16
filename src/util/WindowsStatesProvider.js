import React, { useState, createContext } from "react";

export const WindowsContext = createContext();
// create initial state at the start of the programm
const INITIAL_STATE = JSON.parse(localStorage.getItem('windowsStates')) || {
  menu: { openned: true, initPosition: { x: 0, y: 0 }, position: { x: 0, y: 0 }, notMovable: true, initialVolume: { width: 260, height: 596 }, volume: { width: 260, height: 596 } },
  notes: { openned: false, initPosition: { x: 0, y: 0 }, position: { x: 0, y: 0 }, notMovable: true, initialVolume: { width: 260, height: 596 }, volume: { width: 260, height: 596 } }
};
export const WindowsStatesProvider = props => {

  const [windowsStates, setWindowsStates] = useState(INITIAL_STATE);
  // each time using setWindowsStates will save data into local storage 
  localStorage.setItem('windowsStates', JSON.stringify(windowsStates))
  return (
    //provides windowsStates as flobal State in APP
    <WindowsContext.Provider value={[windowsStates, setWindowsStates]}>
      {props.children}
    </WindowsContext.Provider>
  );
};
