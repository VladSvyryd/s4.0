import React from "react";
import "./footer.css";
import { withRouter, NavLink, Link } from "react-router-dom";
import { Label, Icon } from "semantic-ui-react";

// Footer

// Deals with "<->  <<-->>"" buttons, Menu, MainMenu, Notes, Search
// uses tocState, tocPages, wState global states to : update state of Toc, active page, state of Notes and Search, Back function

const Footer = props => {
  const handleBackInHistory = () => {
    props.history.goBack();
  };
  const button_style = {
    color: "white",
    backgroundColor: "transparent"
  };
  const active_style = {
    color: "#ffc21b"
  };
  return (
    <div className="footer">
      <div className="left_footer">
        <progress></progress>
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
