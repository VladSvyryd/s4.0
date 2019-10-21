import React, { useState, createContext } from "react";
import pagesA from "../components/Body/Toc/seitenliste_kapa";

// PageProvider/PageContext

// Renders JSON files with pages to use in TOC
// Input "pagesA" | Output "tocPages" - array of pages with structure for Accordion in (TOC)
export const PagesContext = createContext();

export const PagesProvider = props => {
  // get pages from MainMenu Component after click on one of Topic
  // Input chapter(INT), Output pages(JSON)
  // set global state as tocPages array
  const [tocPages, setPages] = useState(parseNodesNewWay());

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

  return (
    <PagesContext.Provider value={[tocPages, setPages]}>
      {props.children}
    </PagesContext.Provider>
  );
};
