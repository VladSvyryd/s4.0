import React from "react";
import "rc-menu/assets/index.css";
import { Route, Switch } from "react-router-dom";
import grundriss from "../../GrundRiss/grundriss";
import checklist from "../../Checklist/checklist";
import buero from "../../../pages/buero";
import eingang_chem_labor from "../../../pages/eingang_chem_labor";
import labortueren from "../../../pages/labortueren";
import augennotdusche from "../../../pages/augennotdusche";
import chemikalien from "../../../pages/chemikalien";
import regal from "../../../pages/regal";
import sicherheitsschrank from "../../../pages/sicherheitsschrank";
import druckgasflaschenschrank from "../../../pages/druckgasflaschenschrank";
import druckgasflasche from "../../../pages/druckgasflasche";
import waschbecken_garderobe from "../../../pages/waschbecken_garderobe";
import waschbecken_garderobe_1 from "../../../pages/waschbecken_garderobe_1";
import waschbecken_garderobe_2 from "../../../pages/waschbecken_garderobe_2";
import arbeitsplatz from "../../../pages/arbeitsplatz";
import arbeitsplatz_1 from "../../../pages/arbeitsplatz_1";
import arbeitsplatz_2 from "../../../pages/arbeitsplatz_2";
import mikrobiologische from "../../../pages/mikrobiologische";
import arbeitsmittel from "../../../pages/arbeitsmittel";
import pipetten from "../../../pages/pipetten";
import arbeitshaltung from "../../../pages/arbeitshaltung";
import sterilisationsautoklav from "../../../pages/sterilisationsautoklav";
import ausstatung_entladung from "../../../pages/ausstatung_entladung";

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
        path="/virtueles_labor/eingang_chem_labor/labortueren"
        exact
        component={labortueren}
      />
      <Route
        path="/virtueles_labor/eingang_chem_labor/augennotdusche"
        exact
        component={augennotdusche}
      />
      <Route
        path="/virtueles_labor/chemikalien"
        exact
        component={chemikalien}
      />
      <Route
        path="/virtueles_labor/chemikalien/regal"
        exact
        component={regal}
      />
      <Route
        path="/virtueles_labor/chemikalien/sicherheitsschrank"
        exact
        component={sicherheitsschrank}
      />
      <Route
        path="/virtueles_labor/druckgasflaschenschrank"
        exact
        component={druckgasflaschenschrank}
      />
      <Route
        path="/virtueles_labor/druckgasflaschenschrank/druckgasflasche"
        exact
        component={druckgasflasche}
      />
      <Route
        path="/virtueles_labor/waschbecken_garderobe"
        exact
        component={waschbecken_garderobe}
      />
      <Route
        path="/virtueles_labor/waschbecken_garderobe/haendewaschen"
        exact
        component={waschbecken_garderobe_1}
      />
      <Route
        path="/virtueles_labor/waschbecken_garderobe/pers_ausruestung"
        exact
        component={waschbecken_garderobe_2}
      />
      <Route
        path="/virtueles_labor/arbeitsplatz"
        exact
        component={arbeitsplatz}
      />
      <Route
        path="/virtueles_labor/arbeitsplatz/belueftung"
        exact
        component={arbeitsplatz_1}
      />
      <Route
        path="/virtueles_labor/arbeitsplatz/arbeitsorganisation"
        exact
        component={arbeitsplatz_2}
      />
      <Route
        path="/virtueles_labor/mikrobiologische"
        exact
        component={mikrobiologische}
      />
      <Route
        path="/virtueles_labor/mikrobiologische/arbeitsmittel"
        exact
        component={arbeitsmittel}
      />
      <Route
        path="/virtueles_labor/mikrobiologische/pipetten"
        exact
        component={pipetten}
      />
      <Route
        path="/virtueles_labor/mikrobiologische/arbeitshaltung"
        exact
        component={arbeitshaltung}
      />
      <Route
        path="/virtueles_labor/sterilisationsautoklav"
        exact
        component={sterilisationsautoklav}
      />
      <Route
        path="/virtueles_labor/sterilisationsautoklav/ausstatung_entladung"
        exact
        component={ausstatung_entladung}
      />
    </Switch>
  );
};

export default Dashboard;
