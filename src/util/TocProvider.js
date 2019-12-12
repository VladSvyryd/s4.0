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
  const INITIAL_STATE = getRootPages(tocPages);
  const [tocState, setTocState] = useState({
    //activePageLink: path,
    activeMenuPage: INITIAL_STATE.currentPage,
    activeMenu: INITIAL_STATE.index,
    currentExerciseByPath: INITIAL_STATE.currentPage
  });
  function getRootPages(rootPages) {
    let changedRootPages = rootPages.map(e => findNode(path, e));
    let currentExercise = changedRootPages.find(element => element);
    let currentActiveMenu = changedRootPages.findIndex(element => element);
    let result = { index: currentActiveMenu, currentPage: currentExercise };
    return result;
  }

  function findNode(currentPath, currentNode) {
    var i, currentChild, result;

    if (currentPath == currentNode.filename) {
      return currentNode;
    } else {
      // Use a for loop instead of forEach to avoid nested functions
      // Otherwise "return" will not work properly
      for (
        i = 0;
        currentNode.pages !== undefined && i < currentNode.pages.length;
        i += 1
      ) {
        currentChild = currentNode.pages[i];

        // Search in the current child
        result = findNode(currentPath, currentChild);

        // Return the result if the node has been found
        if (result !== false) {
          return result;
        }
      }

      // The node has not been found and we have no more options
      return false;
    }
  }

  function findActiveMenuByPath() {
    return tocPages.findIndex(node => {
      return node.node.filename === path;
    });
  }
  // if it is normal page, else if it is an accordion, or if this is first start of the programm
  function setActivePage() {
    return tocPages.find(e => e.node.filename === path);
  }
  useEffect(() => {
    console.log("isTriggerd");
    let s = getRootPages(tocPages);
    setTocState(oldState => ({
      ...oldState,
      activeMenuPage: s.currentPage,
      currentExerciseByPath: s.currentPage
    }));
  }, [props.location.pathname, tocState.activeMenu]);

  return (
    <TocContext.Provider value={[tocState, setTocState]}>
      {props.children}
    </TocContext.Provider>
  );
};
