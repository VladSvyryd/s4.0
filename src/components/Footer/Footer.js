import React from "react";
import "./footer.css";
import { withRouter, NavLink } from "react-router-dom";
import { Label, Icon } from "semantic-ui-react";

// Footer

// Deals with "<->  <<-->>"" buttons, Menu, MainMenu, Notes, Search
// uses tocState, tocPages, wState global states to : update state of Toc, active page, state of Notes and Search, Back function

const Footer = props => {
  const handleBackInHistory = () => {
    props.history.goBack();
  };
  return (
    <div className="footer">
      <div className="left_footer">
        <progress></progress>
      </div>
      <div className="right_footer">
        <div className="footer_buttons">
          <Label
            as={NavLink}
            to="/virtueles_labor/checklist"
            activeStyle={{ color: "red" }}
            image
            style={{ backgroundColor: "transparent", color: "white" }}
          >
            <Icon name="list alternate outline" size="large" />
            Checklist
          </Label>
          <span className="divider"></span>
          <Label
            as={NavLink}
            activeStyle={{ color: "red" }}
            to="/virtueles_labor/grundriss"
            style={{ backgroundColor: "transparent", color: "white" }}
            image
          >
            <Icon name="briefcase" size="large" />
            Grundriss/Inhalt
          </Label>
          <span className="divider"></span>
          <Label
            as="button"
            onClick={handleBackInHistory}
            style={{ backgroundColor: "transparent", color: "white" }}
            image
          >
            <Icon name="undo" size="large" />
            Zurück
          </Label>
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
