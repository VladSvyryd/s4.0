import React, { Component } from "react";
import "./header.css";
import { Image } from "semantic-ui-react";
import i1 from "../../assets/pics/bgrci.png";

export default class Header extends Component {
  render() {
    return (
      <div className="main_header">
        <div className="left_side">
          <Image src={i1} height="36" />
        </div>
        <div className="right_side">
          <h1>Virtuelles Labor - Intro</h1>
        </div>
      </div>
    );
  }
}
