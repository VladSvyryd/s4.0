import React, { useContext } from "react";
import { Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import "./toc.css";
import { withRouter } from "react-router-dom";
import { TocContext } from "../../../util/TocProvider";
import { PagesContext } from "../../../util/PagesProvider";

// TOC
// Toc recieves props from App->Shell->Body-> Toc and uses it ({match}) to set global links as NavLink bzw. Nodes and ContentLinks
// Accordion Menu, contains Links, has functions to open Accordions and click events to redirect to needed url
// each interaction in Toc contains update tocState

const Toc = props => {
  const [tocState, setTocState] = useContext(TocContext);
  const [tocPages] = useContext(PagesContext);

  // change active Menu by mouse hover
  const handleHover = index => {
    setTocState(actualPage => ({
      ...actualPage,
      activeMenu: index
    }));
  };
  // change back active Menu by mouse hover to -1
  function handleHoverOff() {
    setTocState(actualPage => ({
      ...actualPage,
      activeMenu: -1
    }));
  }

  // create Menu Links depending on Path
  function createTitle(cursor, index) {
    const pathname = props.location.pathname;
    const path =
      pathname === "/"
        ? "/"
        : pathname
            .split("/")
            .slice(-1)
            .pop();

    return path !== "grundriss" ? (
      <Menu.Item
        index={index}
        active={tocState.activeMenu === index}
        onClick={handleItemClick}
        className="my_menu_item"
      >
        <div>{index + 1} </div>
        <div>{cursor && cursor.titel}</div>
      </Menu.Item>
    ) : (
      <Menu.Item
        index={index}
        active={tocState.activeMenu === index}
        as={NavLink}
        to={`/virtuelles_labor/${tocPages[index].filename}`}
        onMouseEnter={() => handleHover(index)}
        onMouseLeave={() => handleHoverOff()}
        className="my_menu_item"
      >
        <div>{index + 1} </div>
        <div>{cursor && cursor.titel}</div>
      </Menu.Item>
    );
  }

  const handleItemClick = (e, itemProps) => {
    // update TOC State
    setTocState(actualPage => ({
      ...actualPage,
      activeMenu: itemProps.index
    }));
  };

  return (
    <Menu vertical className="toc">
      <Menu.Item>
        <Menu.Header>Chemisches Labor</Menu.Header>
        <Menu.Menu className="toc">
          {tocPages.map((cursor, i) => {
            return i <= 6 ? (
              <div key={"holder_" + i} className="node">
                {createTitle(cursor, i)}
              </div>
            ) : null;
          })}
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item>
        <Menu.Header>Biotechnologisches Labor</Menu.Header>

        <Menu.Menu className="toc">
          {tocPages.map((node, i) => {
            return i >= 7 ? (
              <div key={"holder_" + i} className="node">
                {createTitle(node, i)}
              </div>
            ) : null;
          })}
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  );
};
export default withRouter(Toc);
