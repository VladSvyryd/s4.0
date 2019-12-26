import React, { useContext } from "react";
import "./footer.css";
import { withRouter, NavLink, Link } from "react-router-dom";
import { Label, Icon } from "semantic-ui-react";
import { Progress } from 'semantic-ui-react'
import { TocContext } from "../../util/TocProvider";
// Footer

// Deals with "<->  <<-->>"" buttons, Menu, MainMenu, Notes, Search
// uses tocState, tocPages, wState global states to : update state of Toc, active page, state of Notes and Search, Back function

const Footer = props => {
  // state to go through active page
  const [tocState, setTocState] = useContext(TocContext);
  // TODO: has to be changed
  const handleBackInHistory = () => {
    if (
      !(props.location.pathname === "/virtueles_labor/grundriss") &&
      !(props.location.pathname === "/virtueles_labor/checklist")
    )
      props.history.goBack();
  };
  const button_style = {
    color: "white",
    backgroundColor: "transparent"
  };
  const active_style = {
    color: "#ffc21b"
  };
  const getPercentFromTotal = () => {
    return Math.round(tocState.exercisesState.doneCount / tocState.exercisesState.totalExercisesCount * 100)

  }
  return (
    <div className="footer">
      <div className="left_footer">

        <span style={{ fontSize: "11px", paddingBottom: "5px" }}> {tocState.exercisesState.doneCount} von {tocState.exercisesState.totalExercisesCount} Mängeln gefunden </span>
        {/* <Progress percent={getPercentFromTotal()} size="tiny" style={{ width: "70%", margin: 0 }} color="blue" /> */}
        <progress value={`${getPercentFromTotal()}`} max="100" style={{ width: "70%", margin: 0 }} ></progress>

      </div>
      <div className="right_footer">
        <div className="footer_buttons">
          <NavLink
            to="/virtueles_labor/checklist"
            activeStyle={active_style}
            style={button_style}
            className="grid twoColumn alignCenter padded gap10"
          >
            <Icon name="list alternate outline" size="large" />
            Checklist
          </NavLink>
          <span className="divider"></span>
          <NavLink
            activeStyle={active_style}
            to="/virtueles_labor/grundriss"
            className="grid twoColumn alignCenter padded gap10"
            style={button_style}
          >
            <Icon name="briefcase" size="large" />
            <span> Grundriss/Inhalt</span>
          </NavLink>
          <span className="divider"></span>
          <div
            as="button"
            onClick={handleBackInHistory}
            style={button_style}
            className="grid twoColumn alignCenter padded gap10 pointer"
          >
            <Icon name="undo" size="large" />
            Zurück
          </div>
        </div>
        <Label
          as={NavLink}
          to="/home"
          style={{
            backgroundColor: "transparent",
            marginLeft: "auto",
            color: "white"
          }}
        >
          Home
        </Label>
      </div>
    </div>
  );
};

export default withRouter(Footer);
