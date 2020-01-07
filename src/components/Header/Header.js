import React, { useState, useContext, useEffect } from "react";
import "./header.css";
import { Image } from "semantic-ui-react";
import { TocContext } from "../../util/TocProvider";
import { PagesContext } from "../../util/PagesProvider";
import i1 from "../../assets/pics/bgrci.png";

const Header = props => {
  const [tocState] = useContext(TocContext);
  const [tocPages] = useContext(PagesContext);
  const [title, setTitle] = useState("Intro");
  const pathname = props.location.pathname;
  const path =
    pathname === "/"
      ? "/"
      : pathname
          .split("/")
          .slice(-1)
          .pop();
  useEffect(() => {
    switch (path) {
      case "grundriss":
        setTitle("Grundriss");

        break;
      case "checklist":
        setTitle("Checklist");
        break;
      default:
        setTitle(
          (tocPages[tocState.activeMenu] &&
            tocPages[tocState.activeMenu].titel) ||
            "Intro"
        );
        break;
    }
    console.log("now");
  }, [props.location.pathname]);
  return (
    <div className="main_header">
      <div className="left_side">
        <Image src={i1} height="36" />
      </div>
      <div className="right_side">
        <h1>Virtuelles Labor - {title}</h1>
      </div>
    </div>
  );
};
export default Header;
