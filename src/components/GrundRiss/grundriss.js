import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Image, Grid } from "semantic-ui-react";
import Toc from "../Body/Toc/Toc";
import { TocContext } from "../../util/TocProvider";
import { PagesContext } from "../../util/PagesProvider";

import i1 from "../../assets/pics/grundriss.png";
import i2 from "../../assets/pics/Grundriss/Buero_aktiv1.png";
import i3 from "../../assets/pics/Grundriss/eingang_aktiv_1.png";
import i4 from "../../assets/pics/Grundriss/eingang_aktiv_2.png";
import i5 from "../../assets/pics/Grundriss/rettungseinrichtung_aktiv1.png";
import i6 from "../../assets/pics/Grundriss/rettungseinrichtung_aktiv2.png";
import i7 from "../../assets/pics/Grundriss/chemikalien_aktiv.png";
import i8 from "../../assets/pics/Grundriss/druckgasflaschenschrank_aktiv.png";
import i9 from "../../assets/pics/Grundriss/apparaturen_aktiv.png";
import i10 from "../../assets/pics/Grundriss/mitarbeiter_aktiv.png";
import i11 from "../../assets/pics/Grundriss/waschbecken.png";
import i12 from "../../assets/pics/Grundriss/arbeitsplatz_aktiv.png";
import i13 from "../../assets/pics/Grundriss/bioSicherheitswerkbank_aktiv.png";
import i14 from "../../assets/pics/Grundriss/sterilisationsautoklav_aktiv.png";

