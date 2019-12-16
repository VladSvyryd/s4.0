import React, { useContext, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Grid, Image, Transition } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/6-apparaturen/apparaturen_schema.jpg";
import i2 from "../assets/pics/6-apparaturen/hebebühne_schema.jpg";
import i2_2 from "../assets/pics/6-apparaturen/hebebühne_fragezeichen.jpg";
import i2_2_done from "../assets/pics/6-apparaturen/hebebühne_fertig.jpg";
import i3 from "../assets/pics/6-apparaturen/tauchsieder_schema.jpg";
import i3_2 from "../assets/pics/6-apparaturen/tauchsieder_fragezeichen.jpg";
import i3_2_done from "../assets/pics/6-apparaturen/tauchsieder_fertig.jpg";
import i4 from "../assets/pics/6-apparaturen/schliffe_schema.jpg";
import i4_2 from "../assets/pics/6-apparaturen/schliffe_fragezeichen.jpg";
import i4_2_done from "../assets/pics/6-apparaturen/schliffe_fertig.jpg";
import i5 from "../assets/pics/6-apparaturen/sicherung_schema.jpg";
import i5_2 from "../assets/pics/6-apparaturen/sicherung_fragezeichen.jpg";
import i5_2_done from "../assets/pics/6-apparaturen/sicherung_fertig.jpg";
import i6 from "../assets/pics/6-apparaturen/schlauch_schema.jpg";
import i6_2 from "../assets/pics/6-apparaturen/schlauch_fragezeichen.jpg";
import i6_2_done from "../assets/pics/6-apparaturen/schlauch_fertig.jpg";
import i7 from "../assets/pics/6-apparaturen/rundkolben_schema.jpg";
import i7_2 from "../assets/pics/6-apparaturen/rundkolben_fragezeichen.jpg";
import i7_2_done from "../assets/pics/6-apparaturen/rundkolben_fertig.jpg";
import i9 from "../assets/pics/achtung.png";

function Versuch_im_Abzug(props) {
  // global state of pages
  const [tocPages] = useContext(PagesContext);
  // state to go through active page
  const [tocState, setTocState] = useContext(TocContext);

  // each Link to my_exercise has such params
  const [my_exercise, setMy_exercise] = useState(
    (props.location.state && props.location.state.currentExercise) ||
      tocPages[tocState.activeMenu].pages[1]
  );
  //console.log(my_exercise);
  // for internal linking to my_exercises on this page
  const pathname = props.location.pathname;
  // instructions for pictures
  const instructions = [
    "Suchen Sie in dem Versuchsaufbau nach aktiven Bereichen und überprüfen Sie, ob alles in Ordnung ist!",
    "Halterung des Heiztopfes mit Wasserbad",
    "Tauchsieder",
    "Destillatkolben",
    "Kolonnenkopf",
    "Vierhalsrundkolben",
    "Schauglas des Kühlwasserablaufs"
  ];
  const instructionImgs = [
    { false: "", right: "" },
    { false: i2_2, right: i2_2_done },
    { false: i3_2, right: i3_2_done },
    { false: i7_2, right: i7_2_done },
    { false: i5_2, right: i5_2_done },
    { false: i4_2, right: i4_2_done },
    { false: i6_2, right: i6_2_done }
  ];
  const [currentInstruction, setCurrentInstruction] = useState(instructions[0]);
  const [currentInstructionImg, setCurrentInstructionImg] = useState();
  // if page refreshs go to Grundriss page
  //const path = props.location.pathname.split("/");
  //path.pop();
  //const r = path.join("/");
  //if (!my_exercise) props.history.push("/virtueles_labor/grundriss");

  const handleHover = index => {
    setCurrentInstruction(instructions[index]);
    // find needed paar of preview imgs for exercise
    let twoPictures = instructionImgs[index];
    let res = false;
    //
    if (
      tocPages[tocState.activeMenu].pages[1].pages[index - 1] &&
      tocPages[tocState.activeMenu].pages[1].pages[index - 1].done
    ) {
      res = twoPictures.right;
    } else {
      res = twoPictures.false;
    }
    setCurrentInstructionImg(res);
  };

  const style_hebebuehne = {
    bottom: "11px",
    left: "54px"
  };
  const style_tauchsieder_schema = {
    bottom: "141px",
    left: "22px"
  };
  const style_rundkolben = {
    bottom: "155px",
    left: "78px"
  };
  const style_statische_sicherung = {
    bottom: "359px",
    left: "101px"
  };
  const style_schlauch_schema = {
    bottom: "355px",
    left: "217px"
  };
  const style_schlauchsicherung = {
    bottom: "21px",
    left: "183px"
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
                    my_exercise.pages[0].filename}`,
                  state: {
                    currentExercise: my_exercise && my_exercise.pages[0]
                  }
                }}
              >
                <Image src={i2} />
              </Link>
              <Link
                onMouseEnter={() => handleHover(2)}
                onMouseLeave={() => handleHover(0)}
                className="absolute hoverReveal pointer"
                style={style_tauchsieder_schema}
                to={{
                  pathname: `${pathname}/${my_exercise &&
                    my_exercise.pages[1].filename}`,
                  state: {
                    currentExercise: my_exercise && my_exercise.pages[1]
                  }
                }}
              >
                <Image src={i3} />
              </Link>
              <Link
                onMouseEnter={() => handleHover(3)}
                onMouseLeave={() => handleHover(0)}
                className="absolute hoverReveal pointer"
                style={style_schlauchsicherung}
                to={{
                  pathname: `${pathname}/${my_exercise &&
                    my_exercise.pages[2].filename}`,
                  state: {
                    currentExercise: my_exercise && my_exercise.pages[2]
                  }
                }}
              >
                <Image src={i7} />
              </Link>
              <Link
                onMouseEnter={() => handleHover(4)}
                onMouseLeave={() => handleHover(0)}
                className="absolute hoverReveal pointer"
                style={style_statische_sicherung}
                to={{
                  pathname: `${pathname}/${my_exercise &&
                    my_exercise.pages[3].filename}`,
                  state: {
                    currentExercise: my_exercise && my_exercise.pages[3]
                  }
                }}
              >
                <Image src={i5} />
              </Link>

              <Link
                onMouseEnter={() => handleHover(5)}
                onMouseLeave={() => handleHover(0)}
                className="absolute hoverReveal pointer"
                style={style_rundkolben}
                to={{
                  pathname: `${pathname}/${my_exercise &&
                    my_exercise.pages[4].filename}`,
                  state: {
                    currentExercise: my_exercise && my_exercise.pages[4]
                  }
                }}
              >
                <Image src={i4} />
              </Link>
              <Link
                onMouseEnter={() => handleHover(6)}
                onMouseLeave={() => handleHover(0)}
                className="absolute hoverReveal pointer"
                style={style_schlauch_schema}
                to={{
                  pathname: `${pathname}/${my_exercise &&
                    my_exercise.pages[5].filename}`,
                  state: {
                    currentExercise: my_exercise && my_exercise.pages[5]
                  }
                }}
              >
                <Image src={i6} />
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
