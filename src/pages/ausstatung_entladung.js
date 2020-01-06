import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Grid, Image, Transition } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/12-sterilisationsauklav/mitarbeiter.jpg";
import i2 from "../assets/pics/12-sterilisationsauklav/mitarbeiter_richtig.jpg";
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

function Ausstatung_entladung(props) {
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
    "Sie haben leider die falsche Schutzausrüstung ausgewählt! Versuchen Sie es erneut.",
    "Ziehen Sie die richtige Begriffe auf die Liste neben der Person!",
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
    document
      .getElementById("panel")
      .addEventListener("mousedown", handleClickToReturnBack);
  };
  // add click event to document to return to other exercises and reset click events
  const handleClickToReturnBack = () => {
    document
      .getElementById("panel")
      .removeEventListener("mousedown", handleClickToReturnBack);
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
  // if exercise has been already done, go back
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
  }, []);

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
    width: "225px",
    height: "246px",
    top: "157px",
    left: "304px",
    display: "flex",
    flexDirection: "column"
  };
  const draggableSet = {
    display: "flex",
    flexDirection: "column",
    width: "230px"
  };

  const exercise = {
    draggableItems: [
      { id: 1, text: "Gesichtschutz" },
      { id: 2, text: "Schutzbrille" },
      { id: 4, text: "Chemikalienhandschuhe" },
      { id: 8, text: "Hitzehandschuhe" },
      { id: 16, text: "Latexhandschuhe" },
      { id: 32, text: "Gummierte" }
    ],
    bitValueAnswer: 10
  };
  const itemsStyle = {
    backgroundColor: "rgb(222,222,222)",
    padding: "7px 11px",
    fontWeight: "bold",
    margin: "6px 0",
    width: "100%",
    boxShadow: "3px 3px 7px #0000003d"
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
            <Grid.Column width="10" className="relative">
              <Image
                src={i1}
                className="absolute"
                style={{ top: "0", left: "14px" }}
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
                <Image src={i2} />
              </Transition>
            </Grid.Column>
            <Grid.Column width="6">
              <div className="relative fullHeight">
                <Transition
                  visible={my_exercise && !my_exercise.done}
                  animation="fade"
                  duration={animationTrigger ? 700 : 0}
                >
                  <div className="absolute" style={{ top: "7%" }}>
                    <div className="gridList" style={{ width: "320px" }}>
                      <h1 className="my_title small">
                        Welche persönliche Schutzausrüstung muss Ihr Kollege
                        zusätzlich tragen, um autoklaviertes Gut sicher aus dem
                        Sterilisationsautoklaven entnehmen zu können?
                      </h1>
                      <Image src={i4} />
                    </div>
                    <div style={{ width: "320px" }}>
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
                    <div style={{ marginTop: "20px", width: "270px" }}>
                      <p>
                        Weitere Informationen zu dieser Frage erhalten Sie in
                        Kapitel{" "}
                        <a
                          target="_blank"
                          href="../../fachinformation-responsiv/kapc/sterilisationsautoklaven.htm"
                          className="externalLink"
                        >
                          <span className="linkContent">
                            <Image src={i_q} />C 7.3.3 Sterilisationsautoklaven
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
                          Mit Hitzehandschuhen und Schutzbrille kann Ihr Kollege
                          das sterilisierte Gut sicher aus dem Autoklaven
                          nehmen.
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
        <span>{currentInstruction}</span>
      </div>
    </>
  );
}

export default withRouter(Ausstatung_entladung);
