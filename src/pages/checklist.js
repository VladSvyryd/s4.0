import React, { useContext } from "react";
import { Button, Image, Grid, Icon } from "semantic-ui-react";
import Toc from "../components/Body/Toc/Toc";
import { TocContext } from "../util/TocProvider";
import { PagesContext } from "../util/PagesProvider";
import i1 from "../assets/pics/notizblock_leer.png";

function Checklist(props) {
  const [tocState, setTocState] = useContext(TocContext);
  const [tocPages] = useContext(PagesContext);
  const handlePrevMenu = () => {
    let newIndex = tocState.activeAccordionIndex + 1;
    let nextChapterFirstPageString;
    let currentPage;
    if (
      tocPages[newIndex] &&
      newIndex <= tocPages.length &&
      tocPages[newIndex].content
    ) {
      nextChapterFirstPageString = tocPages[newIndex].content[0].filename;
      currentPage = tocPages[newIndex].content[0];
    } else if (
      tocPages[newIndex] &&
      newIndex <= tocPages.length &&
      tocPages[newIndex].filename
    ) {
      nextChapterFirstPageString = tocPages[newIndex].filename;
      currentPage = tocPages[newIndex];
    } else {
      newIndex = tocState.activeAccordionIndex;
      nextChapterFirstPageString = tocState.activePageLink;
    }
    setTocState(actualPage => ({
      ...actualPage,
      activePageLink: nextChapterFirstPageString,
      activeAccordionIndex: newIndex,
      currentPage: currentPage || actualPage.currentPage
    }));
    //props.match.url is the main path of this Kapitel
    console.log(props.match.url + "/" + nextChapterFirstPageString);
  };
  const handleNextMenu = (start_with_first = true) => {
    let newIndex = tocState.activeAccordionIndex - 1;
    if (newIndex >= 0) {
      let previousChapterFirstPageString;
      let currentPage;
      if (start_with_first && tocPages[newIndex].content) {
        previousChapterFirstPageString = tocPages[newIndex].content[0].filename;
        currentPage = tocPages[newIndex].content[0];
      } else if (!start_with_first && tocPages[newIndex].content) {
        previousChapterFirstPageString =
          tocPages[newIndex].content[tocPages[newIndex].content.length - 1]
            .filename;
        currentPage =
          tocPages[newIndex].content[tocPages[newIndex].content.length - 1];
      } else if (tocPages[newIndex].filename) {
        previousChapterFirstPageString = tocPages[newIndex].filename;
        currentPage = tocPages[newIndex];
      }
      setTocState(actualPage => ({
        ...actualPage,
        activePageLink: previousChapterFirstPageString,
        activeAccordionIndex: newIndex,
        currentPage: currentPage
      }));
      //props.match.url is the main path of this Kapitel
      props.history.push(
        props.match.url + "/" + previousChapterFirstPageString
      );
    }
  };
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
            <Grid.Column verticalAlign="bottom">
              <button
                style={{ margin: "0 0 50px 5px" }}
                onClick={handlePrevMenu}
              >
                <Icon name="arrow left" color="black" size="large" />
              </button>
            </Grid.Column>
            <Grid.Column style={{ display: "flex" }}>
              <div style={{ alignSelf: "center" }}>
                <h2>alwdhahwd</h2>
                <ul>
                  <li>awd</li>
                  <li>awd</li>
                  <li>ad</li>
                </ul>
              </div>
              <button
                onClick={handleNextMenu}
                style={{ alignSelf: "flex-end", margin: "0px 100px 50px auto" }}
              >
                <Icon name="arrow right" size="large" />
              </button>
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
