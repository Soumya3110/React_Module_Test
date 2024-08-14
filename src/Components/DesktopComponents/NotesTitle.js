import React, { useContext } from 'react';
import './NotesTitle.css';
import NotesContext from '../../Context/NotesContext';

export default function NotesTitle({ item }) {
    const { selected, setSelected } = useContext(NotesContext);

    if (!item || item.length === 0 || !item[0] || !item[0].name) {
        return null;
    }

    const { name, color } = item[0];
    const upperNames = name.split(" ").map((word) => word.charAt(0)).join("").toUpperCase();
    const newTitle = name.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    const handleTitle = () => {
        setSelected(name);
    };

    return (
        <div onClick={handleTitle} className={`title_logos ${selected === name ? "highlight_title" : ""}`}>
            <div className='title_logo' style={{ backgroundColor: color }}>{upperNames}</div>
            <div className='group_title'>{newTitle}</div>
        </div>
    );
}
