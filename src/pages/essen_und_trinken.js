import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Button, Checkbox, Grid, Image, Popup, Transition } from "semantic-ui-react";
import i3 from "../assets/pics/7-mitarbeiter/food_false_active.jpg";
import i7 from "../assets/pics/7-mitarbeiter/noeating.png";

import i11 from "../assets/pics/7-mitarbeiter/nosmoking_sign.png";
import i9 from "../assets/pics/7-mitarbeiter/smoke_false_passive.jpg";
import i10 from "../assets/pics/7-mitarbeiter/sidebar_essen.jpg";
import i1 from "../assets/pics/7-mitarbeiter/tisch_leer.jpg";
import i5 from "../assets/pics/achtung_gruen.png";
import i6 from "../assets/pics/achtung_rot.png";
import i4 from "../assets/pics/frage.png";
import markNodeDone from "../util/externalFunctions";
import { PagesContext } from "../util/PagesProvider";
import { TocContext } from "../util/TocProvider";
import MitarbeiterPicture from "./mitarbeiterPicture";

function Essen_und_trinken(props) {
    // state to go through active page
    const [tocState, setTocState] = useContext(TocContext);
    // load global state of tocPages
    const [tocPages, setTocPages] = useContext(PagesContext);
    // state to manage exercise object state
    const [exercise, setExercise] = useState(tocPages[tocState.activeMenu]);

    // recieved exercise object as state from page with exercises
    // each Link to exercise has such params
    const [my_exercise, setMyExercise] = useState(
        (props.location.state && props.location.state.currentExercise) ||
        tocState.currentExerciseByPath
    );
    const [radioGroupState, setRadioGroupState] = useState({
        r0: false,
        r1: false,
        r2: false,
    });
    const [animationTrigger, setAnimationTrigger] = useState(false);
    const [triggerWarning, setTrigger] = useState(false);
    // label of radio buttons and answerIndex which is index in array of labels that is a right answer.
    const aufgabe = {
        labels: [
            "Bei Tätigkeiten mit Gefahrstoffen dürfen keine Nahrungsmittel mit in das Labor genommen werden..",
            "Nahrungsmittel dürfen nicht zusammen mit Chemikalien aufbewahrt werden.",
            "Für Chemikalien dürfen keine Gefäße benutzt werden, die üblicherweise für Speisen und Getränke bestimmt sind.",
        ],
        answerBitValue: 7 // to complete exercise compare BitValue of radioGroupState and this answerBitValue
    };
    const instructions = [
        "Klicken Sie die Aussagen an, die Ihrer Meinung nach zutreffen",
        "Klicken Sie auf eine beliebige Position, um in die vorherige Ansicht zu gelangen."
    ];
    const [currentMittarbeiter, setMitarbeiter] = useState(0)
    const setMitarbeiterPicture = () => {
        if (!exercise.pages[0].done && !exercise.pages[1].done && !exercise.pages[2].done && !exercise.pages[2].done) setMitarbeiter(0)
        if (exercise.pages[3].done) setMitarbeiter(1)
        if (exercise.pages[2].done) setMitarbeiter(2)
        if (exercise.pages[2].done && exercise.pages[3].done) setMitarbeiter(3)
        if (exercise.pages[1].done) setMitarbeiter(4)
        if (exercise.pages[1].done && exercise.pages[3].done) setMitarbeiter(5)
        if (exercise.pages[1].done && exercise.pages[2].done) setMitarbeiter(6)
        if (exercise.pages[1].done && exercise.pages[2].done && exercise.pages[2].done) setMitarbeiter(7)
        if (exercise.pages[0].done) setMitarbeiter(8)
        if (exercise.pages[0].done && exercise.pages[3].done) setMitarbeiter(9)
        if (exercise.pages[0].done && exercise.pages[2].done) setMitarbeiter(10)
        if (exercise.pages[0].done && exercise.pages[2].done && exercise.pages[1].done) setMitarbeiter(11)
        if (exercise.pages[0].done && exercise.pages[1].done) setMitarbeiter(12)
        if (exercise.pages[0].done && exercise.pages[1].done && exercise.pages[3].done) setMitarbeiter(13)
        if (exercise.pages[0].done && exercise.pages[1].done && exercise.pages[2].done) setMitarbeiter(14)
        if (exercise.pages[0].done && exercise.pages[1].done && exercise.pages[2].done && exercise.pages[3].done) setMitarbeiter(15)

    }
    // if exercise has been already done, go back
    useEffect(() => {
        if (my_exercise.done)
            document.addEventListener("mousedown", handleClickToReturnBack);

        setMitarbeiterPicture()
        return () => {
            document.removeEventListener("mousedown", handleClickToReturnBack);
        }
    }, [])
    // parse radioButtons from aufgabe object
    // each button gets value 1=> which is used ba evaluation, compare bit value of multiple radiobuttons
    const generateRadioButtons = () => {
        return aufgabe.labels.map((radioButton, i) => {
            return (
                <Checkbox
                    key={`radioButton-${i}`}
                    name={"r" + i}
                    label={radioButton}
                    value={i > 0 ? i * 2 : 1}
                    onChange={handleChange}
                    checked={radioGroupState[`r${i}`] === (i > 0 ? i * 2 : 1)}
                />
            );
        });
    };

    // check if answerBitValue match bitValue of checkbox group ->
    //set state of exercise,
    //add click event to get back to other exercise
    const handleSubmit = () => {
        // get sum of objects values to get bitvalue of radio button group
        let sum = Object.values(radioGroupState).reduce(
            (accumulator, currentValue) => accumulator + currentValue
        );
        if ((sum & aufgabe.answerBitValue) === aufgabe.answerBitValue) {
            isDone();
            setAnimationTrigger(true);
            document.addEventListener("mousedown", handleClickToReturnBack);
        } else {
            tryAgain();
        }
    };
    // handle change of radio button,
    const handleChange = (e, { name, value }) => {
        if (!radioGroupState[name]) {
            setRadioGroupState(old => ({ ...old, [name]: value }));
        } else {
            setRadioGroupState(old => ({ ...old, [name]: false }));
        }
        console.log(radioGroupState);
    };

    // add click event to document to return to other exercises and reset click events
    const handleClickToReturnBack = () => {
        document.removeEventListener("mousedown", handleClickToReturnBack);
        props.history.goBack();
    };

    // reset state of current exercise
    const resetAllAnswers = () => {
        setRadioGroupState({ r0: false, r1: false, r2: false });
        setTrigger(false);
        removeClick();
    };
    // set up current exercise state and set click event to reset radio button states
    const tryAgain = value => {
        setTrigger(true);
        document.addEventListener("mousedown", resetAllAnswers);
    };
    // reset click event on document
    const removeClick = () => {
        document.removeEventListener("mousedown", resetAllAnswers);
    };

    // check if any of radiobuttons are checked
    function checkRadioButtonsStatus() {
        let sum = Object.values(radioGroupState).reduce(
            (accumulator, currentValue) => accumulator + currentValue
        );
        return sum > 0 ? true : false;
    }

    // if page refreshs go to Grundriss page
    //const path = props.location.pathname.split("/");
    //path.pop();
    //const r = path.join("/");
    // if (!my_exercise) props.history.push("/virtueles_labor/grundriss");

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

    const style_food_false = {
        left: "0",
        bottom: "111px",

    };
    const style_smoke_false = {
        left: "136px",
        top: "302px",

    };
    const style_smoke_true = {
        display: "flex",
        position: "absolute",
        left: "38px",
        top: "38px",
    };
    return (
        <>
            <div className="exerciseFrame">
                <Grid style={{ width: "100%" }} padded="horizontally">
                    <Grid.Row columns="2">
                        <Grid.Column width="11" className="relative">
                            <div style={{ position: "absolute", left: "0", bottom: "0", display: "flex" }}>
                                <Image src={i1} />
                            </div>
                            <div
                                className="absolute  pointer"
                                style={style_food_false}
                            >
                                {my_exercise.done ? null : <Image src={i3} />}
                            </div>
                            <div
                                className="absolute  "
                                style={exercise.pages[4].done ? style_smoke_true : style_smoke_false}

                            >
                                {exercise.pages[4].done ? <Image src={i11} /> : <Image src={i9} />}
                            </div>
                            <div style={{ position: "absolute", right: "58px", top: "20px" }}>
                                <MitarbeiterPicture currentMittarbeiter={currentMittarbeiter} />
                            </div>
                            <Transition
                                visible={animationTrigger || (my_exercise && my_exercise.done)}
                                animation="fade"
                                duration={animationTrigger ? 700 : 0}
                                className="absolute"
                            >
                                <Image
                                    src={i7}
                                    className="absolute"
                                    style={{
                                        top: "30px",
                                        left: "150px",
                                    }}
                                />
                            </Transition>
                        </Grid.Column>
                        <Grid.Column width="5">
                            <div
                                className="relative fullHeight"
                                style={{ paddingLeft: "10px" }}
                            >
                                <Transition
                                    visible={my_exercise && !my_exercise.done}
                                    animation="fade"
                                    duration={animationTrigger ? 700 : 0}
                                >
                                    <div
                                        className="absolute"
                                        style={{
                                            top: "7%",
                                            width: "250px"
                                        }}
                                    >
                                        <div className="gridList" >
                                            <h1 className="my_title small">
                                                Beurteilen Sie, welche Aussagen für den Umgang mit
                                                Nahrungsmitteln im Labor richtig sind.
                                            </h1>
                                            <Image src={i4} />
                                        </div>
                                        <Popup
                                            className="warning"
                                            hoverable={false}
                                            trigger={
                                                <div
                                                    className="exerciseContainer"
                                                >
                                                    {generateRadioButtons()}
                                                    <Button
                                                        disabled={!checkRadioButtonsStatus()}
                                                        type="submit"
                                                        compact
                                                        style={{ margin: "20px 30px 5px 30px" }}
                                                        onClick={() => handleSubmit()}
                                                    >
                                                        Auswertung
                                                    </Button>
                                                </div>
                                            }
                                            offset="0, 25px"
                                            position="left center"
                                            open={triggerWarning}
                                        >
                                            <Popup.Header as="span" className="headerPop">
                                                Dieser Antwort war leider falsch!
                                            </Popup.Header>
                                            <Popup.Content>
                                                <Image src={i6} centered />
                                            </Popup.Content>
                                        </Popup>
                                        <div style={{ marginTop: "20px" }}>
                                            <p>
                                                Weitere Informationen zu dieser Frage erhalten Sie in
                                                der Kapitel ÄNDERN!!!!
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
                                        style={{ top: "9%", left: "0px" }}
                                    >
                                        <div
                                            className=" gridList "
                                            style={{ width: "250px", columnGap: "30px" }}
                                        >
                                            <Image src={i5} />
                                            <div>
                                                <span className="my_title small">Richtig!</span>
                                                <p style={{ marginTop: "5px" }}>
                                                    Für die Aufbewahrung und den Verzehr von Nahrungsmitteln stehen i.d.R. entsprechende Sozialbereiche zur Verfügung.

                                                </p>
                                                <Image src={i10} style={{ border: " 1px solid grey", marginTop: "30px" }} />
                                            </div>

                                        </div>

                                        <div
                                            style={{ position: "absolute", top: "0", right: "0" }}
                                            onClick={() => isDone()}
                                        >
                                            Reset
                    </div>
                                    </div>
                                </Transition>
                            </div>
                            <button onClick={() => isDone()} style={{ marginTop: "20px" }}>
                                RESET
              </button>
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
}

export default withRouter(Essen_und_trinken);