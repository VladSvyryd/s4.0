import React, { useContext, useState, createRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Grid, Image, Popup, Transition } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/6-apparaturen/rundkolben_frage.jpg";
import i3 from "../assets/pics/achtung_rot.png";
import i4 from "../assets/pics/frage.png";
import i5 from "../assets/pics/achtung_gruen.png";
import i6 from "../assets/pics/6-apparaturen/rundkolben_antwort1.png";
import i7 from "../assets/pics/6-apparaturen/rundkolben_antwort2.png";
import i8 from "../assets/pics/6-apparaturen/rundkolben_antwort3.png";
import i9 from "../assets/pics/6-apparaturen/rundkolben_schema.jpg";
import i10 from "../assets/pics/6-apparaturen/rundkolben_loesung.jpg";
import i11 from "../assets/pics/6-apparaturen/rundkolben_antwort2.jpg";
import DropBox from "../components/DropBox";
import markNodeDone from "../util/externalFunctions";
import DraggableItem from "../components/DraggableItem";
import i_q from "../assets/pics/querverweis.png";

// to create drag and drop component used external library  react-drag-drop-container
// https://github.com/peterh32/react-drag-drop-container <---- this is github page with instructions
// to create exercise you need to Objects DropBox (Object that recieves draggables) and DraggableItem (Object to Drag)
// the logic of exercises flows into DropBox, which has check of exerciseBitValue and currentBitValue of recieved by DropBox Draggables
// the isDone() function goes from this Parent component into DropBox to be activated as soon as th exercise has been done

function Rundkolben(props) {
  // state to go through active page
  const [tocState, setTocState] = useContext(TocContext);
  // load global state of tocPages
  const [tocPages, setTocPages] = useContext(PagesContext);
  // recieved exercise  only in this case as static object from array of exercises
  const [my_exercise, setMyExercise] = useState(
    (props.location.state && props.location.state.currentExercise) ||
      tocState.currentExerciseByPath
  );
  console.log(my_exercise);
  const [exerciseCurrentState, setExerciseCurrentState] = useState(0);
  const [feedbackFromDraggables, setFeedbackFromDraggables] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(false);

  const instructions = [
    "Ziehen Sie ein Glasgefäß in den Versuchsaufbau, das zum Evakuieren geeignet ist!",
    "Klicken Sie auf eine beliebige Position, um in die vorherige Ansicht zu gelangen."
  ];
  // refference fro warning popoup
  const contextRef = createRef();
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
  const handleFailToDropItem = feedbackSuccess => {
    setFeedbackFromDraggables(!feedbackSuccess);
  };

  const droppableStyle = {
    width: "164px",
    height: "208px",
    top: "52px",
    left: "95px",
    display: "flex",
    flexDirection: "column"
  };
  const draggableSet = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: "10px 0",
    height: "250px",
    justifyContent: "space-around",
    alignItems: "flex-end"
  };

  const exercise = {
    draggableItems: [
      { id: 1, img: i6 },
      { id: 2, img: i7 },
      { id: 4, img: i8 }
    ],
    bitValueAnswer: 2
  };
  const itemsStyle = {
    width: "auto"
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
            <Grid.Column width="8">
              <div className="relative fullHeight">
                <Image
                  src={i9}
                  className="absolute"
                  style={{ top: "30px", right: "5px" }}
                />
                <Transition
                  visible={my_exercise && !my_exercise.done}
                  animation="fade"
                  duration={animationTrigger ? 700 : 0}
                >
                  <div
                    className="absolute"
                    style={{ top: "7%", width: "470px" }}
                  >
                    <div className="gridList">
                      <div>
                        <h1
                          className="my_title small"
                          style={{ width: "250px" }}
                        >
                          Nicht alle Glasbehälter eignen sich zum Evakuieren.
                        </h1>
                        <h1 className="my_title small">
                          Entscheiden Sie sich für den richtigen.
                        </h1>
                      </div>

                      <Image src={i4} />
                    </div>
                    <div style={{ width: "350px" }}>
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
                    <div
                      style={{
                        marginTop: "20px",
                        width: "270px"
                      }}
                    >
                      <p>
                        Weitere Informationen zu dieser Frage erhalten Sie in
                        Kapitel {"  "}
                        <a
                          target="_blank"
                          href="../../fachinformation-responsiv/kapc/evakuieren_glasgeraete.htm"
                          className="externalLink"
                        >
                          <span className="linkContent">
                            <Image src={i_q} />C 4.3 Evakuieren von Glasgeräten
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
                  <div className="absolute" style={{ top: "12%", left: "9%" }}>
                    <div>
                      <Image
                        src={i11}
                        floated="left"
                        style={{ marginBottom: "40px" }}
                      />
                    </div>
                    <div
                      className=" gridList "
                      style={{ width: "250px", columnGap: "15px" }}
                    >
                      <Image src={i5} />
                      <div>
                        <span className="my_title small">Richtig!</span>
                        <p style={{ marginTop: "5px" }}>
                          Rundkolben sind zum Evakuieren geeignet.
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
        position="top left"
        open={feedbackFromDraggables}
      >
        <Popup.Header as="span" className="headerPop">
          Dieser Antwort war leider falsch!
        </Popup.Header>
        <Popup.Content>
          <Image src={i3} centered />
        </Popup.Content>
      </Popup>
    </>
  );
}

export default withRouter(Rundkolben);
