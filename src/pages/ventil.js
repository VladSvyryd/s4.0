import React, { useContext, useState, createRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Grid, Image, Popup, Transition } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/2-chemielaboreingang/kennzeichnung.jpg";
import i3 from "../assets/pics/achtung_rot.png";
import i4 from "../assets/pics/frage.png";
import i5 from "../assets/pics/achtung_gruen.png";
import i6 from "../assets/pics/2-chemielaboreingang/ventile_symbol_0.png";
import i7 from "../assets/pics/2-chemielaboreingang/ventile_symbol_1.png";
import i8 from "../assets/pics/2-chemielaboreingang/ventile_symbol_2.png";
import i9 from "../assets/pics/2-chemielaboreingang/ventile_symbol_3.png";
import i10 from "../assets/pics/2-chemielaboreingang/kennzeichnung_richtig.jpg";
import DropBox from "../components/DropBox";
import i_q from "../assets/pics/querverweis.png";

import DraggableItem from "../components/DraggableItem";

// to create drag and drop component used external library  react-drag-drop-container
// https://github.com/peterh32/react-drag-drop-container <---- this is github page with instructions
// to create exercise you need to Objects DropBox (Object that recieves draggables) and DraggableItem (Object to Drag)
// the logic of exercises flows into DropBox, which has check of exerciseBitValue and currentBitValue of recieved by DropBox Draggables
// the isDone() function goes from this Parent component into DropBox to be activated as soon as th exercise has been done

function Ventil(props) {
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
  const [feedbackFromDraggables, setFeedbackFromDraggables] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(false);

  const instructions = [
    "Bitte ziehen Sie das Symbol auf den markierten Bereich!",
    "Klicken Sie auf eine beliebige Position, um in die vorherige Ansicht zu gelangen."
  ];
  // refference fro warning popoup
  const contextRef = createRef();

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
    pagesFromLocalStorage.forEach(e => findNode(my_exercise.id, e));

    // trigger tocPages function to resave Pages on local storage
    setTocPages(pagesFromLocalStorage);
    // change local state of exercise as done to trigger changes on the Page
    setMyExercise(old => ({
      ...old,
      done: !old.done
    }));
  }
  function findNode(currentExerciseId, currentNode) {
    var i, currentChild, result;

    if (currentExerciseId === currentNode.id) {
      currentNode.done = !currentNode.done;
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
        result = findNode(currentExerciseId, currentChild);

        // Return the result if the node has been found
        if (result !== false) {
          currentNode.done = !currentNode.done;
        }
      }

      // The node has not been found and we have no more options
      return false;
    }
  }
  const handleFailToDropItem = feedbackSuccess => {
    setFeedbackFromDraggables(!feedbackSuccess);
  };

  const droppableStyle = {
    width: "213px",
    height: "122px",
    top: "36px",
    left: "147px",
    display: "flex",
    flexDirection: "column"
  };
  const draggableSet = {
    display: "flex",
    flexDirection: "row",
    margin: "30px 0",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around"
  };

  const exercise = {
    draggableItems: [
      { id: 1, img: i6 },
      { id: 2, img: i7 },
      { id: 4, img: i8 },
      { id: 8, img: i9 }
    ],
    bitValueAnswer: 8
  };
  const itemsStyle = {
    boxShadow: "3px 3px 7px #0000003d"
  };

  useEffect(() => {
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
      <div className="exerciseFrame ausstatung_entladung">
        <Grid style={{ width: "100%" }}>
          <Grid.Row columns="2">
            <Grid.Column width="10" className="relative">
              <Image
                src={i1}
                className="absolute"
                style={{ top: "0", left: "14px" }}
              />

              <div
                className="absolute"
                style={droppableStyle}
                onMouseLeave={() => setFeedbackFromDraggables(false)}
              >
                <DropBox
                  id="dr1"
                  name="dr1"
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
                <Image src={i10} />
              </Transition>
            </Grid.Column>
            <Grid.Column width="6">
              <div className="relative fullHeight">
                <Transition
                  visible={my_exercise && !my_exercise.done}
                  animation="fade"
                  duration={animationTrigger ? 700 : 0}
                >
                  <div
                    className="absolute"
                    style={{ top: "11%", width: "320px" }}
                  >
                    <div className="gridList">
                      <div>
                        <h1 className="my_title small">
                          Die Öffnungsrichtung von Notduschen muss eindeutig
                          gekennzeichnet sein.
                        </h1>
                        <h1 className="my_title small">
                          Welches Zeichen ist am eindeutigsten?
                        </h1>
                      </div>
                      <Image src={i4} />
                    </div>
                    <div style={{ width: "238px" }}>
                      <div id="dr1" style={draggableSet} ref={contextRef}>
                        {exercise.draggableItems.map(item => (
                          <DraggableItem
                            key={item.id}
                            label={item.text}
                            bitValue={item.id}
                            exerciseBitValueAnswer={exercise.bitValueAnswer}
                            callbackAfterDropFail={handleFailToDropItem}
                            dragElemOpacity={0.4}
                            handler={
                              <Image style={itemsStyle} src={item.img} />
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <div style={{ marginTop: "30px", width: "270px" }}>
                      <p>
                        Weitere Informationen zu dieser Frage erhalten Sie in
                        Kapitel {"  "}
                        <a
                          target="_blank"
                          href="../../fachinformation-responsiv/kapb/massnahmen_notduschen.htm"
                          className="externalLink"
                        >
                          <span className="linkContent">
                            <Image src={i_q} />B 4.6.1 Maßnahmen im Überblick
                          </span>
                        </a>
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
                  <div className="absolute" style={{ top: "22%", left: "9%" }}>
                    <div
                      className=" gridList "
                      style={{ width: "270px", columnGap: "30px" }}
                    >
                      <Image src={i5} />
                      <div>
                        <span className="my_title small">Richtig</span>
                        <p style={{ marginTop: "5px" }}>
                          Die Öffnungsrichtung des Ventils von Körpernotduschen
                          muss eindeutig gekennzeichnet sein.
                        </p>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      <div className="instructionsField">
        <span>
          {my_exercise && my_exercise.done
            ? instructions[instructions.length - 1]
            : instructions[instructions.length - 2]}
        </span>
      </div>
      <Popup
        className="warning"
        context={contextRef}
        offset="0, 25px"
        position="left center"
        open={feedbackFromDraggables}
      >
        <Popup.Header as="span" className="headerPop">
          Diese Antwort war leider falsch!
        </Popup.Header>
        <Popup.Content>
          <Image src={i3} centered />
        </Popup.Content>
      </Popup>
    </>
  );
}

export default withRouter(Ventil);
