import React from "react";
import "rc-menu/assets/index.css";
import { Route, Switch } from "react-router-dom";
import AuthRoute from "../../AuthRoute/AuthRoute";
import uebersicht from "../../../pages/impressum";

// Dashboard
// Placeholder for all internal links used in Programm
// maps all url that can be loaded into Dashboard component

const Dashboard = props => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Switch>
        <AuthRoute path="/impressum" exact component={uebersicht} />
      </Switch>
    </div>
  );
};

export default Dashboard;
