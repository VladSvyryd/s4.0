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

function Sicherheitsschrank(props) {
  // state to go through active page
  const [tocState, setTocState] = useContext(TocContext);
  // load global state of tocPages
  const [tocPages, setTocPages] = useContext(PagesContext);
  // recieved exercise object as state from page with exercises
  // each Link to exercise has such params
  const [my_exercise, setMyExercise] = useState(
    props.location.state && props.location.state.currentExercise
  );
  const [sibling_exercise] = useState(
    props.location.state && props.location.state.siblingExercise
  );
  const [activeActualExercise, setActiveActualExercise] = useState(null);
  const [radioGroupState, setRadioGroupState] = useState(" ");
  const [animationTrigger, setAnimationTrigger] = useState(false);

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

  // parse radioButtons from aufgabe object
  const generateRadioButtons = () => {
    return aufgabe.labels.map((radioButton, i) => {
      return i !== aufgabe.answerIndex ? (
        <Popup
          key={`${radioButton}-${i}`}
          className="warning"
          trigger={
            <Checkbox
              label={radioButton}
              value={i}
              onChange={handleChange}
              checked={radioGroupState === i}
            />
          }
          offset="0, 25px"
          position="left center"
          open={radioGroupState === i}
        >
          <Popup.Header as="span" className="headerPop">
            Dieser Antwort war leider falsch!
          </Popup.Header>
          <Popup.Content>
            <Image src={i3} centered />
          </Popup.Content>
        </Popup>
      ) : (
        <Checkbox
          key={`${radioButton}-${i}`}
          label={radioButton}
          value={i}
          checked={radioGroupState === i}
          onChange={handleChange}
        />
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
      document.addEventListener("mousedown", handleClickToReturnBack);
    }
  };
  // add click event to document to return to other exercises and reset click events
  const handleClickToReturnBack = () => {
    document.removeEventListener("mousedown", handleClickToReturnBack);
    props.history.goBack();
  };

  // reset state of current exercise
  const resetAllAnswers = () => {
    setRadioGroupState("this");
    removeClick();
  };
  // set up current exercise state and set click event to reset radio button states
  const tryAgain = value => {
    setRadioGroupState(value);
    document.addEventListener("mousedown", resetAllAnswers);
  };
  // reset click event on document
  const removeClick = () => {
    document.removeEventListener("mousedown", resetAllAnswers);
  };
  // if page refreshs go to Grundriss page
  const path = props.location.pathname.split("/");
  path.pop();
  const r = path.join("/");
  if (!my_exercise) props.history.push("/virtueles_labor/grundriss");

  // set exercise as done
  // get pages object from local storage, change with new state, trigger tocPages events to save pages object back to local storage
  function isDone() {
    // parse pages from local storage
    let pagesFromLocalStorage = JSON.parse(localStorage.getItem("pagesList"));

    // go throught all subpages of active page, search for same ID, change status of exercise to done: true
    pagesFromLocalStorage[tocState.activeMenu].firstLayer.map(e => {
      let result = e;
      if (e.secondLayer.id == my_exercise.secondLayer.id) {
        e.done = !e.done;
        result = e;
      }
      return result;
    });
    // trigger tocPages function to resave Pages on local storage
    setTocPages(pagesFromLocalStorage);
    // change local state of exercise as done to trigger changes on the Page
    setMyExercise(old => ({
      ...old,
      done: !old.done
    }));
  }
  const actualExercise = () => {
    return (
      <div className="exerciseFrame">
        <Grid style={{ width: "100%" }}>
          <Grid.Row columns="2">
            <Grid.Column width="10" className="relative">
              {sibling_exercise && sibling_exercise.done ? (
                <Image
                  src={i2}
                  className="absolute"
                  style={{ top: "0", left: "15px" }}
                />
              ) : (
                <Image src={i1} />
              )}
              <Transition
                visible={animationTrigger || (my_exercise && my_exercise.done)}
                animation="fade"
                duration={animationTrigger ? 500 : 0}
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
                  duration={animationTrigger ? 500 : 0}
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
                    <div
                      className="exerciseContainer"
                      style={{ width: "300px" }}
                    >
                      {generateRadioButtons()}
                    </div>
                    <div style={{ marginTop: "20px", width: "330px" }}>
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
                  duration={animationTrigger ? 500 : 0}
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
                      className=" gridList "
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
                          Gefährdungsbeurteilung. Bei größeren Mengen Aceton im
                          Anfängerpraktikum kann z.B. zusätzlich die Phrase
                          „Betäubend“ sinnvoll sein.
                        </p>
                        <p>
                          Notwendige Details können in den
                          Sicherheitsdatenblättern und Betriebsanweisungen
                          nachgeschlagen werden.
                          <button
                            onClick={() => isDone()}
                            style={{ background: "grey" }}
                          >
                            RESET
                          </button>
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
    );
  };
  const preExercise = () => {
    return (
      <div className="exerciseFrame">
        <Grid style={{ width: "100%" }}>
          <Grid.Row columns="2">
            <Grid.Column width="10" className="relative">
              {sibling_exercise && sibling_exercise.done ? (
                <Image
                  src={i2}
                  className="absolute"
                  style={{ top: "0", left: "15px" }}
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
                  <Image src={i11} />
                ) : (
                  <Image src={i7} />
                )}
              </div>
              {sibling_exercise && sibling_exercise.done && (
                <Popup
                  className="warning"
                  trigger={
                    <div
                      className="absolute hoverReveal pointer"
                      style={{ right: "355px", top: "82px" }}
                    >
                      <Image src={i8} />
                    </div>
                  }
                  offset="0, 25px"
                  position="right center"
                  on="click"
                  style={{ minWidth: "252px" }}
                >
                  <Popup.Header as="span" className="headerPop">
                    Aufgabe bereits erfolgreich gelöst
                  </Popup.Header>
                  <Popup.Content style={{ paddingLeft: "7px" }}>
                    <p>
                      Diese Flasche mit einer leicht entzündbaren Flüssigkeit
                      haben Sie aus dem Regal in diesen Sicherheitsschrank
                      gestellt.
                    </p>
                  </Popup.Content>
                </Popup>
              )}
            </Grid.Column>
            <Grid.Column width="6">
              <div className="relative fullHeight">
                <div className="absolute " style={{ top: "13%" }}>
                  <div
                    className=" gridList "
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
                        Im Brandfall halten sie einem Feuer viele Minuten stand
                        und verhindern die schnelle Entzündung der Stoffe und
                        Gemische, so dass sich die Personen in Sicherheit
                        bringen können.
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
    );
  };
  return !activeActualExercise ? preExercise() : actualExercise();
}

export default withRouter(Sicherheitsschrank);
