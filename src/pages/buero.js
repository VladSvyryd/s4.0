import React, { useContext, useState, useEffect } from "react";
import { Image, Transition } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i9 from "../assets/pics/achtung.png";

import i1 from "../assets/pics/1_buero/startseite.jpg";
import i2 from "../assets/pics/1_buero/ordner.jpg";
import i3 from "../assets/pics/1_buero/ordner_passive.jpg";
import i4 from "../assets/pics/1_buero/unterweisungen_active.jpg";
import i5 from "../assets/pics/1_buero/prüf_active.jpg";
import i6 from "../assets/pics/1_buero/zettel.jpg";

function Buero(props) {
  const [tocPages] = useContext(PagesContext);
  const [tocState, setTocState] = useContext(TocContext);
  const [exercise, saveExerciseState] = useState(tocPages[tocState.activeMenu]);
  const [animationTrigger, setAnimationTrigger] = useState(true);
  const instructions = [
    "Suchen Sie im Bild nach aktiven Bereichen, die nicht in Ordnung sind!",
    "Labortür",
    "Körpernotdusche",
    "Augennotdusche",
    "Ventile der Notduschen"
  ];
  const [currentInstruction, setCurrentInstruction] = useState(instructions[0]);
  const [showDetails, setShowDetails] = useState(true);
  const [onScreen, changeOnScreen] = useState([]);
  const pathname = props.location.pathname;

  const [slides, setSlides] = useState(
    [
      {
        id: 1,
        div: (
          <div
            key="1"
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              width: "100%",
              height: "100%",
              backgroundColor: "white"
            }}
          >
            <div className="exerciseFrame">
              <Image src={i2} />
            </div>
          </div>
        )
      },
      {
        id: 2,
        div: (
          <div
            key="1"
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              width: "100%",
              height: "100%",
              backgroundColor: "white"
            }}
          >
            <div className="exerciseFrame">{main_section()}</div>
            <div className="instructionsField">
              <span>{currentInstruction} test</span>
            </div>
          </div>
        )
      }
    ].reverse()
  );
  function setUpAniationFrames() {
    // if is previously done
    if (!animationTrigger) {
      // push all frames till last state
      pushNewFrameToActiveFrameArray();
      return onScreen.map(item => (
        <div
          className="absolute"
          key={item.id}
          style={{ left: "0", top: "0", width: "100%", height: "100%" }}
        >
          {item.div}
        </div>
      ));
    } else {
      return onScreen.map(item => (
        <div
          className="absolute"
          key={item.id}
          style={{ left: "0", top: "0", width: "100%", height: "100%" }}
        >
          {item.div}
        </div>
      ));
    }
  }
  function pushNewFrameToActiveFrameArray() {
    if (slides.length > 0) {
      let nextSlide = slides.pop();
      changeOnScreen(old => [...old, nextSlide]);
      setSlides(slides.slice(0, slides.length));
    }
  }

  const startSequence = () => {
    const nIntervId = window.setInterval(
      () => pushNewFrameToActiveFrameArray(),
      1200
    );
    setTimeout(() => clearInterval(nIntervId), 6000);
  };

  useEffect(() => {
    startSequence();
  }, []);
  function main_section() {
    return (
      <>
        <div className="relative">
          <Image src={i3} />
          <Link
            onMouseEnter={() => setCurrentInstruction(instructions[1])}
            onMouseLeave={() => setCurrentInstruction(instructions[0])}
            className="absolute hoverReveal pointer"
            style={{
              right: "227px",
              top: "14px",
              width: "117px",
              height: "456px"
            }}
            to={{
              pathname: `${pathname}/${exercise.pages[1].filename}`,
              state: {
                currentExercise: exercise.pages[1]
              }
            }}
          >
            <Image src={i4} />
            <div
              style={{
                position: "absolute",
                bottom: "0",
                right: "-412px",
                width: "412px",
                height: "290px",
                backgroundImage: `url('${i6}')`
              }}
            >
              <div>Unterweisungen</div>
              <div>
                <p>
                  Flucht und Rettungswege Erste Hilfe bei Unfällen
                  Arbeitsmedizinisch-toxikologische Beratung Durchgangsärzte in
                  der Umgebung Unfallmeldung an Berufsgenossenschaft
                  <b>Gefährliche Eigenschaften von Stoffen</b>
                  Umgang mit Abzügen Umgang mit Druckgasflaschen Lagerung von
                  Gefahrstoffen Transport von Gefahrstoffen Gefahrstoffe und
                  Schwangerschaft
                </p>
              </div>
            </div>
          </Link>
          <Link
            onMouseEnter={() => setCurrentInstruction(instructions[2])}
            onMouseLeave={() => setCurrentInstruction(instructions[0])}
            className="absolute hoverReveal pointer"
            style={{
              right: "130px",
              top: "13px",
              width: "110px",
              height: "456px"
            }}
            to={{
              pathname: `${pathname}/${exercise.pages[0].filename}`,
              state: {
                currentExercise: exercise.pages[0]
              }
            }}
          >
            <Image src={i5} />
          </Link>
        </div>
        <div className="centered">
          <div className="textIntro">
            <div className="gridList">
              <Image src={i9} />
              <div>
                <p>
                  <b>Ansicht Büro</b>
                </p>
                <p>
                  Für den Laborbetrieb sind eine Reihe von Dokumentationen
                  vorgeschrieben.
                </p>
                <p>
                  Prüfen Sie die einzelnen Ordner, ob alle Angaben richtig und
                  vollständig sind.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <div
          style={{
            position: "absolute",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100%",
            backgroundColor: "white"
          }}
        >
          <div className="exerciseFrame">
            <Image src={i1} />
          </div>
        </div>
        <Transition.Group
          as="div"
          duration={700}
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          {setUpAniationFrames()}
        </Transition.Group>
      </div>
    </>
  );
}

export default Buero;
