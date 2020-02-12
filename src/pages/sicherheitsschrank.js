import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Grid, Checkbox, Image, Popup, Transition } from "semantic-ui-react";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/4-chemiekalienschrank/schrank_ohne_flasche_ohne_etiket.jpg";
import i2 from "../assets/pics/4-chemiekalienschrank/schrank_mit_flasche_ohne_etiket.jpg";
import i3 from "../assets/pics/achtung_rot.png";
import i4 from "../assets/pics/frage.png";
import i5 from "../assets/pics/achtung_gruen.png";
import i6 from "../assets/pics/achtung.png";
import i7 from "../assets/pics/4-chemiekalienschrank/btn_etikett.png";
import i10 from "../assets/pics/4-chemiekalienschrank/grau_azeton.jpg";
import i8 from "../assets/pics/4-chemiekalienschrank/btn_flasche.png";
import i9 from "../assets/pics/4-chemiekalienschrank/schrank_loesung_bg.jpg";
import i11 from "../assets/pics/4-chemiekalienschrank/btn_etikett_mit_ankleber.png";
import markNodeDone from "../util/externalFunctions";
import aceton_1 from "../assets/pics/4-chemiekalienschrank/aceton_1.png";
import aceton_2 from "../assets/pics/4-chemiekalienschrank/aceton_2.png";
import aceton_3 from "../assets/pics/4-chemiekalienschrank/aceton_3.png";
import aceton_4 from "../assets/pics/4-chemiekalienschrank/aceton_4.png";
import i_q from "../assets/pics/querverweis.png";

