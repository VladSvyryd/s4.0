import React, { useContext } from "react";
import { Accordion } from "semantic-ui-react";
import { Menu } from "semantic-ui-react";
import { NavLink as Link, NavLink } from "react-router-dom";
import "./toc.css";
import "rc-menu/assets/index.css";
import { withRouter } from "react-router-dom";
import { TocContext } from "../../../util/TocProvider";
import { PagesContext } from "../../../util/PagesProvider";
import { Icon } from "semantic-ui-react";

// TOC
// Toc recieves props from App->Shell->Body-> Toc and uses it ({match}) to set global links as NavLink bzw. Nodes and ContentLinks
// Accordion Menu, contains Links, has functions to open Accordions and click events to redirect to needed url
// each interaction in Toc contains update tocState

const Toc = props => {
  const [tocState, setTocState] = useContext(TocContext);
  const [tocPages] = useContext(PagesContext);

  // current global path, depending from current Chapter
  let { match } = props;

  // eacht TOC AccordionTitle uses this event to update it's state (activePageLink:,activeAccordionIndex:)
  const handleAccordionTitleClick = (e, itemProps) => {
    let activePageReset;
    // if AccordionTitle is a Link than take its href and make aktivePageLink in TOC STATE
    if (e.target.classList.contains("accordionAsLink")) {
      activePageReset = e.currentTarget.getAttribute("href").substr(1);
    }
    const { index } = itemProps;
    const newIndex = tocState.activeAccordionIndex === index ? 0 : index;
    // update TOC State
    setTocState(actualPage => ({
      ...actualPage,
      activePageLink: activePageReset || actualPage.activePageLink,
      activeAccordionIndex: newIndex
    }));
  };

  // update state of TOC ActivePageLink (onClick)
  const handleItemClick = (e, { name }) => {
    console.log(name);
    setTocState(actualPage => ({
      ...actualPage,
      activePageLink: name,
      activeAccordionIndex: actualPage.activeAccordionIndex,
      currentPage: setActivePage(name)
    }));
  };
  const setActivePage = name => {
    let result;
    if (tocPages[tocState.activeAccordionIndex].content) {
      tocPages[tocState.activeAccordionIndex].content.map(page => {
        if (page.filename === name) {
          result = page;
        }
      });
    } else {
      result = tocPages[0];
    }
    return result;
  };

  // build a Link Module out of pages which each nodecontains
  function parseLinks(pages) {
    return pages.map((page, i) => (
      <Menu.Item
        content={page.verweis_titel}
        name={page.filename}
        active={tocState.activePageLink === page.filename}
        onClick={handleItemClick}
        as={Link}
        to={`${match.url}/` + page.filename}
        key={page.id}
      />
    ));
  }

  // create AccordionTitle, either as active Accordion or AccordionTitle as Link  element (normal, single pages)
  function createTitle(node, index) {
    return node.content ? (
      <Accordion.Title
        active={tocState.activeAccordionIndex === index}
        key={"panel_" + index}
        index={index}
        onClick={handleAccordionTitleClick}
      >
        <Icon name="dropdown" />
        {node.verweis_titel}
      </Accordion.Title>
    ) : (
      <Accordion.Title
        active={tocState.activeAccordionIndex === index}
        key={"panel_" + index}
        index={index}
        as={NavLink}
        activeStyle={{
          fontWeight: "bold"
        }}
        activeClassName="accordionTitleIsActive"
        to={`${match.url}/` + node.filename}
        onClick={handleAccordionTitleClick}
        className="accordionAsLink"
      >
        {node.verweis_titel}
      </Accordion.Title>
    );
  }

  // create content od Accordion (in other words, pages of each Node)
  function createContent(node, index) {
    // :TODO Refactor this const
    // small hack to hide a Link into AccordionTitle which works as Link(normal page) to use it for proper TocState management
    const invisibleLink = (
      <Accordion.Content
        active={tocState.activeAccordionIndex === index}
        key={"invisible_content_" + index}
        className={tocState.activeAccordionIndex === index ? "invisible" : null}
      >
        <Menu.Item
          content={node.verweis_titel}
          name={node.filename}
          active={tocState.activePageLink === node.filename}
          onClick={handleItemClick}
          as={Link}
          to={"/" + node.filename}
          key={node.id}
        />
      </Accordion.Content>
    );

    // create a content box, if Node has no pages then create a link and hide it, needed to proper Tocstatemanagment, if there are pages, inser pages
    const acc = node.content ? (
      <Accordion.Content
        active={tocState.activeAccordionIndex === index}
        key={"content_" + index}
      >
        {parseLinks(node.content)}
      </Accordion.Content>
    ) : //invisibleLink
    null;

    return acc;
  }

  // this object will be returned to Body.js body
  return (
    <Menu>
      <Accordion exclusive>
        {tocPages.map((node, i) => {
          return (
            <div key={"holder_" + i} className="node">
              {createTitle(node, i)}
              {createContent(node, i)}
            </div>
          );
        })}
      </Accordion>
    </Menu>
  );
};
export default withRouter(Toc);
