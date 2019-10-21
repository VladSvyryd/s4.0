import React from "react";
import "./body.css";
import Dashboard from "./Dashboard/Dashboard";
import "react-resizable/css/styles.css";

// Body
// has [TOC, Notes, Dashboard] as Children Components
// Uses Draggable, ResizableBox to make Windows flexible on the screen.
// Input chapter, wState(WindowStates), tocPages
// Output Draggable and Resizable Toc,Notes,Search interactive windows | handle clicks of all these listed components
// Dashboard -> is a placeholder for pages that have to be loaded accoarding to programm state

// Custom components as Transition,ResizableBox,Draggable  look in imports and if needed open docs in google, to understand it's properties used in "return()"

const Body = props => {
  return (
    <main id="panel">
      <div className="bodyContent">
        {
          //<div className="pageTitle">{setUpPageTitle()}</div>
        }
        <Dashboard />
      </div>
    </main>
  );
};

export default Body;
