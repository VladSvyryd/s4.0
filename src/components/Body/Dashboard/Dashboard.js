import React from "react";
import "rc-menu/assets/index.css";
import { Route, Switch } from "react-router-dom";
import grundriss from "../../../pages/grundriss";
import checklist from "../../../pages/checklist";
import buero from "../../../pages/buero";

// Dashboard
// Placeholder for all internal links used in Programm
// maps all url that can be loaded into Dashboard component

const Dashboard = props => {
  return (
    <Switch>
      <Route path="/virtueles_labor/grundriss" exact component={grundriss} />
      <Route path="/virtueles_labor/checklist" exact component={checklist} />
      <Route path="/virtueles_labor/buero" exact component={buero} />
    </Switch>
  );
};

export default Dashboard;
