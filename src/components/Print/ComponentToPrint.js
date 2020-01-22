import React from "react";
import "./print.css";
import i1 from "../../assets/pics/bgrci.png";
class ComponentToPrint extends React.Component {
  state = {
    commentString: "",
    erfolgString: "",
    printDetails: this.props.printDetails.twoSectionsDetails
  };

  comments = [
    "Herzlichen Glückwunsch, Sie haben schon einige Übungsaufgaben richtig gelöst und bestimmt noch Lust auf mehr Prozente! Suchen Sie sich ein weiteres Thema aus, zu dem Sie die Übungsaufgaben bearbeiten möchten.",
    "Bravo! Sie haben alle Übungsaufgaben der drei Lernmodule richtig gelöst und damit wichtige Gefährdungen und Schutzmaßnahmen in Laboratorien verstanden.",
    "Sie haben noch keine Übungsaufgabe richtig gelöst. Sind Ihr Ehrgeiz und Ihre Neugierde nun geweckt? Dann nichts wie los: Versuchen Sie doch einmal, die Übungen zu dem Thema zu lösen, das derzeit für Sie am wichtigsten und interessantesten ist."
  ];
  erfolg = [
    "Viel Erfolg!",
    "Wir wünschen Ihnen auch in Ihrem Labor ein sicheres und gesundes Arbeiten.",
    "Viel Erfolg!"
  ];
  componentDidMount() {
    this.setBottomText(this.props.printDetails);
    //this.state.printDetails();
  }
  setBottomText({ doneCount, totalCount }) {
    if (doneCount > 0) {
      this.setState({ commentString: this.comments[0] });
      this.setState({ erfolgString: this.erfolg[0] });
    } else if (doneCount === totalCount) {
      this.setState({ commentString: this.comments[1] });
      this.setState({ erfolgString: this.erfolg[1] });
    } else {
      this.setState({ commentString: this.comments[2] });
      this.setState({ erfolgString: this.erfolg[2] });
    }
  }
  getPercentFromTotal = (count, total) => {
    return Math.round((count / total) * 100);
  };
  render() {
    return (
      <div className="center">
        <div className="container">
          <header>
            <img src={i1} alt="" />
          </header>
          <div className="titel">
            <h2>Sicheres Arbeiten im Labor</h2>
            <h1>Virtuelles Labor</h1>
          </div>
          <div className="daten">
            <div className="daten_line">
              <b>Name: </b>
              <span id="name">{this.props.printDetails.name || "Anonym"}</span>
            </div>
            <div className="daten_line">
              <b>Datum: {this.props.printDetails.currentDate} </b>
              <span id="datum"></span>
            </div>
          </div>
          <div id="bs" className="bs">
            <div className="text">
              <span>
                <b> Bearbeitungsstand Übungen </b>
              </span>
              <span>Gelöste Aufgaben</span>
            </div>
            {Object.values(this.state.printDetails).map(d => {
              return (
                <div className="resultLine" key={d.name} id="a_kap">
                  <span>
                    <b>{d.name} </b>
                  </span>
                  <div className="status_bar">
                    <div className="bs_bar">
                      <progress
                        value={`${this.getPercentFromTotal(
                          d.doneCount,
                          d.totalCount
                        )}`}
                        max="100"
                        style={{ width: "100%", margin: 0 }}
                      ></progress>
                      <span className="prozent">
                        {this.getPercentFromTotal(d.doneCount, d.totalCount)} %
                      </span>
                    </div>
                    <div className="bs_number">
                      <span className="number_right"> {d.doneCount} </span>/{" "}
                      <span className="exercise_number">{d.totalCount}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="comments">
            <p>{this.state.commentString}</p>
          </div>
          <p id="erfolg">{this.state.erfolgString}</p>
        </div>
      </div>
    );
  }
}
export default ComponentToPrint;
