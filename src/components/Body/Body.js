import React, { useContext, useState } from "react";
import "./body.css";
import Toc from "./Toc/Toc";
import Dashboard from "./Dashboard/Dashboard";
import Draggable from "react-draggable";
import { WindowsContext } from "../../util/WindowsStatesProvider";
import { Transition } from "semantic-ui-react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import NotesForm from "./NotesForm/NotesForm";
import { TocContext } from "../../util/TocProvider";

// Body
// has [TOC, Notes, Dashboard] as Children Components
// Uses Draggable, ResizableBox to make Windows flexible on the screen.
// Input chapter, wState(WindowStates), tocPages
// Output Draggable and Resizable Toc,Notes,Search interactive windows | handle clicks of all these listed components
// Dashboard -> is a placeholder for pages that have to be loaded accoarding to programm state

// Custom components as Transition,ResizableBox,Draggable  look in imports and if needed open docs in google, to understand it's properties used in "return()"

const Body = props => {
  const [wStates, setWStates] = useContext(WindowsContext);
  const [tocPages] = useContext(TocContext);
  // localy use state of Toc
  const [deltaPositionTOC, setdeltaPositionTOC] = useState(
    wStates.menu.position
  );
  // localy use state of Notes
  const [deltaPositionNOTES, setdeltaPositionNOTES] = useState(
    wStates.notes.position
  );

  // Toggle draggable Events on Windows and update its global State
  function handleDragableTOCClick() {
    if (wStates.menu.position.x === 0) {
      setdeltaPositionTOC({ x: 50, y: 50 });
    } else {
      setdeltaPositionTOC(wStates.menu.position);
    }
    if (
      !wStates.menu.notMovable &&
      wStates.notes.openned &&
      wStates.notes.notMovable
    )
      handleNotesToggle();
    setWStates(oldOnes => ({
      menu: {
        ...oldOnes.menu,
        notMovable: !oldOnes.menu.notMovable
      },
      notes: { ...oldOnes.notes }
    }));
  }

  // Notes Draggable
  function handleDragableNOTESClick() {
    if (wStates.notes.position.x === 0) {
      setdeltaPositionNOTES({ x: 75, y: 75 });
    } else {
      setdeltaPositionNOTES(wStates.notes.position);
    }
    if (
      !wStates.notes.notMovable &&
      wStates.menu.openned &&
      wStates.menu.notMovable
    )
      handleMenuToggle();
    setWStates(oldOnes => ({
      menu: {
        ...oldOnes.menu
      },
      notes: {
        ...oldOnes.notes,
        notMovable: !oldOnes.notes.notMovable
      }
    }));
  }

  // Close/Open Menu Events | update of global state
  const handleMenuToggle = () => {
    if (
      wStates.notes.openned &&
      wStates.notes.notMovable &&
      wStates.menu.notMovable
    )
      handleNotesToggle();
    //let newposition;
    //if (!wStates.menu.notMovable) newposition = wStates.menu.initPosition;
    setdeltaPositionTOC(wStates.menu.initPosition);
    setWStates(oldOnes => ({
      menu: {
        ...oldOnes.menu,
        notMovable: true,
        openned: !oldOnes.menu.openned
      },
      notes: { ...oldOnes.notes }
    }));
  };

  // Close/Open Notes Events | update its global state
  const handleNotesToggle = () => {
    if (
      wStates.menu.openned &&
      wStates.menu.notMovable &&
      wStates.notes.notMovable
    )
      handleMenuToggle();
    //let newposition;
    //if (!wStates.notes.notMovable) newposition = wStates.notes.initPosition;
    setdeltaPositionNOTES(wStates.notes.initPosition);
    setWStates(oldOnes => ({
      menu: { ...oldOnes.menu },
      notes: {
        ...oldOnes.notes,
        notMovable: true,
        openned: !oldOnes.notes.openned
      }
    }));
  };

  // event that catches actual position after stop dragging and update global state of this Window, as well TOC as Notes or Search (in production)
  const handleStopDragging = (e, ui) => {
    if (ui.node.classList.contains("TOC")) {
      let x = deltaPositionTOC.x + ui.deltaX;
      let y = deltaPositionTOC.y + ui.deltaY;
      setWStates(oldOnes => ({
        menu: {
          ...oldOnes.menu,
          position: {
            x: x,
            y: y
          }
        },
        notes: { ...oldOnes.notes }
      }));
    } else if (ui.node.classList.contains("NOTES")) {
      let x = deltaPositionNOTES.x + ui.deltaX;
      let y = deltaPositionNOTES.y + ui.deltaY;
      setWStates(oldOnes => ({
        menu: {
          ...oldOnes.menu
        },
        notes: {
          ...oldOnes.notes,
          position: {
            x: x,
            y: y
          }
        }
      }));
    }
  };

  // update global window state to
  const handleDrag = (e, ui) => {
    if (ui.node.classList.contains("TOC")) {
      let x = deltaPositionTOC.x + ui.deltaX;
      let y = deltaPositionTOC.y + ui.deltaY;
      setdeltaPositionTOC({
        x: x,
        y: y
      });
    } else if (ui.node.classList.contains("NOTES")) {
      let x = deltaPositionNOTES.x + ui.deltaX;
      let y = deltaPositionNOTES.y + ui.deltaY;
      setdeltaPositionNOTES({
        x: x,
        y: y
      });
    }
  };

  //update global state of widows after it's resizing | update all windows at once#
  // important is className <ResizableBox className="toc_box"></ResizableBox> of elements, to decide which state to update

  const handleResizeStop = (event, ui) => {
    console.log(ui.node.parentElement.classList[0], {
      width: ui.size.width,
      height: ui.size.height
    });
    switch (ui.node.parentElement.classList[0]) {
      case "toc_box":
        setWStates(oldOnes => ({
          ...oldOnes,
          menu: {
            ...oldOnes.menu,
            volume: {
              width: ui.size.width,
              height: ui.size.height
            }
          }
        }));
        break;
      case "notes_box":
        setWStates(oldOnes => ({
          ...oldOnes,
          notes: {
            ...oldOnes.notes,
            volume: {
              width: ui.size.width,
              height: ui.size.height
            }
          }
        }));
        break;
      case "search_box":
        break;
      default:
        break;
    }
  };

  // used to setUp a title of the page
  const setUpPageTitle = () => {
    return (
      tocPages.currentPage.kuerzel + " " + tocPages.currentPage.verweis_titel
    );
  };
  return (
    <main id="panel">
      <div className="toc">
        <Transition
          visible={wStates.menu.openned}
          animation="scale"
          duration={500}
        >
          <div>
            <Draggable
              handle=".handle"
              defaultPosition={wStates.menu.initPosition}
              position={
                !wStates.menu.notMovable
                  ? deltaPositionTOC
                  : wStates.menu.initPosition
              }
              onStop={handleStopDragging}
              onDrag={handleDrag}
              disabled={wStates.menu.notMovable}
              defaultClassName="draggable TOC"
            >
              <div>
                <ResizableBox
                  className="toc_box"
                  width={
                    wStates.menu.notMovable
                      ? wStates.menu.initialVolume.width
                      : wStates.menu.volume.width
                  }
                  height={
                    wStates.menu.notMovable
                      ? wStates.menu.initialVolume.height
                      : wStates.menu.volume.height
                  }
                  onResizeStop={handleResizeStop}
                  minConstraints={[260, 500]}
                  maxConstraints={[500, 800]}
                  axis={wStates.menu.notMovable ? "none" : "both"}
                >
                  <div>
                    <div className="handle" id="toc_titel">
                      <span
                        className={
                          wStates.menu.notMovable
                            ? "button-pin"
                            : "button-unpin"
                        }
                        onClick={() => handleDragableTOCClick()}
                        id="tocPinButton"
                      />
                      <span>Inhaltsverzeichnis</span>
                      <span className="button-close" onClick={handleMenuToggle}>
                        &#10005;
                      </span>
                    </div>
                  </div>
                  <Toc {...props} />
                </ResizableBox>
              </div>
            </Draggable>
          </div>
        </Transition>
        <Transition
          visible={wStates.notes.openned}
          animation="scale"
          duration={500}
        >
          <div>
            <Draggable
              handle=".handle"
              defaultPosition={wStates.notes.initPosition}
              position={
                !wStates.notes.notMovable
                  ? deltaPositionNOTES
                  : wStates.notes.initPosition
              }
              onStop={handleStopDragging}
              onDrag={handleDrag}
              disabled={wStates.notes.notMovable}
              defaultClassName="draggable NOTES"
            >
              <div>
                <ResizableBox
                  className="notes_box"
                  width={
                    wStates.notes.notMovable
                      ? wStates.notes.initialVolume.width
                      : wStates.notes.volume.width
                  }
                  height={
                    wStates.notes.notMovable
                      ? wStates.notes.initialVolume.height
                      : wStates.notes.volume.height
                  }
                  onResizeStop={handleResizeStop}
                  minConstraints={[260, 500]}
                  maxConstraints={[500, 800]}
                  axis={wStates.notes.notMovable ? "none" : "both"}
                >
                  <div>
                    <div className="handle" id="toc_titel">
                      {" "}
                      <span
                        className={
                          wStates.notes.notMovable
                            ? "button-pin"
                            : "button-unpin"
                        }
                        onClick={() => handleDragableNOTESClick()}
                        id="tocPinButton"
                      >
                        {" "}
                      </span>{" "}
                      <span>Notizen</span>{" "}
                      <span
                        className="button-close"
                        onClick={() => handleNotesToggle()}
                      >
                        &#10005;
                      </span>
                    </div>
                  </div>
                  <div className="notes">
                    <NotesForm {...props} />
                  </div>
                </ResizableBox>
              </div>
            </Draggable>
          </div>
        </Transition>
      </div>
      <div className="bodyContent">
        <div className="pageTitle">{setUpPageTitle()}</div>
        <Dashboard />
      </div>
    </main>
  );
};

export default Body;
