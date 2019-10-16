import React, { useState, useContext, useEffect } from "react";
import { TextArea, Form, Button, List } from "semantic-ui-react";
import { TocContext } from "../../../util/TocProvider";
import moment from "moment";
import { NavLink } from "react-router-dom";

import "./notes.css";

// NotesForm
// Form Object that handles User Input and saves it as Note, depending from current chapter
// functions: save, delete, load notes from local storage

const NOTE_INITIAL_STATE = [];
export default function NotesForm(props) {
  const [values, setValues] = useState({ note: "" });
  const [notes, setNotes] = useState(NOTE_INITIAL_STATE);
  const [tocPages] = useContext(TocContext);

  // each time user types, values are changed wit user's input
  const handleInputChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  // set Title of the current page
  const setUpTitle = page => {
    return page.kuerzel + " " + page.verweis_titel;
  };

  // handles click event on SAVE button
  const handleFormSubmit = () => {
    let alreadyCreated = false;
    let index;
    notes &&
      notes.map((note, i) => {
        if (note.id === tocPages.currentPage.id) {
          alreadyCreated = true;
          index = i;
        }
      });
    if (alreadyCreated) {
      editNoteByIndex(index);
    } else {
      createNewNote();
    }
  };

  // creates new Note or edit the old one and updates the local storage with actual list of Nodes
  const createNewNote = () => {
    const newNotes = [
      ...notes,
      {
        id: tocPages.currentPage.id,
        shorthand: setUpTitle(tocPages.currentPage),
        text: values.note,
        date: Date.now(),
        url: props.match.url + "/" + tocPages.currentPage.filename
      }
    ];
    setNotes(newNotes);
    localStorage.setItem("montage-t-notes", JSON.stringify(newNotes));
  };

  // edit old Note
  const editNoteByIndex = index => {
    let newNotes = [...notes];
    newNotes[index].text = values.note;
    setNotes([...newNotes]);
    localStorage.setItem("montage-t-notes", JSON.stringify(notes));
  };
  // delete Note and update local storage
  const handleDeleteNote = e => {
    let id = parseInt(e.target.getAttribute("data-id-delete"));
    let newNotes = [...notes];
    for (var i = newNotes.length - 1; i >= 0; i--) {
      if (newNotes[i].id === id) {
        newNotes.splice(i, 1);
        setNotes(newNotes);
        setValues({ note: "" });
        localStorage.setItem("montage-t-notes", JSON.stringify(newNotes));
      }
    }
    console.log("notes after delete", notes);
  };
  // get Note from local storage  and return it as object
  const getNoteFromStorage = notes_from_storage => {
    let result = false;
    notes_from_storage &&
      notes_from_storage.map(note => {
        if (note.id === tocPages.currentPage.id) result = note;
      });
    return result;
  };

  // fill the textarea with the text of current page note
  const insertOldNoteTextIntoTextarea = () => {
    let currentNote = getNoteFromStorage(notes);
    currentNote
      ? setValues({ note: currentNote.text })
      : setValues({ note: "" });
  };

  // each time current page is triggered and being changed, fire this event
  useEffect(() => {
    // if the programm hasn't been closed, after foing into "Hauptmenu" it has to update it's notes state with that from storage
    setNotes(JSON.parse(localStorage.getItem("montage-t-notes")) || []);
    insertOldNoteTextIntoTextarea();
  }, [tocPages]);
  return (
    <div className="flex_column">
      <span>Ihre Notizen zum Thema:</span>
      <p className="note_title">
        {tocPages.currentPage && setUpTitle(tocPages.currentPage)}
      </p>
      <Form onSubmit={handleFormSubmit} className="noteForm">
        <TextArea
          placeholder="Neue Notiz"
          name="note"
          value={values.note}
          style={{ minHeight: 150 }}
          onChange={handleInputChange}
        />
        <Button
          disabled={values.note ? false : true}
          style={{ width: 100 }}
          className="save"
        >
          Speichern
        </Button>
      </Form>
      <List divided relaxed className="noteList">
        {notes &&
          notes.map(note => {
            return (
              <div key={`note_${note.id}`}>
                <div className="noteHeader">
                  <List.Header as={NavLink} to={note.url}>
                    {note.shorthand}
                  </List.Header>
                  <span
                    className="button-close"
                    data-id-delete={note.id}
                    onClick={handleDeleteNote}
                  >
                    &#10005;
                  </span>
                </div>
                <div>
                  <p className="date">
                    {moment(note.date).format("MM-DD-YYYY")}
                  </p>
                </div>
                <div>
                  <p>{note.text}</p>
                </div>
              </div>
            );
          })}
      </List>
    </div>
  );
}
