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
  const INITIAL_PAGE_STATE = getRootPages(tocPages);
  // object with array of ids in tree of tocPages depending on current path(exercise od page)
  const INITIAL_TREE_PATH = getTreePath();
  // first object(exercisesState) has all array of exercises, current exercise, number of done exercise ,
  //second object(tocPagesMap) is a map of all existing pages
  const INITIAL_EXERCISES_STATE = getExercisesState();
  const [tocState, setTocState] = useState({
    //activePageLink: path,
    activeMenuPage: INITIAL_PAGE_STATE.currentPage,
    activeMenu: INITIAL_PAGE_STATE.index,
    currentExerciseByPath: INITIAL_PAGE_STATE.currentPage,
    exercisesState: INITIAL_EXERCISES_STATE.exercisesState,
    treeIdsPath: INITIAL_TREE_PATH,
    tocPagesMap: INITIAL_EXERCISES_STATE.tocPagesMap,
    stopAllAnimations: false
  });
  function getRootPages(rootPages) {
    let changedRootPages = rootPages.map(e => findNode(path, e));
    let currentExercise = changedRootPages.find(element => element);
    let currentActiveMenu = changedRootPages.findIndex(element => element);
    let result = { index: currentActiveMenu, currentPage: currentExercise };
    return result;
  }
  function getExercisesState() {
    let exercisesState = {
      allExercises: [],
      doneCount: 0,
      totalExercisesCount: 0
    };
    const tocPagesMap = {};
    function checkNodeArrays(page) {
      for (let index = 0; index < page.length; index++) {
        const element = page[index];
        // here tocPagesMap will be filled with all nodes
        tocPagesMap[element.id] = element;
        if (element.type === 1) {
          // push in array
          exercisesState.allExercises.push(element);
          if (element.done) exercisesState.doneCount++;
        } else {
          if (element.pages) {
            checkNodeArrays(element.pages);
          }
        }
      }
      exercisesState.totalExercisesCount = exercisesState.allExercises.length;
      //console.log(exercisesState);

      return exercisesState;
    }
    return {
      exercisesState: checkNodeArrays(tocPages),
      tocPagesMap: tocPagesMap
    };
  }
  function getTreePath() {
    const arr = [];
    const pathname = props.location.pathname;
    const local_path =
      pathname === "/"
        ? "/"
        : pathname
            .split("/")
            .slice(-1)
            .pop();
    // recursive find all connectiog nodes and final node , return id of them as array last->first
    function checkNodeArrays(page) {
      for (let index = 0; index < page.length; index++) {
        const element = page[index];

        if (element.filename === local_path) {
          arr.push(element.id);

          return true;
        } else {
          if (element.pages) {
            if (checkNodeArrays(element.pages, local_path)) {
              arr.push(element.id);
              return true;
            }
          }
        }
      }
    }
    checkNodeArrays(tocPages);
    return arr;
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
    let s = getRootPages(tocPages);
    setTocState(oldState => ({
      ...oldState,
      activeMenuPage: s.currentPage,
      currentExerciseByPath: s.currentPage,
      exercisesState: getExercisesState().exercisesState,
      treeIdsPath: getTreePath()
    }));
    console.log(tocState);
  }, [props.location.pathname, tocState.activeMenu]);

  return (
    <TocContext.Provider value={[tocState, setTocState]}>
      {props.children}
    </TocContext.Provider>
  );
};
