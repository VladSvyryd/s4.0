import React from "react";
import "rc-menu/assets/index.css";
import { Route, Switch } from "react-router-dom";
import grundriss from "../../GrundRiss/grundriss";
import checklist from "../../Checklist/checklist";
import buero from "../../../pages/buero";
import eingang_chem_labor from "../../../pages/eingang_chem_labor";
import labortueren from "../../../pages/labortueren";

// Dashboard
// Placeholder for all internal links used in Programm
// maps all url that can be loaded into Dashboard component

const Dashboard = props => {
  return (
    <Switch>
      <Route path="/virtueles_labor/grundriss" exact component={grundriss} />
      <Route path="/virtueles_labor/checklist" exact component={checklist} />
      <Route path="/virtueles_labor/buero" exact component={buero} />
      <Route
        path="/virtueles_labor/eingang_chem_labor"
        exact
        component={eingang_chem_labor}
      />
      <Route
        path="/virtueles_labor/labortueren"
        exact
        component={labortueren}
      />
    </Switch>
  );
};

export default Dashboard;
