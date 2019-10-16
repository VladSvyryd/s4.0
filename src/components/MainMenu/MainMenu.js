import React, { useState } from "react";

import "./mainMenu.css";
import { withRouter } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button, Modal } from "semantic-ui-react";
import Impressum from "../../pages/impressum";
// MainMenu
// simple Component to send User to the right chapter
// function : setChapter after click on link and redirect to needed url

const MainMenu = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  return (
    <div className="mainMenu">
      <div className="logoBox" />
      <div className="mainMenu_section">
        <div className="menuTitle">
          <h2>Hauptmenü</h2>
          <p>Bitte wählen Sie ein Thema</p>
        </div>
        <div className="menuModule">
          <h3>Module</h3>
          <ul>
            <li>
              <NavLink to="/grundlagen/uebersicht_a">Grundlagen</NavLink>
            </li>
            <li>
              <NavLink to="/fuegen/uebersicht_b">Fügen</NavLink>
            </li>
            <li>
              <NavLink to="/energieuebertragung/uebersicht_c">
                Energieuebertragung
              </NavLink>
            </li>
            <li>
              <NavLink to="/s_tragen/uebersicht_d">Schützen und Tragen</NavLink>
            </li>

            <Modal
              trigger={<li onClick={handleOpen}>Impressum</li>}
              open={modalOpen}
              onClose={handleClose}
              closeIcon
            >
              <Modal.Header>Impressum</Modal.Header>
              <Modal.Content scrolling>
                <Modal.Description>
                  <Impressum />
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button onClick={handleClose}>Schliessen</Button>
              </Modal.Actions>
            </Modal>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default withRouter(MainMenu);
