import React, { useContext, useState, useRef } from "react";
import "./footer.css";
import ReactToPrint from "react-to-print";
import { withRouter, NavLink } from "react-router-dom";
import { Image, Confirm, Button, Modal, Input } from "semantic-ui-react";
import { TocContext } from "../../util/TocProvider";
import ComponentToPrint from "../Print/ComponentToPrint";
import i3 from "../../assets/pics/level-up-icon.png";
import i4 from "../../assets/pics/trash.svg";
import i5 from "../../assets/pics/print.svg";
// Footer

// Deals with "<->  <<-->>"" buttons, Menu, MainMenu, Notes, Search
// uses tocState, tocPages, wState global states to : update state of Toc, active page, state of Notes and Search, Back function

const Footer = props => {
  // state to go through active page
  const [tocState] = useContext(TocContext);
  //  has to be changed
  const handleBackInHistory = () => {
    // if grundriss of checklish page do nothing
    if (tocState.treeIdsPath.length === 0) return false;
    // copa of ids (till current page) as array, get from tocPages tree
    let treeIdsPathCopy = tocState.treeIdsPath;
    // root path : virtuelles_labor
    let rootPath = props.location.pathname.split("/")[1];
    // if not a previouse page before grundriss
    if (treeIdsPathCopy && treeIdsPathCopy.length > 1) {
      let backPathArray = treeIdsPathCopy.map(exerciseNode => {
        return tocState.tocPagesMap[exerciseNode].filename;
      });
      backPathArray.reverse().pop();
      let backPathString = `/${rootPath}/${backPathArray.join("/")}`;
      props.history.push(backPathString);
    } else {
      // allways come back not further as grundriss page
      props.history.push(`/${rootPath}/grundriss`);
    }
  };
  const button_style = {
    color: "white",
    backgroundColor: "transparent"
  };
  const active_style = {
    color: "#ffc21b"
  };
  const getPercentFromTotal = () => {
    return Math.round(
      (tocState.exercisesState.doneCount /
        tocState.exercisesState.totalExercisesCount) *
        100
    );
  };

  // Dialog for Delete Function

  const [deleteState, setDeleteState] = useState({
    open: false,
    result: "show the modal to capture a result"
  });
  const show = () => setDeleteState(oldState => ({ ...oldState, open: true }));
  const handleConfirm = () => {
    localStorage.removeItem("pagesList");
    window.location.reload();
    setDeleteState(oldState => ({ result: "confirmed", open: false }));
  };
  const handleCancel = () =>
    setDeleteState(oldState => ({ result: "cancelled", open: false }));
  // ENDE //

  // Dialog for Print Function  {state and function to change this state}
  const [printPrintDialog, setPrintDialog] = useState({
    open: false,
    result: "show the modal to ask a Name"
  });
  const showPrintDialog = () => {
    setPrintDialog(oldState => ({ ...oldState, open: true }));
  };

  const handleCancelPrintDialog = () => {
    setPrintDialog(oldState => ({ result: "cancelled", open: false }));
  };

  //   ENDE  //

  // reference for PrintBluePrint Component <ComponentToPrint>
  const componentRef = useRef();
  // user input field
  const [userName, setName] = useState("");

  // handle chage of userName value by typing in input
  const handleChange = (e, { value }) => {
    setName(value);
  };

  // build current date
  const getCurrentDate = (separator = ".") => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${date}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${year}`;
  };
  const setPrintInformation = (allExercises = tocState.tocPagesMap) => {
    let printInf = {
      section_one: { name: "Chemisches Labor", doneCount: 0, totalCount: 0 },
      section_two: {
        name: "Biotechnologisches Labor",
        doneCount: 0,
        totalCount: 0
      }
    };
    const values = Object.values(allExercises);
    const upperBoundary = 8;
    for (const element of values) {
      const chapter = element.kuerzel
        .toLowerCase()
        .split(" ")[1]
        .split(".")[0];
      if (parseInt(chapter) < upperBoundary && element.type === 1) {
        printInf.section_one.totalCount++;
        if (element.done) {
          printInf.section_one.doneCount++;
        }
      } else if (parseInt(chapter) >= upperBoundary && element.type === 1) {
        printInf.section_two.totalCount++;
        if (element.done) {
          printInf.section_two.doneCount++;
        }
      }
    }
    return printInf;
  };

  return (
    <div className="footer">
      <div
        style={{
          display: "flex",
          background: " rgba(222, 222, 222, 1)",
          alignItems: "center"
        }}
      >
        <div className="left_footer">
          <span style={{ fontSize: "11px", paddingBottom: "5px" }}>
            {" "}
            {tocState.exercisesState.doneCount} von{" "}
            {tocState.exercisesState.totalExercisesCount} Mängeln gefunden{" "}
          </span>
          {/* <Progress percent={getPercentFromTotal()} size="tiny" style={{ width: "70%", margin: 0 }} color="blue" /> */}
          <progress
            value={`${getPercentFromTotal()}`}
            max="100"
            style={{ width: "90%", margin: 0 }}
          ></progress>
        </div>
        <div
          as="button"
          onClick={show}
          className="pointer"
          style={{ width: "24px", margin: "auto", marginRight: "12px" }}
        >
          <Image src={i4} />
        </div>
        <div
          as="button"
          className="pointer"
          style={{ width: "24px", margin: "auto", marginRight: "12px" }}
          onClick={showPrintDialog}
        >
          <Image src={i5} />
        </div>

        <Confirm
          open={deleteState.open}
          size="mini"
          content="Wollen Sie Ihren Bearbeitungsstand löschen?"
          cancelButton="Abbrechen"
          confirmButton="Ja"
          onCancel={handleCancel}
          onConfirm={handleConfirm}
        />
      </div>
      <div className="right_footer">
        <div className="footer_buttons">
          <NavLink
            to="/virtuelles_labor/checklist"
            activeStyle={active_style}
            style={button_style}
            className="grid twoColumn alignCenter padded gap10"
          >
            Checkliste
          </NavLink>
          <span className="divider"></span>
          <NavLink
            activeStyle={active_style}
            to="/virtuelles_labor/grundriss"
            className="grid twoColumn alignCenter padded gap10"
            style={button_style}
          >
            <span> Grundriss/Inhalt</span>
          </NavLink>
          <span className="divider"></span>
          <div
            as="button"
            onClick={handleBackInHistory}
            style={button_style}
            className="grid twoColumn alignCenter padded gap10 pointer"
            id="goBack"
          >
            <Image src={i3} />
            <span>
              <b style={{ letterSpacing: "1px" }}>Ebene höher</b>
            </span>
          </div>
        </div>
        <a
          href="../../hauptmenu/labor.htm"
          style={{
            backgroundColor: "transparent",
            marginLeft: "auto",
            color: "white"
          }}
        >
          <span>Hauptmenü</span>
        </a>
      </div>

      <Modal
        size="mini"
        open={printPrintDialog.open}
        onClose={handleCancelPrintDialog}
      >
        <Modal.Header>Bitte geben Sie Ihren Namen ein!</Modal.Header>
        <Modal.Content>
          <Input
            focus
            fluid
            placeholder="Name..."
            value={userName}
            onChange={handleChange.bind(this)}
            name="name"
          />
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={handleCancelPrintDialog}>Abbrechen</Button>

          <ReactToPrint
            trigger={() => <Button primary content="Drucken..." />}
            content={() => componentRef.current}
          />
          <div style={{ display: "none" }}>
            <ComponentToPrint
              ref={componentRef}
              printDetails={{
                name: userName,
                doneCount: tocState.exercisesState.doneCount,
                totalCount: tocState.exercisesState.totalExercisesCount,
                currentDate: getCurrentDate(),
                // percentFromTotal: getPercentFromTotal(),
                twoSectionsDetails: setPrintInformation()
              }}
            />
          </div>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default withRouter(Footer);
