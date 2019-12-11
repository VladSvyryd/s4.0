import React, { useState, createContext, useContext, useEffect } from "react";
import { PagesContext } from "./PagesProvider";
import pagesA from "../components/Body/Toc/seitenliste_kapa";
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
    activeMenuPage: t(pagesA).currentPage,
    activeMenu: t(pagesA).index,
    currentExerciseByPath: t(pagesA).currentPage
  });

  function t(rootPages) {
    let changedRootPages = rootPages.map(e => findNode(path, e));
    let currentExercise = changedRootPages.find(element => element);
    let currentActiveMenu = changedRootPages.findIndex(element => element);
    return { index: currentActiveMenu, currentPage: currentExercise };
  }
  //
  function findNode(currentPath, currentNode) {
    if (currentPath == currentNode.filename) {
      return { currentNode: currentNode };
    } else {
      var result;
      currentNode.pages.forEach(node => {
        if (node.filename === currentPath) {
          result = { currentNode: node, prevNode: currentNode };
          return;
        }
      });
      return result ? result : "No Node Found";
    }
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

  function findLevels(p, arr) {
    if (p.pages && p.pages.length > 0) {
      let array = arr;
      array.push(p.filename);
      console.log(arr);
      findLevels(p.pages, array);
    } else {
      arr.push(p);

      return arr;
    }
    //return arr;
  }

  function test() {
    let nodes = JSON.parse(localStorage.getItem("pagesList"));
    nodes.forEach(element => {
      do_PathSearch(element);
    });
  }
  function do_PathSearch(node) {
    //let node = JSON.parse(localStorage.getItem("pagesList"))[5];
    console.log(node);
    console.log("this is pathname: ", pathname);
    console.log("this is current path: ", path);
    const isNode = node.firstLayer.some(
      e => e.secondPages && e.secondPages.length > 0
    );
    console.log("Node: ", node, "isNode: ", isNode);
    let myOwnPath = [];
    if (isNode) {
      let endOfNodePath = node.node.filename;
      myOwnPath.push(endOfNodePath);
      console.log(checkAllSecondPages(node.firstLayer));
      if (checkAllSecondPages(node.firstLayer))
        myOwnPath.push(
          checkAllSecondPages(node.firstLayer).thirdLayer.filename
        );
    } else {
      myOwnPath.push(node.filename);
      //do_PathSearch(node.pages);
    }
    console.log(myOwnPath);
  }
  function checkAllSecondPages(currentNode) {
    return currentNode
      .map(e => {
        return e.secondPages.find(e => {
          return e.thirdLayer ? e.thirdLayer.filename === path : null;
        });
      })
      .find(e => e);
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
    setTocState(oldState => ({
      ...oldState,
      activeMenuPage: t(pagesA).currentPage,
      currentExerciseByPath: t(pagesA).currentPage
    }));
  }, [props.location.pathname, tocState.activeMenu]);
  return (
    <TocContext.Provider value={[tocState, setTocState]}>
      {props.children}
    </TocContext.Provider>
  );
};
