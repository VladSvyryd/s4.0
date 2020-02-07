import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Grid, Image, Transition } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i4 from "../assets/pics/frage.png";
import i5 from "../assets/pics/achtung_gruen.png";
import DropBox from "../components/DropBox";
import DraggableItem from "../components/DraggableItem";
import markNodeDone from "../util/externalFunctions";
import i_q from "../assets/pics/querverweis.png";

// to create drag and drop component used external library  react-drag-drop-container
// https://github.com/peterh32/react-drag-drop-container <---- this is github page with instructions
// to create exercise you need to Objects DropBox (Object that recieves draggables) and DraggableItem (Object to Drag)
// the logic of exercises flows into DropBox, which has check of exerciseBitValue and currentBitValue of recieved by DropBox Draggables
// the isDone() function goes from this Parent component into DropBox to be activated as soon as th exercise has been done

function Prueffristen(props) {
  // state to go through active page
  const [tocState] = useContext(TocContext);
  // load global state of tocPages
  const [, setTocPages] = useContext(PagesContext);
  // recieved exercise object as state from page with exercises
  // each Link to exercise has such params
  const [my_exercise, setMyExercise] = useState(
    (props.location.state && props.location.state.currentExercise) ||
      tocState.currentExerciseByPath
  );
  const [exerciseCurrentState, setExerciseCurrentState] = useState(0);
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const instructions = [
    "Diese Zuordnung war falsch!",
    "Ordnen Sie die Laborgeräte den empfohlenen Prüffristen zu, indem Sie die Begriffe in die jeweilige Spalte ziehen.",
    "Klicken Sie auf eine beliebige Position, um in die vorherige Ansicht zu gelangen."
  ];
  const [currentInstruction, setCurrentInstruction] = useState(
    my_exercise && my_exercise.done ? instructions[2] : instructions[1]
  );

  // handle change of exerciseCurrentState,
  //set state of exercise,
  //add click event to get back to other exercise
  const handleExerciseIsDone = () => {
    setAnimationTrigger(true);
    isDone();
  };
  // add click event to document to return to other exercises and reset click events
  const handleClickToReturnBack = () => {
    props.history.goBack();
  };

  // reset state of current exercise
  const resetAllAnswers = () => {
    setExerciseCurrentState("this");
    removeClick();
  };

  // reset click event on document
  const removeClick = () => {
    document.removeEventListener("mousedown", resetAllAnswers);
  };

  // set exercise as done
  // get pages object from local storage, change with new state, trigger tocPages events to save pages object back to local storage
  function isDone() {
    // parse pages from local storage
    let pagesFromLocalStorage = JSON.parse(localStorage.getItem("pagesList"));
    // performe change of property "done" in JSON Exerciselist object
    pagesFromLocalStorage.forEach(e => markNodeDone(my_exercise.id, e));

    // trigger tocPages function to resave Pages on local storage
    setTocPages(pagesFromLocalStorage);
    // change local state of exercise as done to trigger changes on the Page
    setMyExercise(old => ({
      ...old,
      done: !old.done
    }));
  }

  const droppableStyle = {
    width: "165px",
    height: "196px",
    display: "flex",
    flexDirection: "column",
    background: "rgba(255,255,255,.9)",
    boxShadow: "inset rgba(0, 0, 0, 0.4) 3px 3px 11px",
    padding: "10px",
    margin: "5px"
  };

  const draggableSet = {
    display: "flex",
    flexDirection: "column"
  };

  const exercise = {
    draggableItems: [
      {
        id: 1,
        text: "Abzug"
      },
      { id: 2, text: "Körpernotdusche" },
      { id: 4, text: "Magnetrührer" },
      { id: 8, text: "Ultrazentrifuge" },
      {
        id: 16,
        text: "Sicherheitsschrank",
        extraText: "entzündbare Flüssigkeiten"
      },
      { id: 32, text: "Feuerlöscher" },
      {
        id: 64,
        text: "Sicherheitsschrank",
        extraText: "Druckgasflaschen"
      },

      {
        id: 128,
        text: "Elektroinstallation"
      },
      {
        id: 256,
        text: "Lüftungsanlage"
      }
    ],
    bitValueAnswer: [2, 4, 345, 32, 128]
  };
  // this array has "dr"+"arr[0]" index of droppable name to check if draggable can be dropped into droppable
  const droppableIdexes = [3, 1, 2, 3, 3, 4, 3, 5, 3];
  const itemsStyle = {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "rgba(208, 131, 21, 1)",
    padding: "7px 11px",
    margin: "6px 6px",
    width: "100%",
    boxShadow: "rgba(0, 0, 0, 0.4) 3px 1px 5px",
    color: "white",
    textAlign: "center"
  };

  // feedbackSuccess is true: it was match by drop, false: wrong element
  const handleFailToDropItem = feedbackSuccess => {
    if (my_exercise && !my_exercise.done) {
      feedbackSuccess
        ? setCurrentInstruction(instructions[1])
        : setCurrentInstruction(instructions[0]);
    }
  };
  // if exercise has been already done, go back
  useEffect(() => {
    localStorage.setItem("stopAllAnimations", true);
    if (my_exercise.done)
      document
        .getElementById("panel")
        .addEventListener("mousedown", handleClickToReturnBack);
    return () => {
      document
        .getElementById("panel")
        .removeEventListener("mousedown", handleClickToReturnBack);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleClickToReturnBack]);
  return (
    <>
      <div
        className="exerciseFrame ausstatung_entladung"
        style={{ backgroundColor: "rgba(255, 207, 139, 1)" }}
      >
        <Grid style={{ width: "100%" }} padded>
          <Grid.Row style={{ paddingBottom: "0" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                padding: "20px 50px 10px"
              }}
            >
              <div className="gridList" style={{ width: "480px" }}>
                <Image src={i4} />
                <div>
                  <p>
                    Regelmäßige und sorgfältige Kontrolle aller Arbeitsgeräte im
                    Labor ist eine wichtige sicherheitstechnische Maßnahme. Für
                    die einzelnen Geräte gibt es deshalb empfohlene Prüffristen
                    und Richtwerte, die eingehalten werden sollten.
                  </p>
                  <h1
                    className="my_title small"
                    style={{ paddingBottom: "0", marginTop: "0" }}
                  >
                    Ordnen Sie die Laborgeräte den empfohlenen Prüffristen zu.
                  </h1>
                </div>
              </div>

              <Transition
                as="div"
                visible={animationTrigger || (my_exercise && my_exercise.done)}
                animation="fade"
                duration={animationTrigger ? 700 : 0}
              >
                <div
                  className="absolute"
                  style={{
                    backgroundColor: "rgb(255, 207, 139)",
                    width: "100%",
                    height: "500px",
                    zIndex: 100,
                    left: 0
                  }}
                >
                  <div
                    className=" gridList "
                    style={{ columnGap: "17px", paddingLeft: "57px" }}
                  >
                    <Image src={i5} />
                    <div>
                      <span className="my_title small">Richtig!</span>
                      <p style={{ marginTop: "5px" }}>
                        Arbeitsgeräte im Labor werden regelmäßig auf ihre
                        einwandfreie Funktion überprüft.
                      </p>
                    </div>
                  </div>
                  <div
                    className="relative"
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "74px"
                    }}
                  >
                    <div>
                      <p style={{ textAlign: "center" }}>
                        <b>monatlisch</b>
                      </p>

                      <div style={droppableStyle}>
                        <div className="prueffristen itemIsDroppedState">
                          <span className="draggedContext">
                            Körpernotdusche
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p style={{ textAlign: "center" }}>
                        <b>halbjährlich</b>
                      </p>

                      <div style={droppableStyle}>
                        <div className="prueffristen itemIsDroppedState">
                          <span className="draggedContext">Magnetrührer</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p style={{ textAlign: "center" }}>
                        <b>jährlich</b>
                      </p>

                      <div style={droppableStyle}>
                        <div className="prueffristen itemIsDroppedState">
                          <span className="draggedContext">Abzug</span>
                        </div>
                        <div className="prueffristen itemIsDroppedState">
                          <span className="draggedContext">
                            Ultrazentrifuge
                          </span>
                        </div>
                        <div className="prueffristen itemIsDroppedState">
                          <span className="draggedContext">Lüftungsanlage</span>
                        </div>
                        <div className="prueffristen itemIsDroppedState">
                          <span className="draggedContext">
                            <span style={{ fontWeight: "bold" }}>
                              Sicherheitsschrank{" "}
                            </span>
                            <span style={{ fontSize: "10px" }}>
                              entzündbare Flüssigkeiten
                            </span>
                          </span>
                        </div>
                        <div className="prueffristen itemIsDroppedState">
                          <span className="draggedContext">
                            <span style={{ fontWeight: "bold" }}>
                              Sicherheitsschrank{" "}
                            </span>
                            <span style={{ fontSize: "10px" }}>
                              Druckgasflaschen
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p style={{ textAlign: "center" }}>
                        <b>zweijährlich</b>
                      </p>

                      <div style={droppableStyle}>
                        <div className="prueffristen itemIsDroppedState">
                          <span className="draggedContext">Feuerlöscher</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p style={{ textAlign: "center" }}>
                        <b>vierjährlich</b>
                      </p>

                      <div style={droppableStyle}>
                        <div className="prueffristen itemIsDroppedState">
                          <span className="draggedContext">
                            Elektroinstallation
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
              <div
                style={{
                  marginLeft: "50px",
                  width: "230px"
                }}
              >
                <p>
                  Weitere Informationen zu dieser Frage erhalten Sie in Kapitel
                  {"  "}
                  <a
                    target="_blank"
                    href="../../fachinformation-responsiv/kapb/prueffristen.htm"
                    className="externalLink"
                  >
                    <span className="linkContent">
                      <Image src={i_q} />B 12.3.1 Prüffristen
                    </span>
                  </a>
                </p>
              </div>
            </div>
            <div
              className="relative"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center"
              }}
            >
              <div>
                <p style={{ textAlign: "center" }}>
                  <b>monatlich</b>
                </p>
                <div style={droppableStyle}>
                  <DropBox
                    id="dr1"
                    name="dr1"
                    droppedItemsClass="prueffristen itemIsDroppedState"
                    exerciseBitValueAnswer={exercise.bitValueAnswer[0]}
                    exerciseCurrentState={exerciseCurrentState}
                    setExerciseCurrentState={setExerciseCurrentState}
                    multipleDropBitValueAnswer={511}
                    feedbackAboutSucces={""}
                    idDoneCallback={
                      // this triggers animation and exercise is Done
                      // this trieger has to be activated in DropBox by calling function isDoneCallb ack
                      handleExerciseIsDone
                    }
                  />
                </div>
              </div>
              <div>
                <p style={{ textAlign: "center" }}>
                  <b>halbjährlich</b>
                </p>
                <div style={droppableStyle}>
                  <DropBox
                    id="dr2"
                    name="dr2"
                    droppedItemsClass="prueffristen itemIsDroppedState"
                    exerciseBitValueAnswer={exercise.bitValueAnswer[1]}
                    exerciseCurrentState={exerciseCurrentState}
                    setExerciseCurrentState={setExerciseCurrentState}
                    multipleDropBitValueAnswer={511}
                    feedbackAboutSucces={""}
                    idDoneCallback={
                      // this triggers animation and exercise is Done
                      // this trieger has to be activated in DropBox by calling function isDoneCallb ack
                      handleExerciseIsDone
                    }
                  />
                </div>
              </div>
              <div>
                <p style={{ textAlign: "center" }}>
                  <b>jährlich</b>
                </p>
                <div style={droppableStyle}>
                  <DropBox
                    id="dr3"
                    name="dr3"
                    droppedItemsClass="prueffristen itemIsDroppedState"
                    exerciseBitValueAnswer={exercise.bitValueAnswer[2]}
                    exerciseCurrentState={exerciseCurrentState}
                    setExerciseCurrentState={setExerciseCurrentState}
                    multipleDropBitValueAnswer={511}
                    feedbackAboutSucces={""}
                    idDoneCallback={
                      // this triggers animation and exercise is Done
                      // this trieger has to be activated in DropBox by calling function isDoneCallb ack
                      handleExerciseIsDone
                    }
                  />
                </div>
              </div>
              <div>
                <p style={{ textAlign: "center" }}>
                  <b>zweijährlich</b>
                </p>
                <div style={droppableStyle}>
                  <DropBox
                    id="dr4"
                    name="dr4"
                    droppedItemsClass="prueffristen itemIsDroppedState"
                    exerciseBitValueAnswer={exercise.bitValueAnswer[3]}
                    exerciseCurrentState={exerciseCurrentState}
                    setExerciseCurrentState={setExerciseCurrentState}
                    multipleDropBitValueAnswer={511}
                    feedbackAboutSucces={""}
                    idDoneCallback={
                      // this triggers animation and exercise is Done
                      // this trieger has to be activated in DropBox by calling function isDoneCallb ack
                      handleExerciseIsDone
                    }
                  />
                </div>
              </div>
              <div>
                <p style={{ textAlign: "center" }}>
                  <b>vierjährlich</b>
                </p>
                <div style={droppableStyle}>
                  <DropBox
                    id="dr5"
                    name="dr5"
                    droppedItemsClass="prueffristen itemIsDroppedState"
                    exerciseBitValueAnswer={exercise.bitValueAnswer[4]}
                    exerciseCurrentState={exerciseCurrentState}
                    setExerciseCurrentState={setExerciseCurrentState}
                    multipleDropBitValueAnswer={511}
                    feedbackAboutSucces={""}
                    idDoneCallback={
                      // this triggers animation and exercise is Done
                      // this trieger has to be activated in DropBox by calling function isDoneCallb ack
                      handleExerciseIsDone
                    }
                  />
                </div>
              </div>
            </div>
          </Grid.Row>
          <Grid.Row style={{ padding: "0" }}>
            <div className="relative fullHeight" style={{ width: "100%" }}>
              <Transition
                visible={my_exercise && !my_exercise.done}
                animation="fade"
                duration={animationTrigger ? 700 : 0}
              >
                <div id="dr1" style={draggableSet}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      flexWrap: "wrap",
                      width: "729px",
                      margin: "auto",
                      justifyContent: "space-between"
                    }}
                  >
                    {exercise.draggableItems.map((item, index) => (
                      <DraggableItem
                        key={item.id}
                        label={item.text}
                        extraText={item.extraText}
                        bitValue={item.id}
                        exerciseBitValueAnswer={droppableIdexes[index]}
                        callbackAfterDropFail={handleFailToDropItem}
                        multipleDroppable={true}
                        dragClone={true}
                        dragElemOpacity={0.4}
                        handler={
                          <div style={itemsStyle}>
                            <b>{item.text}</b>
                            {item.extraText && (
                              <span style={{ fontSize: "10px" }}>
                                {item.extraText}
                              </span>
                            )}
                          </div>
                        }
                        style={{ margin: "0 5px" }}
                      />
                    ))}
                  </div>
                </div>
              </Transition>
            </div>
          </Grid.Row>
        </Grid>
      </div>
      <div className="instructionsField">
        <span>{currentInstruction}</span>
      </div>
    </>
  );
}

export default withRouter(Prueffristen);
