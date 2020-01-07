import React from "react";
import "rc-menu/assets/index.css";
import { Route, Switch, Redirect } from "react-router-dom";
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
import hebebuehne from "../../../pages/hebebuehne";
import eingang_bio_Labor from "../../../pages/eingang_bio_Labor";
import hygieneplan from "../../../pages/hygieneplan";
import tauchsieder from "../../../pages/tauchsieder";
import statische_sicherung from "../../../pages/statische_sicherung";
import schliffsicherung from "../../../pages/schliffsicherung";
import rundkolben from "../../../pages/rundkolben";
import schlauchsicherung from "../../../pages/schlauchsicherung";
import untweisungen from "../../../pages/untweisungen";
import durchfuehrungen from "../../../pages/durchfuehrungen";
import beansprungungsarten from "../../../pages/beansprungungsarten";
import prueffristen from "../../../pages/prueffristen";
import mitarbeiter from "../../../pages/mitarbeiter";
import essen_und_trinken from "../../../pages/essen_und_trinken";
import rauchen from "../../../pages/rauchen";
import laborbrille from "../../../pages/laborbrille";
import laborkittel from "../../../pages/laborkittel";
import aermel_des_Labor from "../../../pages/aermel_des_Labor";
import schuhe from "../../../pages/schuhe";
import pruefungWirksamkeit from "../../../pages/pruefungWirksamkeit";

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
        path="/virtueles_labor/buero/untweisungen"
        exact
        component={untweisungen}
      />
      <Route
        path="/virtueles_labor/buero/untweisungen/durchfuehrungen"
        exact
        component={durchfuehrungen}
      />
      <Route
        path="/virtueles_labor/buero/untweisungen/beansprungungsarten"
        exact
        component={beansprungungsarten}
      />
      <Route
        path="/virtueles_labor/buero/prueffristen"
        exact
        component={prueffristen}
      />

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
        path="/virtueles_labor/eingang_chem_labor/koerpernotdusche"
        exact
        component={augennotdusche}
      />
      <Route
        path="/virtueles_labor/eingang_chem_labor/augennotdusche"
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
        path="/virtueles_labor/apparaturen/funk_des_Abzuges"
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
        component={hebebuehne}
      />
      <Route
        path="/virtueles_labor/apparaturen/versuch_im_Abzug/tauchsieder"
        exact
        component={tauchsieder}
      />
      <Route
        path="/virtueles_labor/apparaturen/versuch_im_Abzug/statische_sicherung"
        exact
        component={statische_sicherung}
      />
      <Route
        path="/virtueles_labor/apparaturen/versuch_im_Abzug/schliffsicherung"
        exact
        component={schliffsicherung}
      />
      <Route
        path="/virtueles_labor/apparaturen/versuch_im_Abzug/rundkolben"
        exact
        component={rundkolben}
      />
      <Route
        path="/virtueles_labor/apparaturen/versuch_im_Abzug/schlauchsicherung"
        exact
        component={schlauchsicherung}
      />
      <Route
        path="/virtueles_labor/mitarbeiter"
        exact
        component={mitarbeiter}
      />
      <Route
        path="/virtueles_labor/mitarbeiter/essen_und_trinken"
        exact
        component={essen_und_trinken}
      />
      <Route
        path="/virtueles_labor/mitarbeiter/rauchen"
        exact
        component={rauchen}
      />
      <Route
        path="/virtueles_labor/mitarbeiter/laborbrille"
        exact
        component={laborbrille}
      />
      <Route
        path="/virtueles_labor/mitarbeiter/laborkittel"
        exact
        component={laborkittel}
      />
      <Route
        path="/virtueles_labor/mitarbeiter/aermel_des_Labor"
        exact
        component={aermel_des_Labor}
      />
      <Route
        path="/virtueles_labor/mitarbeiter/schuhe"
        exact
        component={schuhe}
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
      <Route
        path="/virtueles_labor/sterilisationsautoklav/pruefung_der_wirksamkeit"
        exact
        component={pruefungWirksamkeit}
      />
      {
        // needed to control 404 page on all pages inside Shell of a program to go out into Checkpage
      }
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default Dashboard;
