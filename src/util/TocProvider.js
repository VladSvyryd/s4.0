import React, { useState, createContext, useContext, useEffect } from "react";
import { PagesContext } from "./PagesProvider";

// TocProvider/TocContenxt
// Manage global state of TOC MENU. Provide all components about state of "Inhalt" (activePageLink, activeAccordionIndex,currentPage)

export const TocContext = createContext();

export const TocProvider = props => {
  // on the first statr, redirect to main menu
  const pathname = props.location.pathname;
  const path =
    pathname === "/"
      ? "/"
      : pathname
          .split("/")
          .slice(-1)
          .pop();

  // load global state of tocPages
  const [tocPages] = useContext(PagesContext);

  // set up state of TOC, with it's main properties
  const [tocState, setTocState] = useState({
    activePageLink: path,
    activeMenuPage: setActivePage(),
    activeMenu: findActiveMenuByPath(),
    exerciseList:
      JSON.parse(localStorage.getItem("labor_checklist_state")) || []
  });
  localStorage.setItem(
    "labor_checklist_state",
    JSON.stringify(tocState.exerciseList)
  );
  function findActiveMenuByPath() {
    return tocPages.findIndex(node => {
      return node.node.filename === path;
    });
  }
  console.log(tocState);
  // if it is normal page, else if it is an accordion, or if this is first start of the programm
  function setActivePage() {
    return tocPages[findActiveMenuByPath()];
  }

  useEffect(() => {
    setTocState(oldState => ({
      ...oldState,
      activeMenuPage: setActivePage()
    }));
  }, [props.location.pathname, tocState.activeMenu]);
  return (
    <TocContext.Provider value={[tocState, setTocState]}>
      {props.children}
    </TocContext.Provider>
  );
};
