import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image } from "semantic-ui-react";
import i3 from "../assets/pics/7-mitarbeiter/food_false_active.jpg";
import i2 from "../assets/pics/7-mitarbeiter/food_false_passive.jpg";
import i5 from "../assets/pics/7-mitarbeiter/smoke_false_active.jpg";
import i4 from "../assets/pics/7-mitarbeiter/smoke_false_passive.jpg";
import i1 from "../assets/pics/7-mitarbeiter/tisch_leer.jpg";
import i6 from "../assets/pics/7-mitarbeiter/armel-active.png";
import i7 from "../assets/pics/7-mitarbeiter/kittel-active.png";
import i8 from "../assets/pics/7-mitarbeiter/brille-active.png";
import i10 from "../assets/pics/7-mitarbeiter/schuhe-active.png";
import i9 from "../assets/pics/achtung.png";
import { pictureSet } from "./mitarbeiterPicturesArray"
import { PagesContext } from "../util/PagesProvider";
import { TocContext } from "../util/TocProvider";
import MitarbeiterPicture from "./mitarbeiterPicture";

function Mitarbeiter(props) {
    // global state of pages
    const [tocPages] = useContext(PagesContext);
    // state to go through active page
    const [tocState, setTocState] = useContext(TocContext);

    // state to manage exercise object state
    const [exercise, setExercise] = useState(tocPages[tocState.activeMenu]);

    const pathname = props.location.pathname;
    console.log(exercise);

    // instructions for pictures
    const instructions = [
        "Suchen Sie im Bild nach aktiven Bereichen und überprüfen Sie ob alles in Ordnung ist!",
        "Waschbecken",
        "Garderobe für Arbeitskleidung"
    ];
    const [currentInstruction, setCurrentInstruction] = useState(instructions[0]);

    const [currentMittarbeiter, setMitarbeiter] = useState(15)

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
        if (exercise.pages[0].done && exercise.pages[1].done && exercise.pages[2].done && exercise.pages[2].done) setMitarbeiter(14)

    }

    const style_food_false = {
        left: "0",
        bottom: "111px",
        backgroundImage: `url('${exercise && !exercise.pages[5].done && i2}')`,
        backgroundRepeat: "no-repeat"
    };
    const style_smoke_flase = {
        left: "136px",
        top: "302px",
        backgroundImage: `url('${exercise && !exercise.pages[4].done && i4}')`,
        backgroundRepeat: "no-repeat"
    };
    useEffect(() => {
        setMitarbeiterPicture()
    }, []);
    const introExercise = () => {
        return (
            <>
                <div className="exerciseFrame">
                    <div className="relative" style={{ width: "100%" }}>
                        <div style={{ position: "absolute", left: "0", bottom: "0", display: "flex" }}>
                            <Image src={i1} />
                        </div>
                        <Link
                            onMouseEnter={() => setCurrentInstruction(instructions[2])}
                            onMouseLeave={() => setCurrentInstruction(instructions[0])}
                            className="absolute hoverReveal pointer"
                            style={style_food_false}
                            to={{
                                pathname: `${pathname}/${exercise.pages[5].filename}`,
                                state: {
                                    currentExercise: exercise.pages[5]
                                }
                            }}
                        >
                            {exercise.pages[5].done ? <Image src={i5} /> : <Image src={i3} />}
                        </Link>
                        <Link
                            onMouseEnter={() => setCurrentInstruction(instructions[1])}
                            onMouseLeave={() => setCurrentInstruction(instructions[0])}
                            className="absolute hoverReveal pointer"
                            style={style_smoke_flase}
                            to={{
                                pathname: `${pathname}/${exercise.pages[4].filename}`,
                                state: {
                                    currentExercise: exercise.pages[4]
                                }
                            }}
                        >
                            <Image src={i5} />
                        </Link>
                        <div style={{ position: "absolute", right: "0", top: "20px" }}>
                            <MitarbeiterPicture currentMittarbeiter={currentMittarbeiter} />
                            <Link
                                onMouseEnter={() => setCurrentInstruction(instructions[2])}
                                onMouseLeave={() => setCurrentInstruction(instructions[0])}
                                className="absolute hoverReveal pointer"
                                style={pictureSet[currentMittarbeiter].armel}
                                to={{
                                    pathname: `${pathname}/${exercise.pages[0].filename}`,
                                    state: {
                                        currentExercise: exercise.pages[0]
                                    }
                                }}
                            >
                                <Image src={i6} />
                            </Link>
                            <Link
                                onMouseEnter={() => setCurrentInstruction(instructions[2])}
                                onMouseLeave={() => setCurrentInstruction(instructions[0])}
                                className="absolute hoverReveal pointer"
                                style={pictureSet[currentMittarbeiter].kittle}
                                to={{
                                    pathname: `${pathname}/${exercise.pages[1].filename}`,
                                    state: {
                                        currentExercise: exercise.pages[1]
                                    }
                                }}
                            >
                                <Image src={i7} />
                            </Link>
                            <Link
                                onMouseEnter={() => setCurrentInstruction(instructions[2])}
                                onMouseLeave={() => setCurrentInstruction(instructions[0])}
                                className="absolute hoverReveal pointer"
                                style={pictureSet[currentMittarbeiter].schuhe}
                                to={{
                                    pathname: `${pathname}/${exercise.pages[2].filename}`,
                                    state: {
                                        currentExercise: exercise.pages[2]
                                    }
                                }}
                            >
                                <Image src={i10} />
                            </Link>
                            <Link
                                onMouseEnter={() => setCurrentInstruction(instructions[2])}
                                onMouseLeave={() => setCurrentInstruction(instructions[0])}
                                className="absolute hoverReveal pointer"
                                style={pictureSet[currentMittarbeiter].brille}
                                to={{
                                    pathname: `${pathname}/${exercise.pages[3].filename}`,
                                    state: {
                                        currentExercise: exercise.pages[3]
                                    }
                                }}
                            >
                                <Image src={i8} />
                            </Link>
                        </div>
                    </div>
                    <div className="centered" style={{ width: "60%", flex: "auto" }}>
                        <div className="textIntro" style={{ width: "250px" }}>
                            <div className="gridList">
                                <Image src={i9} />
                                <div>
                                    <p>
                                        <b>
                                            Ansicht Mitarbeiter
                                        </b>
                                    </p>
                                    <p>
                                        Für die Arbeiten im Laboratorium gibt es eine besondere Kleiderordnung, die alle Mitarbeiter und Besucher beachten müssen.
                  </p>
                                    <p>
                                        Informieren Sie Ihren Kollegen, der offensichtlich einige Anweisungen missverstanden hat.
                  </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="instructionsField">
                    <span>{currentInstruction}</span>
                </div>
            </>
        );
    };

    return introExercise();
}

export default Mitarbeiter;
