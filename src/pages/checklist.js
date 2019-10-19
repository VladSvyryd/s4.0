import React, { useContext } from "react";
import { Grid, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Toc from "../components/Body/Toc/Toc";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/notizblock_leer.png";

function Checklist(props) {
  const [tocState, setTocState] = useContext(TocContext);
  const [tocPages] = useContext(PagesContext);
  const handlePrevMenu = () => {
    if (tocState.activeMenu > -1)
      setTocState(actualPage => ({
        ...actualPage,
        activeMenu: actualPage.activeMenu - 1
      }));
  };
  const handleNextMenu = () => {
    if (tocState.activeMenu < tocPages.length - 1)
      setTocState(actualPage => ({
        ...actualPage,
        activeMenu: actualPage.activeMenu + 1
      }));
  };
  function menuLinks() {
    return tocPages.map((page, i) => {
      return page.firstLayer;
    });
  }

  function parseLinks(menuIndex) {
    //console.log(menuLinks()[menuIndex]);
    return (
      menuLinks()[menuIndex] &&
      menuLinks()[menuIndex].map((section, i) => {
        return !section.secondPages ? (
          <Link
            to={`/virtueles_labor/${tocPages[menuIndex].node.filename}`}
            key={"linkSection" + i}
          >
            {i <= 0 && <h5>{tocPages[menuIndex].node.titel}</h5>}
            <div className="gridList">
              <div>{"-"} </div>
              <div>{section.secondLayer.titel}</div>
            </div>
          </Link>
        ) : (
          <Link
            key={"linkSection" + i}
            to={`/virtueles_labor/${section.secondLayer.filename}`}
          >
            <h5>{section.secondLayer.titel}</h5>{" "}
            {section.secondPages.map((p, i) => {
              return (
                <div key={"linkList" + i} className="gridList">
                  <div>{"-"} </div>
                  {p.titel}
                </div>
              );
            })}
          </Link>
        );
      })
    );
  }
  return (
    <Grid className="fullHeight" padded>
      <Grid.Row columns="2">
        <Grid.Column
          width="11"
          style={{
            backgroundImage: `url('${i1}')`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left 26px",
            marginLeft: "0"
          }}
        >
          <Grid columns="2" className="fullHeight">
            <Grid.Column verticalAlign="bottom" width="7">
              {tocState.activeMenu > -1 ? (
                <button
                  style={{ margin: "0 0 50px 5px" }}
                  onClick={handlePrevMenu}
                >
                  <Icon name="arrow left" color="black" size="large" />
                </button>
              ) : null}
            </Grid.Column>
            <Grid.Column style={{ display: "flex" }} width="9">
              <div style={{ display: "block", alignSelf: "center" }}>
                {tocState.activeMenu < 0 && (
                  <div>
                    <h1 style={{ textAlign: "center" }}>Checkliste</h1>
                    <p>
                      Die Checkliste bietet Ihnen eine Übersicht über alle
                      Mängel in den Laborbereichen und den aktuellen
                      Bearbeitungsstand:
                    </p>
                    <p>
                      Aufgaben, die Sie bereits richtig gelöst haben, sind mit
                      einem Häkchen markiert. Mit einem Mausklick auf einen
                      Eintrag in der Liste gelangen Sie direkt zu der jeweiligen
                      Laborsituation mit den einzelnen Aufgabenstellungen.
                    </p>
                  </div>
                )}
                {console.log(menuLinks())}
                {parseLinks(tocState.activeMenu)}
              </div>

              {tocState.activeMenu < tocPages.length - 1 ? (
                <button
                  onClick={handleNextMenu}
                  style={{
                    alignSelf: "flex-end",
                    margin: "0px 100px 50px auto"
                  }}
                >
                  <Icon name="arrow right" size="large" />
                </button>
              ) : null}
            </Grid.Column>
          </Grid>
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
    </Grid>
  );
}

export default Checklist;
