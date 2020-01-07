import React, { useContext, useEffect, useState } from "react";

import Header from "../../components/Header/Header";
import Body from "../../components/Body/Body";
import Footer from "../../components/Footer/Footer";
import { TocProvider } from "../../util/TocProvider";
import { PagesProvider } from "../../util/PagesProvider";
import "./shell.css";

// Shell
// use: functional Frame (Header, Body, Footer)
// functions : Reset Chapter in sessionStorage to null, so reset pragramm state
// props - is a global variable that comes from App Component, and is being sent to PageProvider to use current Chapter Value (1,2,3,4)
// TocProvider uses this props value to listen to it's changes to rerender Accordion Menu with its active accordions
// PagesProvider uses props for parsing right set of pages
// Body uses props to send them further to TOC and NOTES windows

const Shell = props => {
  return (
    <div className="shell">
      <PagesProvider {...props}>
        <TocProvider {...props}>
          <Header {...props} />
          <Body {...props} />
          <Footer />
        </TocProvider>
      </PagesProvider>
    </div>
  );
};
export default Shell;
