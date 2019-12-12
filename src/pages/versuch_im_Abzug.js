import React, { useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Grid, Image, Transition } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/6-apparaturen/apparaturen_schema.jpg";
import i2 from "../assets/pics/6-apparaturen/hebebühne_schema.jpg";
import i3 from "../assets/pics/6-apparaturen/hebebühne_fragezeichen.jpg";
import i4 from "../assets/pics/6-apparaturen/hebebühne_schema.jpg";
import i5 from "../assets/pics/6-apparaturen/hebebühne_schema.jpg";
import i6 from "../assets/pics/6-apparaturen/hebebühne_schema.jpg";
import i7 from "../assets/pics/6-apparaturen/hebebühne_schema.jpg";

import i9 from "../assets/pics/achtung.png";

function Versuch_im_Abzug(props) {
  // global state of pages
  const [tocPages] = useContext(PagesContext);
  // state to go through active page
  const [tocState, setTocState] = useContext(TocContext);

  // each Link to my_exercise has such params
  const [my_exercise, setMy_exercise] = useState(
    (props.location.state && props.location.state.currentExercise) ||
      tocState.currentExerciseByPath
  );
  console.log(my_exercise, tocState);
  // for internal linking to my_exercises on this page
  const pathname = props.location.pathname;
  // instructions for pictures
  const instructions = [
    "Suchen Sie in dem Versuchsaufbau nach aktiven Bereichen und überprüfen Sie, ob alles in Ordnung ist!",
    "Halterung des Heiztopfes mit Wasserbad",
    "Schalterleiste des Abzugs"
  ];
  const instructionImgs = [i3];
  const [currentInstruction, setCurrentInstruction] = useState(instructions[0]);
  const [currentInstructionImg, setCurrentInstructionImg] = useState(
    instructions[0]
  );
  // if page refreshs go to Grundriss page
  const path = props.location.pathname.split("/");
  path.pop();
  const r = path.join("/");
  //if (!my_exercise) props.history.push("/virtueles_labor/grundriss");

  const handleHover = index => {
    setCurrentInstruction(instructions[index]);
    setCurrentInstructionImg(instructionImgs[index - 1]);
  };

  const style_hebebuehne = {
    bottom: "11px",
    left: "54px"
  };
  return (
    <>
      <div className="exerciseFrame">
        <Grid style={{ width: "100%" }} padded="horizontally">
          <Grid.Row columns="2">
            <Grid.Column
              width="10"
              style={{ paddingLeft: "0" }}
              className="relative"
            >
              <Image src={i1} className="absolute" floated="left" />
              <Link
                onMouseEnter={() => handleHover(1)}
                onMouseLeave={() => handleHover(0)}
                className="absolute hoverReveal pointer"
                style={style_hebebuehne}
                to={{
                  pathname: `${pathname}/${my_exercise &&
                    my_exercise.secondPages[0].thirdLayer.filename}`,
                  state: {
                    currentExercise:
                      my_exercise && my_exercise.pages[0].thirdLayer
                  }
                }}
              >
                <Image src={i2} />
              </Link>
            </Grid.Column>
            <Grid.Column width="6" verticalAlign="middle">
              <div className="centered">
                <div
                  className="textIntro"
                  style={{ width: "260px", margin: "auto" }}
                >
                  <div className="gridList">
                    <Image src={i9} />
                    <div>
                      <p>
                        <b>
                          Ansicht <br /> Versuchsaufbau im Abzug
                        </b>
                      </p>
                      <p>
                        Überprüfen Sie, ob die skizzierte Vakuumdestillation im
                        Abzug richtig aufgebaut wurde.
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      height: "300px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "flex-end"
                    }}
                  >
                    <Image src={currentInstructionImg} />
                  </div>
                </div>
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

export default withRouter(Versuch_im_Abzug);
