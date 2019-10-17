import React, { useState, useEffect, useContext } from "react";
import { Button, Image, Grid, Transition, Reveal } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import "./checkpage.css";
import { AuthContext } from "../../util/AuthProvider";
import Header from "./../Header/Header";
import i1 from "../../assets/pics/laborleiter_tuer_ohne_markierung.jpg";
import i2 from "../../assets/pics/raumplan.png";
import i3 from "../../assets/pics/laborleiter_tuer_mit_markierung.jpg";
import i4 from "../../assets/pics/laborleiter_checkliste.png";
import i5 from "../../assets/pics/checkliste.png";

// CheckPage
// First Page that user sees, with 2 further pages as instractions or skip to Grundriss page

function CheckPage(props) {
  const [pageState, setPageSet] = useState(1);
  const [columnWidth, setColumnWidth] = useState(["7", "9"]);
  const handleNextInstraction = () => {
    setPageSet(lastState => lastState + 1);
  };
  const handleRedirectToMainMenu = () => {
    props.history.push("/virtueles_labor/grundriss");
  };
  function picture(state) {
    switch (state) {
      case 1:
        return <Image src={i1} floated="right" />;
      case 2:
        return <Image src={i3} floated="right" />;
      case 3:
        return <Image src={i4} floated="right" />;
      default:
        return null;
    }
  }
  function text(state) {
    switch (state) {
      case 1:
        return (
          <>
            <h2 className="font16">
              Herzlich willkommen bei der Firma SafeChem AG, einem chemischen
              Produktionsbetrieb.
            </h2>
            <p>
              Sie übernehmen in diesem Programm die Rolle eines
              Labormitarbeiters und können eine Reihe von Sicherheitsmängeln in
              einem virtuellen Labor aufdecken.
            </p>
            <p>
              In mehreren Laborsituationen werden Sie aufgefordert, Ihr Wissen
              über die Vorschriften und Regeln anzuwenden, die ein sicheres
              Arbeiten im Labor ermöglichen. Wenn Sie den Programmteil
              „Fachinformationen“ aufmerksam durchgearbeitet haben, wird es
              Ihnen nicht schwer fallen, das Labor nach den Anforderungen des
              Arbeitschutzes auszustatten.
            </p>
            <p>
              Eine kurze Einführung zeigt den prinzipiellen Ablauf der
              Anwendung.
            </p>
          </>
        );
      case 2:
        return (
          <>
            <Image src={i2} floated="right" />

            <p>
              Das virtuelle Labor enthält zahlreiche aktivierbare Objekte wie
              Fotos oder Grafiken. Beim Überfahren mit dem Mauszeiger werden die
              Objekte grafisch hervorgehoben.
            </p>
            <p>
              Wenn Sie die aktivierbaren Objekte anklicken, gelangen Sie zu der
              entsprechenden Ansicht oder zu einer Aufgabenstellung. Wenn Sie
              nicht aktivierbare Objekte anklicken, erscheint ein Hinweis im
              Meldungsfenster.
            </p>
          </>
        );
      case 3:
        return (
          <Grid padded>
            <Grid.Row columns="2">
              <Grid.Column width="8">
                <Image src={i5} />
              </Grid.Column>
              <Grid.Column width="8">
                <p>
                  Jede richtige Lösung einer Aufgabe wird automatisch in einer
                  Checkliste vermerkt. Die Checkliste enthält die vollständige
                  Aufstellung der Mängel bzw. Aufgaben in den Laborbereichen.
                </p>
                <p>
                  Mit einem Mausklick auf einen Eintrag in der Liste gelangen
                  Sie direkt zu der jeweiligen Laborsituation mit den einzelnen
                  Aufgabenstellungen.
                </p>
                <p>
                  Die Checkliste ist ein wichtiges Hilfsmittel, denn sie zeigt
                  den aktuellen Bearbeitungszustand und eine komplette Übersicht
                  über alle Aufgaben.
                </p>
              </Grid.Column>
            </Grid.Row>
            <p>
              Ihr Bearbeitungsstand wird wie im Fachinformationsteil automatisch
              in Ihrem Anwenderverzeichnis des benutzten Rechners gespeichert.
            </p>
            <p>
              <b>Wir wünschen Ihnen viel Erfolg bei Ihrer Aufgabe.</b>
            </p>
          </Grid>
        );
      default:
        return null;
    }
  }
  return (
    <div className="content checkPageBck">
      <Header />
      <Grid className="fullHeight">
        <Grid.Row columns="2">
          <Grid.Column
            width={pageState == 3 ? columnWidth[1] : columnWidth[0]}
            style={{ paddingRight: "0" }}
          >
            {pageState < 3 ? (
              <div
                style={{
                  maxWidth: "379px",
                  marginLeft: "auto",
                  marginTop: "60px",
                  position: "relative"
                }}
              >
                {text(pageState)}
              </div>
            ) : (
              <div
                style={{
                  maxWidth: "100%",
                  marginLeft: "52px",
                  marginTop: "60px",
                  position: "relative"
                }}
              >
                {text(pageState)}
              </div>
            )}
            {pageState}
            <div style={{ position: "absolute", top: "465px", left: "78px" }}>
              <Button
                size="small"
                onClick={
                  pageState < 3
                    ? handleNextInstraction
                    : handleRedirectToMainMenu
                }
              >
                Weiter
              </Button>
              {pageState == 1 ? (
                <div style={{ marginTop: "20px" }}>
                  <p> Sie können die Einführung auch überspringen:</p>
                  <Button size="small" onClick={handleRedirectToMainMenu}>
                    Grundriss
                  </Button>
                </div>
              ) : null}
            </div>
          </Grid.Column>
          <Grid.Column
            width={pageState == 3 ? columnWidth[0] : columnWidth[1]}
            verticalAlign="bottom"
            style={{ paddingLeft: "0" }}
          >
            {picture(pageState)}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
export default withRouter(CheckPage);
