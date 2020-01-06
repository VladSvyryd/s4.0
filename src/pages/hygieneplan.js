import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Grid, Image, Transition } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/10-arbeitsplatz/hygieneplan_aufgabe.jpg";
import i2 from "../assets/pics/10-arbeitsplatz/hygieneplan.jpg";
import i4 from "../assets/pics/frage.png";
import i5 from "../assets/pics/achtung_gruen.png";
import DropBox from "../components/DropBox";
import DraggableItem from "../components/DraggableItem";
import markNodeDone from "../util/externalFunctions";

// to create drag and drop component used external library  react-drag-drop-container
// https://github.com/peterh32/react-drag-drop-container <---- this is github page with instructions
// to create exercise you need to Objects DropBox (Object that recieves draggables) and DraggableItem (Object to Drag)
// the logic of exercises flows into DropBox, which has check of exerciseBitValue and currentBitValue of recieved by DropBox Draggables
// the isDone() function goes from this Parent component into DropBox to be activated as soon as th exercise has been done

function Hygieneplan(props) {
  // state to go through active page
  const [tocState, setTocState] = useContext(TocContext);
  // load global state of tocPages
  const [tocPages, setTocPages] = useContext(PagesContext);
  // recieved exercise object as state from page with exercises
  // each Link to exercise has such params
  const [my_exercise, setMyExercise] = useState(
    (props.location.state && props.location.state.currentExercise) ||
    tocState.currentExerciseByPath
  );
  const [exerciseCurrentState, setExerciseCurrentState] = useState(0);
  const [feedbackFromDropBox, setFeedbackFromDropBox] = useState(0);
  const [animationTrigger, setAnimationTrigger] = useState(false);

  const instructions = [
    "Diese Zuordnung war leider falsch! Versuchen Sie es erneut.",
    "Ziehen Sie die Aussagen, die Ihrer Meinung nach auf einem Hygieneplan beschrieben werden, in die Liste!",
    "Klicken Sie auf eine beliebige Position, um in die vorherige Ansicht zu gelangen."
  ];
  const [currentInstruction, setCurrentInstruction] = useState(
    my_exercise && my_exercise.done ? instructions[2] : instructions[1]
  );
  // if exercise has been already done, go back
  useEffect(() => {
    if (my_exercise.done)
      document.addEventListener("mousedown", handleClickToReturnBack);
    return () => {
      document.removeEventListener("mousedown", handleClickToReturnBack);
    }
  }, [])
  // handle change of exerciseCurrentState,
  //set state of exercise,
  //add click event to get back to other exercise
  const handleExerciseIsDone = () => {
    setAnimationTrigger(true);
    isDone();
    document.addEventListener("mousedown", handleClickToReturnBack);
  };
  // add click event to document to return to other exercises and reset click events
  const handleClickToReturnBack = () => {
    document.removeEventListener("mousedown", handleClickToReturnBack);
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
  // if page refreshs go to Grundriss page
  //const path = props.location.pathname.split("/");
  //path.pop();
  //const r = path.join("/");
  //if (!my_exercise) props.history.push("/virtueles_labor/grundriss");

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
  const droppableStyle_done = {
    width: "385px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "15px",
    background: "rgba(255,255,255,.9)",
    boxShadow: "0px 0px 10px rgba(0,0,0,.4)",
    padding: "15px"
  };
  const droppableStyle = {
    width: "385px",
    height: "356px",
    top: "119px",
    left: "44px",
    display: "flex",
    flexDirection: "column",
    borderRadius: "15px",
    background: "rgba(255,255,255,.9)",
    boxShadow: "0px 0px 10px rgba(0,0,0,.4)",
    padding: "15px"
  };
  const draggableSet = {
    display: "flex",
    flexDirection: "column",
    width: "380px"
  };

  const exercise = {
    draggableItems: [
      {
        id: 1,
        text:
          "Beschreibung der zu reinigenden Räume, Flächen, Betriebsmittel und Schutzausrüstung"
      },
      { id: 2, text: "Liste der im Labor erlaubten Nahrungsmittel" },
      { id: 4, text: "Zeitpunkt und Häufigkeit der Reinigung" },
      { id: 8, text: "Zeitintervall der vorgeschriebenen Duschgänge" },
      {
        id: 16,
        text: "Verwendete Reinigungs-/Desinfektionsmittel und ihre Dosierung"
      },
      { id: 32, text: "Angaben zur Durchführung der Reinigung" },
      { id: 64, text: "Namen der zuständigen Personen" },
      {
        id: 128,
        text: "Datum der Vorsorgeuntersuchungen für jeden Mitarbeiter"
      }
    ],
    bitValueAnswer: 117
  };
  const itemsStyle = {
    backgroundColor: "white",
    padding: "7px 11px",
    fontWeight: "bold",
    margin: "6px 0",
    width: "100%",
    boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 10px"
  };

  // feedbackSuccess is true: it was match by drop, false: wrong element
  const handleFailToDropItem = feedbackSuccess => {
    if (my_exercise && !my_exercise.done) {
      feedbackSuccess
        ? setCurrentInstruction(instructions[1])
        : setCurrentInstruction(instructions[0]);
    }
  };
  return (
    <>
      <div className="exerciseFrame ausstatung_entladung">
        <Grid style={{ width: "100%" }}>
          <Grid.Row columns="2">
            <Grid.Column width="8" className="relative">
              <Image
                src={i1}
                className="absolute"
                style={{ top: "18px", left: "64px" }}
              />
              <div className="absolute" style={droppableStyle}>
                <DropBox
                  id="dr2"
                  name="dr2"
                  droppedItemsClass="itemIsDroppedState"
                  exerciseBitValueAnswer={exercise.bitValueAnswer}
                  exerciseCurrentState={exerciseCurrentState}
                  setExerciseCurrentState={setExerciseCurrentState}
                  feedbackAboutSucces={""}
                  idDoneCallback={
                    // this triggers animation and exercise is Done
                    // this trieger has to be activated in DropBox by calling function isDoneCallb ack
                    handleExerciseIsDone
                  }
                  withLabel={<b>-</b>}
                />
              </div>
              <Transition
                visible={animationTrigger || (my_exercise && my_exercise.done)}
                animation="fade"
                duration={animationTrigger ? 700 : 0}
                className="absolute"
              >
                <div
                  style={{
                    background: "white",
                    position: "relative",
                    width: "100%",
                    height: "100%"
                  }}
                >
                  <Image
                    src={i2}
                    className="absolute"
                    style={{ top: "18px", left: "64px" }}
                  />
                </div>
              </Transition>
            </Grid.Column>
            <Grid.Column width="8">
              <div className="relative fullHeight">
                <Transition
                  visible={my_exercise && !my_exercise.done}
                  animation="fade"
                  duration={animationTrigger ? 700 : 0}
                >
                  <div
                    className="absolute"
                    style={{ top: "4%", width: "450px" }}
                  >
                    <div className="gridList">
                      <h1
                        className="my_title small"
                        style={{ paddingBottom: "0" }}
                      >
                        Welche persönliche Schutzausrüstung muss Ihr Kollege
                        zusätzlich tragen, um autoklaviertes Gut sicher aus dem
                        Sterilisationsautoklaven entnehmen zu können?
                      </h1>
                      <Image src={i4} />
                    </div>
                    <div>
                      <div id="dr1" style={draggableSet}>
                        {exercise.draggableItems.map(item => (
                          <DraggableItem
                            key={item.id}
                            label={item.text}
                            bitValue={item.id}
                            exerciseBitValueAnswer={exercise.bitValueAnswer}
                            callbackAfterDropFail={handleFailToDropItem}
                            dragClone={true}
                            dragElemOpacity={0.4}
                            handler={<div style={itemsStyle}>{item.text}</div>}
                          />
                        ))}
                      </div>
                    </div>
                    <div style={{ marginTop: "10px", width: "330px" }}>
                      <p>
                        Weitere Informationen zu dieser Frage erhalten Sie in
                        Kapitel ÄNDERN!!!!
                      </p>
                    </div>
                  </div>
                </Transition>
                <Transition
                  as="div"
                  visible={
                    animationTrigger || (my_exercise && my_exercise.done)
                  }
                  animation="fade"
                  duration={animationTrigger ? 700 : 0}
                >
                  <div className="absolute" style={{ top: "11%", left: "0%" }}>
                    <div className=" gridList " style={{ columnGap: "17px" }}>
                      <Image src={i5} />
                      <div>
                        <span className="my_title small">Sehr gut!</span>
                        <p style={{ marginTop: "5px" }}>
                          Sie haben die wesentlichen Bestandteile eines
                          Hygieneplans richtig erfasst. Der Plan wird im
                          Laboratorium ausgehängt und seine Durchführung
                          überwacht.
                        </p>
                        <p>Folgende Angaben sollte dieser Plan enthalten:</p>
                        <div style={droppableStyle_done}>
                          {exercise.draggableItems.map(
                            (ex, i) =>
                              (exercise.bitValueAnswer & ex.id) === ex.id && (
                                <div
                                  key={`${i}-draggable result`}
                                  className="itemIsDroppedState"
                                >
                                  <span className="draggedLabel"> -</span>
                                  <span> {ex.text}</span>
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => isDone()}
                      className="absolute"
                      style={{ top: "-10%", left: "9%" }}
                    >
                      RESET
                    </button>
                  </div>
                </Transition>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <div className="instructionsField">
        <span>{currentInstruction}</span>
      </div>
    </>
  );
}

export default withRouter(Hygieneplan);
