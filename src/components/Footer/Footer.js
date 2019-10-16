import React, { useContext } from "react";
import "./footer.css";
import { withRouter } from "react-router-dom";
import { TocContext } from "../../util/TocProvider";
import { PagesContext } from "../../util/PagesProvider";
import { WindowsContext } from "../../util/WindowsStatesProvider";
import { Image } from "semantic-ui-react";

// Footer

// Deals with "<->  <<-->>"" buttons, Menu, MainMenu, Notes, Search
// uses tocState, tocPages, wState global states to : update state of Toc, active page, state of Notes and Search, Back function

const Footer = props => {
  const [tocState, setTocState] = useContext(TocContext);
  const [tocPages] = useContext(PagesContext);
  const [wStates, setWStates] = useContext(WindowsContext);

  function goPageUp() {
    let chapterIndex = tocState.activeAccordionIndex;
    if (tocPages[chapterIndex].content) {
      let arrayCurrentNode = tocPages[chapterIndex].content;
      let indexInNodeList = pageIndex(
        arrayCurrentNode,
        tocState.activePageLink
      );
      let previousPageLinkIndexInCurrentNode = indexInNodeList - 1;
      if (
        previousPageLinkIndexInCurrentNode >= 0 &&
        previousPageLinkIndexInCurrentNode < arrayCurrentNode.length
      ) {
        let pageName =
          tocPages[chapterIndex].content[previousPageLinkIndexInCurrentNode]
            .filename;
        setTocState(actualPage => ({
          ...actualPage,
          activePageLink: pageName,
          activeAccordionIndex: actualPage.activeAccordionIndex,
          currentPage:
            tocPages[chapterIndex].content[previousPageLinkIndexInCurrentNode]
        }));
        //props.match.url is the main path of this Kapitel
        let previousPageString = props.match.url + "/" + pageName;
        props.history.push(previousPageString);
      } else if (previousPageLinkIndexInCurrentNode === -1) {
        goChapterUp(false);
      }
    } else {
      goChapterUp(false);
    }
  }
  // start_with_first varaible needed for logic if we are moving page to page till top of TOC : false
  function goChapterUp(start_with_first = true) {
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
  }

  function goPageDown() {
    let chapterIndex = tocState.activeAccordionIndex;
    if (tocPages[chapterIndex].content) {
      let arrayCurrentNode = tocPages[chapterIndex].content;
      let indexInNodeList = pageIndex(
        arrayCurrentNode,
        tocState.activePageLink
      );
      let nextPageLinkIndexInCurrentNode = indexInNodeList + 1;
      if (
        nextPageLinkIndexInCurrentNode >= 0 &&
        nextPageLinkIndexInCurrentNode < arrayCurrentNode.length
      ) {
        let pageName =
          tocPages[chapterIndex].content[nextPageLinkIndexInCurrentNode]
            .filename;
        setTocState(actualPage => ({
          ...actualPage,
          activePageLink: pageName,
          activeAccordionIndex: actualPage.activeAccordionIndex,
          currentPage:
            tocPages[chapterIndex].content[nextPageLinkIndexInCurrentNode]
        }));
        //props.match.url is the main path of this Kapitel
        let nextPageString = props.match.url + "/" + pageName;
        console.log(props.match.url);

        props.history.push(nextPageString);
      } else if (
        nextPageLinkIndexInCurrentNode >= 0 &&
        nextPageLinkIndexInCurrentNode <= arrayCurrentNode.length
      ) {
        goChapterDown();
      }
    } else {
      goChapterDown();
    }
  }
  function goChapterDown() {
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

    props.history.push(props.match.url + "/" + nextChapterFirstPageString);
  }

  const pageIndex = (nodePages, activePage) => {
    let index = -1;
    nodePages.map((page, i) =>
      page.filename === activePage ? (index = i) : index
    );
    return index;
  };

  const handleMenuToggle = () => {
    if (
      wStates.notes.openned &&
      wStates.notes.notMovable &&
      wStates.menu.notMovable
    )
      handleNoteToggle();
    let newposition;
    if (!wStates.menu.notMovable) newposition = wStates.menu.initPosition;
    setWStates(oldOnes => ({
      menu: {
        ...oldOnes.menu,
        position: newposition || oldOnes.menu.position,
        notMovable: true,
        openned: !oldOnes.menu.openned
      },
      notes: { ...oldOnes.notes }
    }));
  };

  const handleNoteToggle = () => {
    if (
      wStates.menu.openned &&
      wStates.menu.notMovable &&
      wStates.notes.notMovable
    )
      handleMenuToggle();
    let newposition;
    if (!wStates.notes.notMovable) newposition = wStates.notes.initPosition;
    setWStates(oldOnes => ({
      menu: { ...oldOnes.menu },
      notes: {
        ...oldOnes.notes,
        position: newposition || oldOnes.notes.position,
        notMovable: true,
        openned: !oldOnes.notes.openned
      }
    }));
  };

  const handleGoToMenu = () => {
    props.history.push("/hauptmenu");
    //if (wStates.menu.openned) handleMenuToggle()
    //if (wStates.notes.openned) handleQueryToggle()
  };
  const handleBackInHistory = () => {
    props.history.goBack();
  };
  return (
    <div className="footer">
      <div className="left_footer"></div>
      <div className="right_footer">
        <div className="functions_left">
          <button className="button-search">Suche</button>
          <button className="button-notes" onClick={handleNoteToggle}>
            Notizen
          </button>
          <button className="button-menu" onClick={handleGoToMenu}>
            Hauptmenü
          </button>
          <button className="button-toc" onClick={handleMenuToggle}>
            Inhalt
          </button>
        </div>
        <div className="functions_right">
          <button className="button-back" onClick={handleBackInHistory}>
            Zurück
          </button>
          <button className="button-prev-section" onClick={goChapterUp}>
            &#9664;&#9664;
          </button>
          <button className="button-next-section" onClick={goChapterDown}>
            &#9654;&#9654;
          </button>
          <button className="button-prev-page" onClick={goPageUp}>
            &#9664;
          </button>
          <button className="button-next-page" onClick={goPageDown}>
            &#9654;
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Footer);
