import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./MobileNotesPage.css";
import enter from "../../Assets/Icons/enter.png";
import back from "../../Assets/Icons/back_arrow.png";
import NotesContext from '../../Context/NotesContext'
import MobileNotesContent from "./MobileNotesContent";

function MobileNotesPage() {
  const [text, setText] = useState("");
  const [bgColor, setBgColor] = useState("#fff");
  const [initials, setInitials] = useState("");
  const [selectedTitle, setSelectedTitle] = useState("");
  const navigate = useNavigate();
  const { notes, setNotes, selected, setSelected } = useContext(NotesContext);

  useEffect(() => {
    setSelected(localStorage.getItem("selected") || "");
    setNotes(JSON.parse(localStorage.getItem(selected)) || []);
    const groupNames = JSON.parse(localStorage.getItem("groupNames"));
    const selectedGroup = groupNames.find((group) => group.name === selected);
    if (selectedGroup) {
      setBgColor(selectedGroup.color);
      setInitials(
        selectedGroup.name
          .split(" ")
          .map((word) => word.charAt(0))
          .join("")
          .toUpperCase()
      );
      setSelectedTitle(
        selectedGroup.name
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      );
    }
  }, [setSelected, setNotes, selected]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveNotes();
      setText("");
    }
  };

  const handleSaveNotes = (e) => {
    const notes = JSON.parse(localStorage.getItem(selected)) || [];
    const newNoteObj = {
      id: Date.now(),
      title: selected,
      content: text,
      date: new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }),
      time: new Date().toLocaleTimeString(),
    };
    notes.push(newNoteObj);
    localStorage.setItem(selected, JSON.stringify(notes));
    setText("");
    setNotes(notes);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const goBack = () => {
    setSelected("");
    navigate("/");
  };

  return (
    <div className="mobiles_notes_page">
      <div className="mobile_notes_title">
        <img src={back} alt="back" onClick={goBack} />
        <div
          className="mobile_notes__title_logo_color"
          style={{ backgroundColor: bgColor }}
        >
          {initials}
        </div>
        <div className="mobile_notes_title_text">
          {selectedTitle}
        </div>
      </div>
      <div className="mobile_notes_body">
        {notes.map((note, index) => (<MobileNotesContent key={index} note={note} />))}
      </div>
      <div className="mobile_notes_input">
        <textarea
          value={text}
          placeholder="Your simple text is here"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        ></textarea>
        <img src={enter} alt="enter" onClick={handleSaveNotes} />
      </div>
    </div>
  );
}

export default MobileNotesPage;