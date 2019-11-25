import React, { useContext, useState, useEffect, createRef } from "react";
import { Link } from "react-router-dom";
import { Image, Popup } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/11-sicherheitswerkbank/alles_falsch.jpg";
import i3 from "../assets/pics/11-sicherheitswerkbank/arbeitsmittel_active.jpg";
import i9 from "../assets/pics/achtung.png";
import i6 from "../assets/pics/11-sicherheitswerkbank/handschuhe_falsch_active.jpg";
import i7 from "../assets/pics/11-sicherheitswerkbank/pipeten_active.jpg";
import i2 from "../assets/pics/11-sicherheitswerkbank/alles_falsch_ausser_arbeitsmittel.jpg";
import i4 from "../assets/pics/11-sicherheitswerkbank/alles_richtig.jpg";
import i5 from "../assets/pics/11-sicherheitswerkbank/handschuhe_richtig.jpg";
import i8 from "../assets/pics/11-sicherheitswerkbank/handschuhe_richtig_active.jpg";
import i10 from "../assets/pics/11-sicherheitswerkbank/handschuhe_falsch_active_arbeitsmittel_true.jpg";
import i11 from "../assets/pics/11-sicherheitswerkbank/handschuhe_richtig_active_arbeitsmittel_true.jpg";
import i12 from "../assets/pics/11-sicherheitswerkbank/arbeitsmittel_active_true.jpg";
import i13 from "../assets/pics/11-sicherheitswerkbank/arbeitsmittel_active_true_handschuhe_falsch.jpg";
import i14 from "../assets/pics/11-sicherheitswerkbank/pipeten_active_handschuhe_true_arbeitsmittel_true.jpg";
import i15 from "../assets/pics/11-sicherheitswerkbank/pipeten_active_arbeitsmittel_true.jpg";

