import React, { useState, createContext, useEffect } from "react";
import pagesA from "../components/Body/Toc/seitenliste_kapa";
import pagesB from "../components/Body/Toc/seitenliste_kapb";
import pagesC from "../components/Body/Toc/seitenliste_kapc";
import pagesD from "../components/Body/Toc/seitenliste_kapd";

// PageProvider/PageContext

// Renders JSON files with pages to use in TOC
// Input "Chapter" | Output "tocPages" - array of pages with structure for Accordion in (TOC)

export const PagesContext = createContext();
const TOPICS = {
  Grundlagen: 1,
  Fuegen: 2,
  Energieuebertragung: 3,
  Schützen_und_Tragen: 4
};
export const PagesProvider = props => {
  // get pages from MainMenu Component after click on one of Topic
  // Input chapter(INT), Output pages(JSON)
  let pages = pickUpCurrentChapter(props.path);
  // set global state as tocPages array
  const [tocPages, setPages] = useState(parseNodesNewWay());

  function pickUpCurrentChapter(number) {
    let currentPages;
    switch (number) {
      case TOPICS.Grundlagen:
        currentPages = pagesA;
        break;
      case TOPICS.Fuegen:
        currentPages = pagesB;
        break;
      case TOPICS.Energieuebertragung:
        currentPages = pagesC;
        break;
      case TOPICS.Schützen_und_Tragen:
        currentPages = pagesD;
        break;
      default:
        break;
    }
    return currentPages;
  }

  // restructure JSON and crate nodes as needed by Semantic UI React (Accordion Component)
  function parseNodes(currentPages) {
    const rootList = [];
    currentPages &&
      currentPages.forEach((page, i) => {
        if (page.type === 0) {
          let links;
          if (page.pages) {
            links = parseLinks(page.pages);
          }
          rootList.push({
            key: "panel_" + i,
            title: page.titel,
            verweis_titel: page.verweis_titel,
            content: links,
            kuerzel: page.kuerzel,
            id: page.id,
            chapter: page.kapitel
          });
        } else {
          rootList.push({
            key: "panel_" + i,
            title: page.titel,
            verweis_titel: page.verweis_titel,
            filename: page.filename,
            kuerzel: page.kuerzel,
            id: page.id,
            chapter: page.kapitel
          });
        }
      });
    return rootList;
  }

  function getPagesFromNode(nodes) {
    return !nodes.pages
      ? { thirdPages: nodes }
      : nodes.pages.map(node => ({
          secondLayer: node,
          secondPages: node.pages || false
        }));
  }

  function parseNodesNewWay(pages = pagesA) {
    return pages.map(
      (cursor, i) =>
        cursor.pages && { node: cursor, firstLayer: getPagesFromNode(cursor) }
    );
  }
  function parseLinks(p) {
    return p.map(page => page);
  }
  /*useEffect(() => {
    setPages(parseNodesNewWay());
  }, [props.path])*/
  return (
    <PagesContext.Provider value={[tocPages, setPages]}>
      {props.children}
    </PagesContext.Provider>
  );
};