function Sicherheitsschrank(props) {
  const popup_array = [aceton_1, aceton_2, aceton_3, aceton_4];
  // state to go through active page
  const [tocState] = useContext(TocContext);
  // load global state of tocPages
  const [tocPages, setTocPages] = useContext(PagesContext);
  // recieved exercise object as state from page with exercises
  // each Link to exercise has such params
  const [my_exercise, setMyExercise] = useState(
    (props.location.state && props.location.state.currentExercise) ||
      tocState.currentExerciseByPath
  );
  const [sibling_exercise] = useState(
    (props.location.state && props.location.state.siblingExercise) ||
      tocPages[3].pages[0]
  );

  const [activeActualExercise, setActiveActualExercise] = useState(null);
  const [radioGroupState, setRadioGroupState] = useState(" ");
  const [animationTrigger, setAnimationTrigger] = useState(false);
  const [triggerWarning, setTrigger] = useState(false);
  // label of radio buttons and answerIndex which is index in array of labels that is a right answer.
  const aufgabe = {
    labels: [
      "Gemäß GHS und CLP-Verordnung darf keine vereinfachte Kennzeichnung mehr vorgenommen werden. Der Behälter ist analog zum Herstelleretikett vollständig zu kennzeichnen.",
      "Mit Stoffnamen, Gefahrenpiktogrammen und Signalwort.",
      "Mit Stoffnamen und bis zu 3 Gefahrenpiktogrammen mit kurzen Phrasen/Gefahreninfos.",
      "Mit Stoffnamen, bis zu 3 Gefahrenpiktogrammen, Signalwort und H-Sätzen."
    ],
    answerIndex: 2
  };

  // instructions for pictures
  const instructions = [
    "Suchen Sie im Bild nach aktiven Bereichen und überprüfen Sie ob alles in Ordnung ist!",
    "Behälter mit unkenntlichem Etikett",
    "Flasche mit einer leicht entzündbaren Flüssigkeit.",
    "Klicken Sie die Aussage an, die Ihrer Meinung nach zutrifft!",
    "Behälter mit vereinfachter Kennzeichnung",
    "Klicken Sie die Aussage an, die Ihrer Meinung nach zutrifft.",
    "Klicken Sie auf eine beliebige Position, um in die vorherige Ansicht zu gelangen."
  ];
  const [currentInstruction, setCurrentInstruction] = useState(instructions[0]);

  const [OpenWarning, setOpenWarning] = useState(false);
  // handle open warning window if exercise with "Flasche mit einer leicht entzündbaren Flüssigkeit" has been already done
  const handleOpenWarning = () => {
    console.log("open");
    setOpenWarning(true);
  };
  // parse radioButtons from aufgabe object
  const generateRadioButtons = () => {
    return aufgabe.labels.map((radioButton, i) => {
      return (
        <Popup
          key={`${radioButton}-${i}`}
          className="warning"
          disabled={triggerWarning}
          trigger={
            <Checkbox
              label={radioButton}
              value={i}
              onChange={handleChange}
              checked={radioGroupState === i}
            />
          }
          offset="0 , 8px"
          position="left center"
          style={{
            minWidth: "609px",
            minHeight: "271px",
            background: "initial",
            boxShadow: "0 0 0 0",
            border: "0"
          }}
          on="hover"
        >
          <Popup.Content>
            <Image src={popup_array[i]} centered />
          </Popup.Content>
        </Popup>
      );
    });
  };
  // handle change of radio button,
  //set state of exercise,
  //add click event to get back to other exercise
  const handleChange = (e, { value }) => {
    if (value !== aufgabe.answerIndex) {
      tryAgain(value);
    } else {
      isDone();
      setRadioGroupState(value);
      setAnimationTrigger(true);
      document
        .getElementById("panel")
        .addEventListener("mousedown", handleClickToReturnBack);
    }
  };
  // add click event to document to return to other exercises and reset click events
  const handleClickToReturnBack = () => {
    document
      .getElementById("panel")
      .removeEventListener("mousedown", handleClickToReturnBack);
    window.location.reload();
  };

  // reset state of current exercise
  const resetAllAnswers = () => {
    setRadioGroupState("this");
    setTrigger(false);
    removeClick();
  };
  // set up current exercise state and set click event to reset radio button states
  const tryAgain = value => {
    setRadioGroupState(value);
    setTrigger(true);
    document.addEventListener("mousedown", resetAllAnswers);
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
  // if exercise has been already done, go back
  useEffect(() => {
    return () => {
      document
        .getElementById("panel")
        .removeEventListener("mousedown", handleClickToReturnBack);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleClickToReturnBack]);
  console.log(my_exercise);
  function Notification(state) {
    switch (state) {
      case 0:
        return (
          <p>
            Die CLP-Verordnung regelt nur die Anforderungen zum
            Herstelleretikett. Die Gefahrstoffverordnung erlaubt nach wie vor
            eine vereinfachte Kennzeichnung im Betrieb, sofern die Mitarbeiter
            über die Gefährdungen und Schutzmaßnahmen unterwiesen wurden.
          </p>
        );
      case 1:
        return (
          <p>
            Diese vereinfachte Kennzeichnung ist zwar gemäß der TRGS 201
            Einstufung und Kennzeichnung bei Tätigkeiten mit Gefahrstoffen
            möglich, aber wegen der wenig aussagekräftigen Signalworte, der
            großen Anzahl von verschiedenen Stoffen im Labor und der z.T.
            mehrdeutigen Piktogramme nicht optimal.
          </p>
        );
      case 2:
        return (
          <p>
            Diese Flasche mit einer leicht entzündbaren Flüssigkeit haben Sie
            aus dem Regal in diesen Sicherheitsschrank gestellt.
          </p>
        );
      default:
        return null;
    }
  }

  const actualExercise = () => {
    if (my_exercise.done)
      document
        .getElementById("panel")
        .addEventListener("mousedown", handleClickToReturnBack);
    return (
      <>
        <div className="exerciseFrame">
          <Grid style={{ width: "100%" }}>
            <Grid.Row columns="2">
              <Grid.Column width="10" className="relative">
                {sibling_exercise && sibling_exercise.done ? (
                  <>
                    <Image
                      src={i2}
                      className="absolute"
                      style={{ top: "0", left: "13px" }}
                    />

                    <Image
                      src={i7}
                      className="absolute"
                      style={{ top: "174px", left: "226px" }}
                    />
                  </>
                ) : (
                  <>
                    <Image
                      src={i1}
                      className="absolute"
                      style={{ top: "0", left: "13px" }}
                    />
                    <Image
                      src={i7}
                      className="absolute"
                      style={{ top: "174px", left: "226px" }}
                    />
                  </>
                )}
                <Transition
                  visible={
                    animationTrigger || (my_exercise && my_exercise.done)
                  }
                  animation="fade"
                  duration={animationTrigger ? 700 : 0}
                  className="absolute"
                >
                  <Image
                    src={i9}
                    className="absolute"
                    style={{ top: 0, width: "928px", maxWidth: "none" }}
                  />
                </Transition>
              </Grid.Column>
              <Grid.Column width="6">
                <div className="relative fullHeight">
                  <Transition
                    visible={my_exercise && !my_exercise.done}
                    animation="fade"
                    duration={animationTrigger ? 700 : 0}
                  >
                    <div className="absolute" style={{ top: "5%" }}>
                      <div className="gridList" style={{ width: "300px" }}>
                        <h1 className="my_title small">
                          Das Etikett ist durch ausgelaufene Flüssigkeit nicht
                          mehr zu lesen. Wie sollte der Behälter vereinfacht
                          gekennzeichnet werden?
                        </h1>
                        <Image src={i4} />
                      </div>

                      <Popup
                        className="warning"
                        trigger={
                          <div
                            className="exerciseContainer"
                            style={{ width: "300px" }}
                          >
                            {generateRadioButtons()}
                          </div>
                        }
                        offset="0 , 8px"
                        position="left center"
                        hoverable={false}
                        open={triggerWarning && radioGroupState !== 2}
                      >
                        <div className="gridList" style={{ width: "300px" }}>
                          <Image src={i3} centered />
                          <div>
                            <Popup.Header as="span" className="headerPop">
                              Diese Antwort war leider falsch!
                            </Popup.Header>
                            <Popup.Content style={{ marginTop: "10px" }}>
                              {Notification(radioGroupState)}
                            </Popup.Content>
                          </div>
                        </div>
                      </Popup>
                      <div style={{ marginTop: "20px", width: "330px" }}>
                        <p>
                          Weitere Informationen zu dieser Frage erhalten Sie in
                          Kapitel {"  "}
                          <a
                            target="_blank"
                            href="../../fachinformation-responsiv/kapb/vereinfachte_kennzeichnung.htm"
                            className="externalLink"
                          >
                            <span className="linkContent">
                              <Image src={i_q} />B 7.8.6 Vereinfachte
                              Kennzeichnung
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
                    <div
                      className="absolute "
                      style={{
                        top: "13%",
                        padding: "30px",
                        background: "rgba(255,255,255,.8)",
                        width: "340px",
                        left: "-90px",
                        borderRadius: "15px"
                      }}
                    >
                      <div
                        className="gridList"
                        style={{ width: "270px", columnGap: "15px" }}
                      >
                        <Image src={i5} />
                        <div>
                          <span className="my_title small">Richtig</span>
                          <p style={{ marginTop: "5px" }}>
                            Im Anhang 4 der aktuellen Laborrichtlinie wird die
                            vereinfachte Kennzeichnung im Labor beschrieben: Die
                            kurzen Phrasen in Kombination mit den Piktogrammen
                            geben eine schnelle und aussagekräftige
                            Gefahrenauskunft.
                          </p>
                          <p>
                            Berücksichtigen Sie bei der Auswahl der
                            Piktogramm-Phrasen- Kombinationen auch Ihre
                            Gefährdungsbeurteilung. Bei größeren Mengen Aceton
                            im Anfängerpraktikum kann z.B. zusätzlich die Phrase
                            „Betäubend“ sinnvoll sein.
                          </p>
                          <p>
                            Notwendige Details können in den
                            Sicherheitsdatenblättern und Betriebsanweisungen
                            nachgeschlagen werden.
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
      </>
    );
  };
  const preExercise = () => {
    return (
      <>
        <div className="exerciseFrame">
          <Grid style={{ width: "100%" }}>
            <Grid.Row columns="2">
              <Grid.Column width="10" className="relative">
                {sibling_exercise && sibling_exercise.done ? (
                  <Image
                    src={i2}
                    className="absolute"
                    style={{ top: "0", left: "13px" }}
                  />
                ) : (
                  <Image src={i1} />
                )}
                <div
                  className="absolute hoverReveal pointer"
                  style={{
                    right: "200px",
                    top: "174px",
                    backgroundImage: `url('${my_exercise &&
                      my_exercise.done &&
                      i10}')`,
                    backgroundRepeat: "no-repeat"
                  }}
                  onClick={() => setActiveActualExercise(true)}
                >
                  {my_exercise && my_exercise.done ? (
                    <Image
                      src={i11}
                      onMouseEnter={() =>
                        setCurrentInstruction(instructions[4])
                      }
                      onMouseLeave={() =>
                        setCurrentInstruction(instructions[0])
                      }
                    />
                  ) : (
                    <Image
                      src={i7}
                      onMouseEnter={() =>
                        setCurrentInstruction(instructions[1])
                      }
                      onMouseLeave={() =>
                        setCurrentInstruction(instructions[0])
                      }
                    />
                  )}
                </div>
                {sibling_exercise && sibling_exercise.done && (
                  <div
                    onClick={handleOpenWarning}
                    onMouseEnter={() => setCurrentInstruction(instructions[2])}
                    onMouseLeave={() => setCurrentInstruction(instructions[0])}
                  >
                    {
                      <div
                        className="absolute hoverReveal pointer"
                        style={{ right: "355px", top: "82px" }}
                        onMouseLeave={() => setOpenWarning(false)}
                      >
                        <Image src={i8} />
                        <div
                          className={`ui popup  right center  warning absolute ${
                            OpenWarning ? "visible" : null
                          }`}
                          style={{ minWidth: "252px", left: "100%" }}
                        >
                          <Popup.Header as="span" className="headerPop">
                            Aufgabe bereits erfolgreich gelöst
                          </Popup.Header>
                          <Popup.Content
                            style={{ paddingLeft: "7px" }}
                          ></Popup.Content>
                        </div>
                      </div>
                    }
                  </div>
                )}
              </Grid.Column>
              <Grid.Column width="6">
                <div className="relative fullHeight">
                  <div className="absolute " style={{ top: "13%" }}>
                    <div
                      className="gridList"
                      style={{ width: "260px", columnGap: "30px" }}
                    >
                      <Image src={i6} />
                      <div>
                        <span className="my_title small">
                          Ansicht Sicherheitsschrank
                        </span>
                        <p style={{ marginTop: "5px" }}>
                          Sicherheitsschränke sind besondere Lagereinrichtungen
                          für entzündbare Flüssigkeiten.
                        </p>
                        <p>
                          Im Brandfall halten sie einem Feuer viele Minuten
                          stand und verhindern die schnelle Entzündung der
                          Stoffe und Gemische, so dass sich die Personen in
                          Sicherheit bringen können.
                        </p>
                        <p>Schauen Sie sich den Inhalt genauer an!</p>
                      </div>
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
  };
  return !activeActualExercise ? preExercise() : actualExercise();
}

export default withRouter(Sicherheitsschrank);
