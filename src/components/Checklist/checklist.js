import React, { useContext } from "react";
import { Grid, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Toc from "../Body/Toc/Toc";
import { TocContext } from "../../util/TocProvider";
import { PagesContext } from "../../util/PagesProvider";
import i1 from "../../assets/pics/notizblock_leer.png";
import c1 from "../../assets/pics/haken1.png";
import c2 from "../../assets/pics/haken2.png";
import c3 from "../../assets/pics/haken3.png";
import c4 from "../../assets/pics/haken4.png";
import c5 from "../../assets/pics/haken5.png";
import c6 from "../../assets/pics/haken6.png";
import "./ckecklist.css";

function Checklist(props) {
  const [tocState, setTocState] = useContext(TocContext);
  const [tocPages] = useContext(PagesContext);
  const haken = [c1, c2, c3, c4, c5, c6];
  // go back in Toc Menu = set new tocState
  const handlePrevMenu = () => {
    if (tocState.activeMenu > -1)
      setTocState(actualPage => ({
        ...actualPage,
        activeMenu: actualPage.activeMenu - 1
      }));
  };
  // go forward in Toc Menu = set new tocState
  const handleNextMenu = () => {
    if (tocState.activeMenu < tocPages.length - 1)
      setTocState(actualPage => ({
        ...actualPage,
        activeMenu: actualPage.activeMenu + 1
      }));
  };
  // set Links of Toc List
  function menuLinks() {
    return tocPages.map((page, i) => {
      return page.pages;
    });
  }
  // set Checklist Section in kind of List of nodes
  function parseLinks(menuIndex) {
    //console.log(menuLinks()[menuIndex]);
    return (
      menuLinks()[menuIndex] &&
      menuLinks()[menuIndex].map((section, i) => {
        // if node has children nodes(width Link to each of them) than create childnodes with it's pages
        return !section.pages ? (
          <Link
            to={`/virtuelles_labor/${tocPages[menuIndex].filename}`}
            key={"linkSection" + i}
          >
            {i <= 0 && (
              <div className="my_title">{tocPages[menuIndex].titel}</div>
            )}
            <div className="gridList three">
              <div className="evaluation">
                <Image
                  src={haken[Math.floor(Math.random() * haken.length)]}
                  hidden={!section.done}
                />
              </div>
              <div>{"-"} </div>
              <div>{section.titel}</div>
            </div>
          </Link>
        ) : (
          // if node has only pages(solid), create node(one link refer to node) with pages
          <Link
            key={"linkSection" + i}
            to={`/virtuelles_labor/${tocPages[menuIndex].filename}`}
            className="my_node_section"
          >
            <div className="my_title">{section.titel}</div>{" "}
            {section.pages.map((p, i) => {
              return (
                <div key={"linkList" + i} className="gridList three">
                  <div className="evaluation">
                    <Image
                      src={haken[Math.floor(Math.random() * haken.length)]}
                      hidden={!p.done}
                    />
                  </div>
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
            marginLeft: "0",
            maxWidth: "702px"
          }}
        >
          <Grid columns="2" className="fullHeight">
            <Grid.Column verticalAlign="bottom" width="6">
              {tocState.activeMenu > -1 ? (
                <button
                  style={{ margin: "0 0 50px 5px" }}
                  onClick={handlePrevMenu}
                >
                  <Icon name="arrow left" color="black" size="large" />
                </button>
              ) : null}
            </Grid.Column>
            <Grid.Column
              width="9"
              style={{
                position: "relative",
                display: "flex"
              }}
            >
              <div
                style={{
                  display: "block",
                  alignSelf: "center",
                  paddingLeft: "20px",
                  width: "300px",
                  margin: "auto 0",
                  color: "rgb(0,0,0)"
                }}
                className="my_node font_handschrift"
              >
                {tocState.activeMenu < 0 && (
                  <>
                    <div
                      className="font_handschrift"
                      style={{
                        textAlign: "center",
                        fontSize: "50px",
                        fontWeight: "bold"
                      }}
                    >
                      Checkliste
                    </div>
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
                  </>
                )}
                {parseLinks(tocState.activeMenu)}
              </div>

              {tocState.activeMenu < tocPages.length - 1 ? (
                <button
                  onClick={handleNextMenu}
                  style={{
                    position: "absolute",
                    right: "65px",
                    bottom: "65px"
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
