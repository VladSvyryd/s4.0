import React, { useContext, useState } from "react";
import { Accordion } from "semantic-ui-react";
import { Menu } from "semantic-ui-react";
import { NavLink as Link, NavLink } from "react-router-dom";
import "./toc.css";
import "rc-menu/assets/index.css";
import { withRouter } from "react-router-dom";
import { TocContext } from "../../../util/TocProvider";
import { PagesContext } from "../../../util/PagesProvider";
import { Icon, Label } from "semantic-ui-react";

// TOC
// Toc recieves props from App->Shell->Body-> Toc and uses it ({match}) to set global links as NavLink bzw. Nodes and ContentLinks
// Accordion Menu, contains Links, has functions to open Accordions and click events to redirect to needed url
// each interaction in Toc contains update tocState

const Toc = props => {
  const [tocState, setTocState] = useContext(TocContext);
  const [tocPages] = useContext(PagesContext);
  // current global path, depending from current Chapter
  let { match } = props;

  function createTitle(cursor, index) {
    return (
      <Menu.Item
        index={index}
        active={tocState.activeMenu === index}
        onClick={handleItemClick}
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto",
          justifyContent: "left",
          gridColumnGap: "10px"
        }}
      >
        <div>{index + 1} </div>
        <div>{cursor.node && cursor.node.titel}</div>
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
  function setMenuLink(tocPages, createTitle) {}
  // this object will be returned to Body.js body
  return (
    <Menu vertical>
      <Menu.Item>
        <Menu.Header>Chemisches Labor</Menu.Header>
        <Menu.Menu>
          {tocPages.map((cursor, i) => {
            return i <= 4 ? (
              <div key={"holder_" + i} className="node">
                {createTitle(cursor, i)}
              </div>
            ) : null;
          })}
        </Menu.Menu>
      </Menu.Item>
      <Menu.Item>
        <Menu.Header>Biotechnologisches Labor</Menu.Header>

        <Menu.Menu>
          {tocPages.map((node, i) => {
            return i >= 5 ? (
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
