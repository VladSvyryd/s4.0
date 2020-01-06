import React, { useContext, useState, useEffect } from "react";
import { Image, Transition, Visibility } from "semantic-ui-react";
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
    "Klicken Sie auf einzelne Ordner, um sie zu öffnen!",
    "In diesem Ordner sind Unterweisungen abgelegt. Überprüfen Sie die Unterweisung zum Thema „Gefährliche Eigenschaften von Stoffen“.",
    "Klicken Sie auf diesen Ordner, um die Prüffristen der Laborgeräte zu untersuchen."
  ];
  const [currentInstruction, setCurrentInstruction] = useState(instructions[0]);
  const [showDetails, setShowDetails] = useState(true);
  const [onScreen, changeOnScreen] = useState([]);
  const [unterweisungPopup, setUnterweisungPopup] = useState(false);
  const [pruefPopup, setPruefPopup] = useState(false);
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
          key={item.id}
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%"
          }}
        >
          {item.div}
        </div>
      ));
    } else {
      return onScreen.map(item => (
        <div
          key={item.id}
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%"
          }}
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
  const handleHoverEnter = (e, instruction) => {
    setCurrentInstruction(instruction);
    if (e.target.style.overflow === "hidden") {
      e.target.style.overflow = "visible";
    }
  };
  const handleHoverLeave = e => {
    setCurrentInstruction(instructions[0]);
    console.log(e.target);
    if (e.target.parentNode.style.overflow === "visible") {
      e.target.parentNode.style.overflow = "hidden";
    }
  };
  console.log(currentInstruction);
  useEffect(() => {
    let stopAllAnimations = JSON.parse(localStorage.getItem("stopAllAnimations")) || false
    if (stopAllAnimations) {
      changeOnScreen([{
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
          </div>
        )
      }])
    } else {
      startSequence();
    }
    return () => {
      localStorage.setItem("stopAllAnimations", false);
    }
  }, []);
  function main_section() {
    return (
      <>
        <div className="relative">
          <Image src={i3} />
          <Link
            onMouseEnter={e => handleHoverEnter(e, instructions[1])}
            onMouseLeave={e => handleHoverLeave(e)}
            className="absolute hoverReveal pointer"
            style={{
              right: "227px",
              top: "14px",
              width: "117px",
              height: "456px",
              overflow: "hidden"
            }}
            to={{
              pathname: `${pathname}/${exercise.pages[1].filename}`,
              state: {
                currentExercise: exercise.pages[1]
              }
            }}
          >
            {<Image src={i4} />}
            <div
              style={{
                position: "absolute",
                bottom: "0",
                right: "-412px",
                width: "412px",
                height: "290px",
                backgroundImage: `url('${i6}')`,
                display: "flex",
                flexDirection: "column",
                color: "rgba(0,0,0,.87)",
                zIndex: 1
              }}
            >
              <div
                style={{
                  alignSelf: "center",
                  height: "29px",
                  display: "grid",
                  alignItems: "center"
                }}
              >
                <h1 className="my_title small" style={{ padding: "0px" }}>
                  Unterweisungen
                </h1>
              </div>
              <div style={{ width: "260px", margin: "auto" }}>
                <p>
                  Flucht und Rettungswege <br /> Erste Hilfe bei Unfällen <br />
                  Arbeitsmedizinisch-toxikologische Beratung <br />{" "}
                  Durchgangsärzte in der Umgebung <br /> Unfallmeldung an
                  Berufsgenossenschaft
                  <br />
                  <b>Gefährliche Eigenschaften von Stoffen</b>
                  <br />
                  Umgang mit Abzügen <br /> Umgang mit Druckgasflaschen <br />{" "}
                  Lagerung von Gefahrstoffen <br /> Transport von Gefahrstoffen{" "}
                  <br /> Gefahrstoffe und Schwangerschaft
                </p>
              </div>
            </div>
          </Link>
          <Link
            onMouseEnter={e => handleHoverEnter(e, instructions[2])}
            onMouseLeave={e => handleHoverLeave(e)}
            className="absolute hoverReveal pointer"
            style={{
              right: "130px",
              top: "13px",
              width: "110px",
              height: "456px",
              overflow: "hidden"
            }}
            to={{
              pathname: `${pathname}/${exercise.pages[0].pages[0].filename}`,
              state: {
                currentExercise: exercise.pages[0].pages[0]
              }
            }}
          >
            <Image src={i5} />
            <div
              style={{
                position: "absolute",
                bottom: "0",
                right: "-412px",
                width: "412px",
                height: "290px",
                backgroundImage: `url('${i6}')`,
                display: "flex",
                flexDirection: "column",
                color: "rgba(0,0,0,.87)",
                zIndex: 1
              }}
            >
              <div
                style={{
                  alignSelf: "center",
                  height: "29px",
                  display: "grid",
                  alignItems: "center"
                }}
              >
                <h1 className="my_title small" style={{ padding: "0px" }}>
                  Prüffristen
                </h1>
              </div>
              <div style={{ width: "260px", margin: "50px auto auto" }}>
                <p>
                  Der Ordner enthält Angaben zu den Prüffristen von Geräten und
                  Einrichtungen.
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="centered">
          <div className="textIntro">
            <div className="gridList">
              <Image src={i9} onClick={() => setCurrentInstruction("test")} />
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

        <Transition.Group as="div" duration={700}>
          {setUpAniationFrames()}
        </Transition.Group>
      </div>
      <div className="instructionsField">
        <span>{currentInstruction}</span>
      </div>
    </>
  );
}

export default Buero;
