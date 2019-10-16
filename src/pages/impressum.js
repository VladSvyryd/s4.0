import React from "react";
import { Header, Image } from "semantic-ui-react";
function impressum() {
  const divStyle = {
    marginBottom: "40px"
  };
  return (
    <div className="impressum">
      <div style={divStyle}>
        <Header>Technik und Medien GmbH</Header>
        <span>Gneisenaustr. 70</span>
        <br />
        <span>10961 Berlin</span>
        <br />
        <br />
        <span>Tel: 030 / 695 090 - 59</span>
        <br />
        <span>Fax: 030 / 695 090 - 60</span>
        <br />
        <span>E-Mail: </span>
        <a
          href="mailto:tm-online@tm-online.de?subject=Anfrage"
          rel="noopener noreferrer"
        >
          tm-online@tm-online.de
        </a>
        <br />
        <span>Internet: </span>
        <a
          target="_blank"
          href="https://www.tm-online.de/"
          rel="noopener noreferrer"
        >
          www.tm-online.de
        </a>
        <br />
      </div>
      <div style={divStyle}>
        <Header>Informationen zur Entstehung </Header>
        <p>
          Das Informationssystem Lektor MONTAGETECHNIK entstand aus dem Projekt
          MUM (Mehrsprachige Unterrichtssoftware für die Montagetechnik). Das
          Projekt MUM wurde im Rahmen des Forschungsprogramms LEONARDO DA VINCI
          der Europäischen Gemeinschaft gefördert und ist in einem
          internationalen Projekt an den Beruflichen Schulen -GTL- Rendsburg
          entwickelt worden. Hier arbeiteten Berufsschullehrer,
          Multimedia-Entwickler und ein Industrieunternehmen zusammen an einer
          praxisnahen Unterrichts- und Arbeitshilfe für die montagetechnische
          Ausbildung und Berufspraxis in mehreren europäischen Ländern.
        </p>
      </div>
      <div style={divStyle}>
        <Header>Lizenzhinweis</Header>
        <p>
          Das Programm, das Gestaltungskonzept und dessen Inhalte sind
          urheberrechtlich geschüzt. Die Urheberrechte an den mit einer
          Quellenangabe versehenen Bildern und Videos liegen bei den genannten
          Personen und Institutionen.
        </p>
        <p>
          Das Programm geht aus dem Projekt "Mehrsprachige Unterrichtssoftware
          für die Montagetechnik" hervor, das von der Kommission der
          Europäischen Gemeinschaft im Rahmen des Leonardo da Vinci-Programms
          gefördert wurde.
        </p>
      </div>
      <div style={divStyle}>
        <Header>Projektleitung</Header>
        <span>Berufliche Schulen Rendsburg</span>
        <br />
        <span>Gewerbe, Technik, Landwirtschaft</span>
        <br />
        <span>Wolfgang Berndt</span>
        <br />
        <span>Wolfgang Biel</span>
        <br />
        <span>Jürgen Mumm</span>
        <br />
        <span>Joachim Rudemann</span>
        <br />
      </div>
      <div style={divStyle}>
        <Header>Projektteilnehmer</Header>
        <span>Berufliche Schulen Rendsburg (D)</span>
        <br />
        <span>Commune de Misilmeri, Misilmeri (I)</span>
        <br />
        <span>Österängskolan, Kristianstad (S)</span>
        <br />
        <span>Schleswag AG, Rendsburg (D)</span>
        <br />
        <span>Technik und Medien GmbH (D)</span>
        <br />
        <span>Uni Hannover, Institut für Berufspädagogik (D)</span>
        <br />
        <span>Uni Hannover, Zentrum für Didaktik der Technik (D)</span>
        <br />
        <br />
        <p>
          Konzeption, fachliche Überarbeitung und Programmierung Technik und
          Medien GmbH, Berlin
        </p>
      </div>
      <div style={divStyle}>
        <Header>Projektteilnehmer</Header>
        <p>
          Dieses Produkt (Handbuch, Veröffentlichung, CD-ROM, Video usw.) wurde
          mit Unterstützung der Kommission der Europäischen Gemeinschaft im
          Rahmen des Leonardo da Vinci-Programms erstellt. Der Inhalt gibt nicht
          unbedingt die Meinung der Kommission zu diesem Thema wieder.
        </p>
      </div>
    </div>
  );
}

export default impressum;
