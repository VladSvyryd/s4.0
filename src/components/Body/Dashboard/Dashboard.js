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
import pers_schutz from "../../../pages/pers_schutz";
import koerpernotdusche from "../../../pages/koerpernotdusche";
import ventil from "../../../pages/ventil";
import rett_einrichtung from "../../../pages/rett_einrichtung";
import zugaenglichkeit from "../../../pages/zugaenglichkeit";
import feuerloescher from "../../../pages/feuerloescher";
import verbandkasten from "../../../pages/verbandkasten";
import apparaturen from "../../../pages/apparaturen";
import apparaturen_1 from "../../../pages/apparaturen_1";
import versuch_im_Abzug from "../../../pages/versuch_im_Abzug";
import versuch_im_Abzug_hebebuehne from "../../../pages/versuch_im_Abzug_hebebuehne";
import eingang_bio_Labor from "../../../pages/eingang_bio_Labor";
import hygieneplan from "../../../pages/hygieneplan";

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
        path="/virtueles_labor/eingang_chem_labor/koerpernotdusche"
        exact
        component={koerpernotdusche}
      />
      <Route
        path="/virtueles_labor/eingang_chem_labor/ventil"
        exact
        component={ventil}
      />
      <Route
        path="/virtueles_labor/rett_einrichtung"
        exact
        component={rett_einrichtung}
      />
      <Route
        path="/virtueles_labor/rett_einrichtung/zugaenglichkeit"
        exact
        component={zugaenglichkeit}
      />
      <Route
        path="/virtueles_labor/rett_einrichtung/feuerloescher"
        exact
        component={feuerloescher}
      />
      <Route
        path="/virtueles_labor/rett_einrichtung/verbandkasten"
        exact
        component={verbandkasten}
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
        path="/virtueles_labor/apparaturen"
        exact
        component={apparaturen}
      />
      <Route
        path="/virtueles_labor/apparaturen/apparaturen"
        exact
        component={apparaturen_1}
      />
      <Route
        path="/virtueles_labor/apparaturen/versuch_im_Abzug"
        exact
        component={versuch_im_Abzug}
      />
      <Route
        path="/virtueles_labor/apparaturen/versuch_im_Abzug/hebebuehne"
        exact
        component={versuch_im_Abzug_hebebuehne}
      />
      <Route
        path="/virtueles_labor/eingang_bio_Labor"
        exact
        component={eingang_bio_Labor}
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
        path="/virtueles_labor/arbeitsplatz/hygieneplan"
        exact
        component={hygieneplan}
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
      <Route
        path="/virtueles_labor/sterilisationsautoklav/pers_schutz"
        exact
        component={pers_schutz}
      />
    </Switch>
  );
};

export default Dashboard;
