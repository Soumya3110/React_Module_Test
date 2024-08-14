import React, { useContext, useEffect, useState, useCallback } from "react";
import "./DesktopNotes.css";
import enterIcon from '../../Assets/Icons/enter.png';
import DesktopNotesContent from './DesktopNotesContent';
import NotesContext from "../../Context/NotesContext";

export default function DesktopNotes() {
    const { notes, setNotes, selected } = useContext(NotesContext);
    const [text, setText] = useState("");
    const [groupDetails, setGroupDetails] = useState({
        bgColor: "",
        initials: "",
        selectedTitle: ""
    });

    useEffect(() => {
        if (!selected) return;

        const savedNotes = JSON.parse(localStorage.getItem(selected)) || [];
        setNotes(savedNotes);

        const groupNames = JSON.parse(localStorage.getItem("groupNames")) || [];
        const selectedGroup = groupNames.find(group => group.name === selected);

        if (selectedGroup) {
            setGroupDetails({
                bgColor: selectedGroup.color,
                initials: selectedGroup.name.split(" ").map(word => word.charAt(0)).join("").toUpperCase(),
                selectedTitle: selectedGroup.name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
            });
        } else {
            setGroupDetails({ bgColor: "#fff", initials: "", selectedTitle: "" });
        }
    }, [selected, setNotes]);

    const handleSaveNotes = useCallback(() => {
        if (!text.trim()) return;

        const newNote = {
            id: Date.now(),
            title: selected,
            content: text.trim(),
            date: new Date().toLocaleDateString("en-GB"),
            time: new Date().toLocaleTimeString()
        };

        const updatedNotes = [...(notes || []), newNote];
        localStorage.setItem(selected, JSON.stringify(updatedNotes));
        setText("");
        setNotes(updatedNotes);
    }, [text, selected, notes, setNotes]);

    const handleChange = (e) => setText(e.target.value);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSaveNotes();
        }
    };
    return (
        <div className="desktop_notes">
            <div className="desktop_notes_title">
                <div className="desktop_notes_title_color" style={{ backgroundColor: groupDetails.bgColor }}>
                    {groupDetails.initials}
                </div>
                <div className="desktop_notes_title_text">{groupDetails.selectedTitle}</div>
            </div>
            <div className="desktop_notes_content">
                {notes && notes.length > 0 ? notes.map(note => <DesktopNotesContent key={note.id} note={note} />) : null}
            </div>
            <div className="desktop_notes_input">
                <textarea
                    value={text}
                    placeholder="Enter your text here......."
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                ></textarea>
                <img src={enterIcon} alt="Save" onClick={handleSaveNotes} />
            </div>

        </div>
    )
}
