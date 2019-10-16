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
  const getIndexOfActiveAccordion = t => {
    let currentPath = props.location.pathname
      .split("/")
      .slice(-1)
      .pop();
    let result;
    t.forEach((element, index) => {
      if (element.content) {
        element.content.map((link, i) => {
          if (link.filename === currentPath) {
            result = index;
          }
        });
      } else {
        if (element.filename === currentPath) {
          result = index;
        }
      }
    });
    return result;
  };

  // if it is normal page, else if it is an accordion, or if this is first start of the programm
  const setActivePage = () => {
    let result;
    if (
      tocPages[getIndexOfActiveAccordion(tocPages)] &&
      tocPages[getIndexOfActiveAccordion(tocPages)].filename
    ) {
      result = tocPages[getIndexOfActiveAccordion(tocPages)];
    } else if (
      tocPages[getIndexOfActiveAccordion(tocPages)] &&
      tocPages[getIndexOfActiveAccordion(tocPages)].content
    ) {
      tocPages[getIndexOfActiveAccordion(tocPages)].content.map(page => {
        if (page.filename === path) {
          result = page;
        }
      });
    } else {
      result = tocPages[0];
    }
    return result;
  };

  // set up state of TOC, with it's main properties
  const [tocState, setTocState] = useState({
    activePageLink: path,
    activeAccordionIndex: getIndexOfActiveAccordion(tocPages) || 0,
    currentPage: setActivePage()
  });
  //console.log(tocState);
  // this function listens to changes of current activa Page link, Example: click on Link in Notes, or changes in global page, Example: change og Chapter, and parses all Nodes and Linkts in TOC again
  useEffect(() => {
    const pathname = props.location.pathname;
    const path = pathname
      .split("/")
      .slice(-1)
      .pop();
    setTocState(oldState => ({
      ...oldState,
      activePageLink: path,
      activeAccordionIndex: getIndexOfActiveAccordion(tocPages) || 0,
      currentPage: setActivePage()
    }));
    let state = { state: { last_visited_page: props.location.pathname } };
    localStorage.setItem("mt_state", JSON.stringify(state));
  }, [props.location.pathname, tocState.activePageLink]);
  return (
    <TocContext.Provider value={[tocState, setTocState]}>
      {props.children}
    </TocContext.Provider>
  );
};