function Grundriss(props) {
  const [tocState, setTocState] = useContext(TocContext);
  const [tocPages] = useContext(PagesContext);
  const [activeSection, setActiveSection] = useState(-2);
  const instructions = [
    "Klicken Sie auf einzelne Bereiche im Grundriss oder auf die Begriffe, um in die jeweilige Ansicht zu gelangen!",
    "Hier gelangen Sie in das Büro des Labors.",
    "Eingangsbereich chemisches Labor",
    "Rettungseinrichtungen",
    "Chemikalienschrank",
    "Gasflaschenschrank",
    "Apparaturen",
    "Mitarbeiter",
    "Zugang biotechnologisches Labor",
    "Waschbecken und Garderobe",
    "Arbeitsplatz",
    "Mikrobiologische Sicherheitswerkbank",
    "Sterilisationsauklav"
  ];
  const [currentInstruction, setCurrentInstruction] = useState(instructions[0]);
  const toggleHover = e => {
    // look at current Element id, split string and take last element as Integer
    let permanentActiveMenu = e.currentTarget.id.split("-")[1];
    let instructionIndex = parseInt(permanentActiveMenu) + 1;
    // setActiveMenu Index to this number to highlight it in Toc Component
    setTocState(actualPage => ({
      ...actualPage,
      activeMenu: parseInt(permanentActiveMenu)
    }));
    setActiveSection(parseInt(permanentActiveMenu));
  };

  const toggleHoverBack = () => {
    // after hover disable activeElement of Toc Component ( it starts with -1)
    setTocState(actualPage => ({
      ...actualPage,
      activeMenu: -1
    }));
    setActiveSection(-1);
  };

  // redirect to choosen exercises
  const goToSection = e => {
    // look at current Element id, split string and take last element as Integer
    let permanentActiveMenu = e.currentTarget.id.split("-")[1];
    setTocState(actualPage => ({
      ...actualPage,
      activeMenu: parseInt(permanentActiveMenu)
    }));
    // look in tocPages array, node with the same index as right now is hovered and push it in browser history to redirect
    props.history.push(
      `/virtueles_labor/${tocPages[tocState.activeMenu].filename}`
    );
  };

  // this is an observable, that waiting on tocActiveMenu index to be changed, each change sets current instruction text
  useEffect(() => {
    if (tocState.activeMenu >= 0) {
      setCurrentInstruction(instructions[parseInt(tocState.activeMenu) + 1]);
    } else {
      setCurrentInstruction(instructions[0]);
    }
    return () => {
      setCurrentInstruction(instructions[0]);
    };
  }, [tocState.activeMenu]);

  return (
    <Grid className="fullHeight" padded style={{ position: "relative" }}>
      <Grid.Row columns="2">
        <Grid.Column
          width="11"
          style={{
            backgroundImage: `url('${i1}')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "40px center",
            marginLeft: "0",
            position: "realtive"
          }}
        >
          <div
            id="obj-0"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHoverBack}
            onClick={goToSection}
            className="pointer"
            style={{
              position: "absolute",
              top: "219px",
              left: "371px",
              width: "83px",
              height: "112px"
            }}
          >
            {tocState.activeMenu === 0 && <Image src={i2} />}
          </div>

          <div
            id="obj-1"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHoverBack}
            onClick={goToSection}
            className="pointer"
            style={{
              position: "absolute",
              top: "435px",
              left: "160px",
              width: "49px",
              height: "46px"
            }}
          >
            {tocState.activeMenu === 1 && <Image src={i3} />}
          </div>
          <div
            id="obj-1"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHoverBack}
            onClick={goToSection}
            className="pointer"
            style={{
              position: "absolute",
              top: "370px",
              left: "193px",
              width: "82px",
              height: "111px"
            }}
          >
            {tocState.activeMenu === 1 && <Image src={i4} />}
          </div>
          <div
            id="obj-2"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHoverBack}
            onClick={goToSection}
            className="pointer"
            style={{
              position: "absolute",
              top: "381px",
              left: "156px",
              width: "9px",
              height: "9px"
            }}
          >
            {tocState.activeMenu === 2 && <Image src={i5} />}
          </div>
          <div
            id="obj-2"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHoverBack}
            onClick={goToSection}
            className="pointer"
            style={{
              position: "absolute",
              top: "354px",
              left: "47px",
              width: "11px",
              height: "26px"
            }}
          >
            {tocState.activeMenu === 2 && <Image src={i6} />}
          </div>
          <div
            id="obj-3"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHoverBack}
            onClick={goToSection}
            className="pointer"
            style={{
              position: "absolute",
              top: "396px",
              left: "48px",
              width: "109px",
              height: "33px"
            }}
          >
            {tocState.activeMenu === 3 && <Image src={i7} />}
          </div>
          <div
            id="obj-4"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHoverBack}
            onClick={goToSection}
            className="pointer"
            style={{
              position: "absolute",
              top: "347px",
              left: "281px",
              width: "30px",
              height: "53px"
            }}
          >
            {tocState.activeMenu === 4 && <Image src={i8} />}
          </div>
          <div
            id="obj-5"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHoverBack}
            onClick={goToSection}
            className="pointer"
            style={{
              position: "absolute",
              top: "140px",
              left: "47px",
              width: "34px",
              height: "197px"
            }}
          >
            {tocState.activeMenu === 5 && <Image src={i9} />}
          </div>
          <div
            id="obj-6"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHoverBack}
            onClick={goToSection}
            className="pointer"
            style={{
              position: "absolute",
              top: "177px",
              left: "152px",
              width: "55px",
              height: "147px"
            }}
          >
            {tocState.activeMenu === 6 && <Image src={i10} />}
          </div>
          <div
            id="obj-7"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHoverBack}
            onClick={goToSection}
            className="pointer"
            style={{
              position: "absolute",
              top: "435px",
              left: "407px",
              width: "49px",
              height: "46px"
            }}
          >
            {tocState.activeMenu === 7 && <Image src={i3} />}
          </div>
          <div
            id="obj-8"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHoverBack}
            onClick={goToSection}
            className="pointer"
            style={{
              position: "absolute",
              top: "406px",
              left: "325px",
              width: "69px",
              height: "22px"
            }}
          >
            {tocState.activeMenu === 8 && <Image src={i11} />}
          </div>
          <div
            id="obj-9"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHoverBack}
            onClick={goToSection}
            className="pointer"
            style={{
              position: "absolute",
              top: "130px",
              left: "498px",
              width: "118px",
              height: "31px"
            }}
          >
            {tocState.activeMenu === 9 && <Image src={i12} />}
          </div>
          <div
            id="obj-10"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHoverBack}
            onClick={goToSection}
            className="pointer"
            style={{
              position: "absolute",
              top: "180px",
              left: "643px",
              width: "36px",
              height: "60px"
            }}
          >
            {tocState.activeMenu === 10 && <Image src={i13} />}
          </div>
          <div
            id="obj-11"
            onMouseEnter={toggleHover}
            onMouseLeave={toggleHoverBack}
            onClick={goToSection}
            className="pointer"
            style={{
              position: "absolute",
              top: "316px",
              left: "568px",
              width: "58px",
              height: "38px"
            }}
          >
            {tocState.activeMenu === 11 && <Image src={i14} />}
          </div>
        </Grid.Column>
        <Grid.Column width="5" verticalAlign="middle">
          <Grid>
            <Grid.Row>
              <div style={{ margin: "0 auto" }}>
                <Toc />
              </div>
            </Grid.Row>
          </Grid>
        </Grid.Column>
      </Grid.Row>
      <div
        className="instructionsField"
        style={{ position: "absolute", left: "0", bottom: "0", width: "100%" }}
      >
        {currentInstruction}
      </div>
    </Grid>
  );
}

export default withRouter(Grundriss);
