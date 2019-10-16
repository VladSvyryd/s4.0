import React, { useState, useEffect, useContext } from "react";
import { Button, Image, Grid } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import "./checkpage.css";
import { AuthContext } from "../../util/AuthProvider";
import Header from "./../Header/Header";
import i1 from "../../assets/pics/laborleiter_tuer_ohne_markierung.jpg";

// CheckPage
// Authetification of User with json token
// Checks last visited page and redirect to it or redirect to main menu

// ACHTUNG!!!!! To get the programm worked, add serial_number: true; to session storage

function CheckPage(props) {
  // is it in local storage? initial state false
  const [lastVisitedPage, setLastVisitedPage] = useState(false);
  const [authState, setAuthState] = useContext(AuthContext);
  let mt_state = JSON.parse(localStorage.getItem("mt_state"));

  const handleRedirectToLastPage = () => {
    props.history.push(mt_state.state.last_visited_page);
  };
  const handleRedirectToMainMenu = () => {
    props.history.push("/hauptmenu");
  };

  return (
    <div className="content checkPageBck">
      <Header />
      <Grid className="fullHeight">
        <Grid.Row columns="2">
          <Grid.Column width="7">
            <div
              style={{
                maxWidth: "379px",
                marginTop: "60px",
                marginLeft: "auto"
              }}
            >
              <h2 className="font16">
                Herzlich willkommen bei der Firma SafeChem AG, einem chemischen
                Produktionsbetrieb.
              </h2>
              <p>
                Sie übernehmen in diesem Programm die Rolle eines
                Labormitarbeiters und können eine Reihe von Sicherheitsmängeln
                in einem virtuellen Labor aufdecken.
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
              <Button
                size="small"
                disabled={!authState}
                onClick={handleRedirectToMainMenu}
              >
                Weiter
              </Button>
              Sie können die Einführung auch überspringen:
              <Button
                size="small"
                disabled={!authState}
                onClick={handleRedirectToMainMenu}
              >
                Grundriss
              </Button>
            </div>
          </Grid.Column>
          <Grid.Column width="9">
            <Image src={i1} floated="right" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
export default withRouter(CheckPage);