function Mikrobiologische(props) {
  // global state of pages
  const [tocPages] = useContext(PagesContext);
  // state to go through active page
  const [tocState, setTocState] = useContext(TocContext);

  // state to manage exercise object state
  const [exercise, setExercise] = useState(tocPages[tocState.activeMenu]);

  // state to view different exercise on the same page in the same frame
  const [exerciseView, setExerciseView] = useState(0);
  const pathname = props.location.pathname;

  let contextRef = createRef(); // reference to instructions field

  // state to show default instructions
  const [defaultInstruction, setdefaultInstruction] = useState(true);
  // instructions for pictures
  const instructions = [
    "Suchen Sie im Bild nach aktiven Bereichen und überprüfen Sie ob alles in Ordnung ist!",
    "Arbeiten mit Pipetten",
    "Arbeitshaltung und Schutzhandschuhe",
    "Arbeitsmittel"
  ];
  const handleOpenInstruction = () => {
    setdefaultInstruction(old => (old = !old));
  };
  // function to change state of current exercise and trigger useEffect function to save it in local storage
  // recieve exerices ID from Exercise_1,2,3,4 and loking of its state change array....
  const saveExercise = ID => {
    setExercise(old => ({
      ...old,
      firstLayer: old.firstLayer.map(e => {
        let result = e;
        if (e.secondLayer.id == ID) {
          e.done = !e.done;
          result = e;
        }
        return result;
      })
    }));
  };
  // callback function to trigger save of exercise in localStorage each time exercise state has been changed
  useEffect(() => {
    tocPages[tocState.activeMenu] = exercise;
    localStorage.setItem("pagesList", JSON.stringify(tocPages));
  }, [exercise]);

  const style_arbeitsmittel = {
    left: "250px",
    top: "264px"
  };
  const style_arbeitshaltung = {
    left: "438px",
    top: "102px"
  };
  const style_pipetten = {
    left: "286px",
    top: "117px"
  };
  const switchBackgroundImageByExerciseState = () => {
    if (
      exercise &&
      !exercise.firstLayer[0].done &&
      !exercise.firstLayer[1].done &&
      !exercise.firstLayer[2].done
    ) {
      // alles falsch
      console.log(exercise, "alles falsch");
      return i1;
    } else if (
      (!exercise.firstLayer[0].done && exercise.firstLayer[1].done) ||
      (!exercise.firstLayer[0].done && exercise.firstLayer[2].done)
    ) {
      // schutzhandschuhe richtig
      console.log(exercise, " nur schutzhandschuhe richtig");

      return i5;
    } else if (
      (exercise.firstLayer[0].done && exercise.firstLayer[1].done) ||
      (exercise.firstLayer[0].done && exercise.firstLayer[2].done)
    ) {
      // schutzhandschuhe richtig, arbeitsmittel richtig
      console.log(exercise, "schutzhandschuhe richtig, arbeitsmittel richtig");
      return i4;
    } else if (
      !exercise.firstLayer[2].done &&
      exercise.firstLayer[0].done &&
      !exercise.firstLayer[1].done
    ) {
      // arbeitsmittel richtig
      console.log(exercise, "nur arbeitsmittel richtig");
      return i2;
    } else if (
      exercise.firstLayer[2].done &&
      exercise.firstLayer[0].done &&
      exercise.firstLayer[1].done
    ) {
      console.log(exercise, "alles richtig");
      return i4;
    }
  };
  const switchGlovesImageByExerciseState = () => {
    if (
      exercise &&
      !exercise.firstLayer[2].done &&
      !exercise.firstLayer[0].done &&
      !exercise.firstLayer[1].done
    ) {
      // alles falsch
      console.log(exercise, "alles falsch");
      return {
        img: i6,
        style: style_arbeitsmittel
      };
    } else if (
      (!exercise.firstLayer[0].done && exercise.firstLayer[1].done) ||
      (!exercise.firstLayer[0].done && exercise.firstLayer[2].done)
    ) {
      // schutzhandschuhe richtig
      console.log(exercise, "schutzhandschuhe richtig");

      return {
        img: i8,
        style: style_arbeitsmittel
      };
    } else if (
      (exercise.firstLayer[0].done && exercise.firstLayer[1].done) ||
      (exercise.firstLayer[0].done && exercise.firstLayer[2].done)
    ) {
      // schutzhandschuhe richtig, arbeitsmittel richtig
      console.log(exercise, "alles richtig");
      return {
        img: i11,
        style: style_arbeitsmittel
      };
    } else if (
      !exercise.firstLayer[2].done &&
      exercise.firstLayer[0].done &&
      !exercise.firstLayer[1].done
    ) {
      // arbeitsmittel richtig
      console.log(exercise, "nur arbeitsmittel richtig");
      return {
        img: i10,
        style: style_arbeitsmittel
      };
    } else {
      console.log(exercise, "alles richtig");
      return {
        img: i11,
        style: style_arbeitsmittel
      };
    }
  };
  const switchArbeitsmittelImageByExerciseState = () => {
    if (
      exercise &&
      !exercise.firstLayer[2].done &&
      !exercise.firstLayer[0].done &&
      !exercise.firstLayer[1].done
    ) {
      // alles falsch
      return {
        img: i3,
        style: style_arbeitshaltung
      };
    } else if (
      (!exercise.firstLayer[0].done && exercise.firstLayer[1].done) ||
      (!exercise.firstLayer[0].done && exercise.firstLayer[2].done)
    ) {
      // schutzhandschuhe richtig
      return {
        img: i3,
        style: style_arbeitshaltung
      };
    } else if (
      (exercise.firstLayer[0].done && exercise.firstLayer[1].done) ||
      (exercise.firstLayer[0].done && exercise.firstLayer[2].done)
    ) {
      // schutzhandschuhe richtig, arbeitsmittel richtig
      return {
        img: i12,
        style: style_arbeitshaltung
      };
    } else if (
      !exercise.firstLayer[2].done &&
      exercise.firstLayer[0].done &&
      !exercise.firstLayer[1].done
    ) {
      // arbeitsmittel richtig
      return {
        img: i13,
        style: { left: "456px", top: "102px" }
      };
    } else {
      // alles ok
      return {
        img: i12,
        style: style_arbeitshaltung
      };
    }
  };
  const switchPipettenImageByExerciseState = () => {
    if (
      exercise &&
      !exercise.firstLayer[2].done &&
      !exercise.firstLayer[0].done &&
      !exercise.firstLayer[1].done
    ) {
      // alles falsch
      return {
        img: i7,
        style: style_pipetten
      };
    } else if (
      (!exercise.firstLayer[0].done && exercise.firstLayer[1].done) ||
      (!exercise.firstLayer[0].done && exercise.firstLayer[2].done)
    ) {
      // schutzhandschuhe richtig
      return {
        img: i7,
        style: style_pipetten
      };
    } else if (
      (exercise.firstLayer[0].done && exercise.firstLayer[1].done) ||
      (exercise.firstLayer[0].done && exercise.firstLayer[2].done)
    ) {
      // schutzhandschuhe richtig, arbeitsmittel richtig
      return {
        img: i14,
        style: style_pipetten
      };
    } else if (
      !exercise.firstLayer[2].done &&
      exercise.firstLayer[0].done &&
      !exercise.firstLayer[1].done
    ) {
      // arbeitsmittel richtig
      return {
        img: i15,
        style: { left: "286px", top: "117px" }
      };
    } else {
      // alles richtig
      return {
        img: i14,
        style: style_pipetten
      };
    }
  };
  const introExercise = () => {
    return (
      <>
        <div className="exerciseFrame">
          <div className="relative">
            <Image src={switchBackgroundImageByExerciseState()} />

            <Link
              className="absolute hoverReveal pointer"
              style={switchPipettenImageByExerciseState().style}
              to={{
                pathname: `${pathname}/${exercise.firstLayer[2].secondLayer.filename}`,
                state: {
                  currentExercise: exercise.firstLayer[2]
                }
              }}
            >
              <Popup
                trigger={
                  <Image src={switchPipettenImageByExerciseState().img} />
                }
                context={contextRef}
                content={instructions[1]}
                position="top center"
                basic
                className="instructionsPopup"
                onOpen={handleOpenInstruction}
                onClose={handleOpenInstruction}
                mouseEnterDelay={200}
                mouseLeaveDelay={200}
              />
            </Link>
            <Link
              className="absolute hoverReveal pointer"
              style={switchGlovesImageByExerciseState().style}
              to={{
                pathname: `${pathname}/${exercise.firstLayer[1].secondLayer.filename}`,
                state: {
                  currentExercise: exercise.firstLayer[1]
                }
              }}
            >
              <Popup
                trigger={<Image src={switchGlovesImageByExerciseState().img} />}
                context={contextRef}
                content={instructions[2]}
                position="top center"
                basic
                className="instructionsPopup"
                onOpen={handleOpenInstruction}
                onClose={handleOpenInstruction}
                mouseEnterDelay={200}
                mouseLeaveDelay={200}
              />
            </Link>
            <Link
              className="absolute hoverReveal pointer"
              style={switchArbeitsmittelImageByExerciseState().style}
              to={{
                pathname: `${pathname}/${exercise.firstLayer[0].secondLayer.filename}`,
                state: {
                  currentExercise: exercise.firstLayer[0]
                }
              }}
            >
              <Popup
                trigger={
                  <Image src={switchArbeitsmittelImageByExerciseState().img} />
                }
                context={contextRef}
                content={instructions[3]}
                position="top center"
                basic
                className="instructionsPopup"
                onOpen={handleOpenInstruction}
                onClose={handleOpenInstruction}
                mouseEnterDelay={200}
                mouseLeaveDelay={200}
              />
            </Link>
          </div>
          <div className="centered">
            <div className="textIntro" style={{ width: "250px" }}>
              <div className="gridList">
                <Image src={i9} />
                <div>
                  <p>
                    <b>
                      Ansicht <br /> Waschbecken und Garderobe
                    </b>
                  </p>
                  <p>
                    Durch kontaminierte Kleidungsstücke oder Geräte können
                    biologische Arbeitsstoffe schnell verbreitet werden und
                    möglicherweise zu Infektionen führen.
                  </p>
                  <p>
                    Die Hygieneregeln wie das Händewaschen oder das richtige
                    Aufbewahren der persönlichen Schutzausrüstung sind deswegen
                    wichtig!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="instructionsField">
          <strong ref={contextRef}></strong>
        </div>
        <Popup
          basic
          context={contextRef}
          content={instructions[0]}
          position="top center"
          className="instructionsPopup"
          open={defaultInstruction}
        />
      </>
    );
  };

  return introExercise();
}

export default Mikrobiologische;
