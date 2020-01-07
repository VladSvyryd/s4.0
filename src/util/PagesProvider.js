import React, { useState, createContext, useEffect } from "react";
import pagesA from "../components/Body/Toc/seitenliste_kapa";

// PageProvider/PageContext

// Renders JSON files with pages to use in TOC
// Input "pagesA" | Output "tocPages" - array of pages with structure for Accordion in (TOC)
export const PagesContext = createContext();

export const PagesProvider = props => {
  // get pages from MainMenu Component after click on one of Topic
  // Input chapter(INT), Output pages(JSON)
  // set global state as tocPages array
  const [tocPages, setPages] = useState(
    JSON.parse(localStorage.getItem("pagesList")) || mutateTocPages()
  );

  function mutateTocPages(pages = pagesA) {
    let arr = pages;
    arr.forEach(e => {
      if (e.pages) {
        e.done = false;
        mutateTocPages(e.pages);
      } else {
        e.done = false;
      }
    });
    // important to save mutated array back to local storage
    localStorage.setItem("pagesList", JSON.stringify(arr));
    return arr;
  }

  useEffect(() => {
    localStorage.setItem("pagesList", JSON.stringify(tocPages));
  }, [tocPages]);
  return (
    <PagesContext.Provider value={[tocPages, setPages]}>
      {props.children}
    </PagesContext.Provider>
  );
};
