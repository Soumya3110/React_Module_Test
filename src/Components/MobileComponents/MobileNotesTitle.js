import React, { useContext } from 'react';
import './MobileNotesTitle.css';
import { useNavigate } from "react-router-dom";
import NotesContext from '../../Context/NotesContext';

export default function MobileNotesTitle({ item }) {
    const { setSelected } = useContext(NotesContext);
    const navigate = useNavigate();


    const [{ name = '', color = '' } = {}] = item || [];


    if (!name) {
        return null;
    }

    const upperNames = name
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();

    const newTitle = name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    const handleTitle = () => {
        localStorage.setItem("selected", name);
        setSelected(name);
        navigate("/notes");
    };

    return (
        <div onClick={handleTitle} className='mobile_title_logos'>
            <div className='mobile_title_logo' style={{ backgroundColor: color }}>
                {upperNames}
            </div>
            <div className='mobile_group_title'>{newTitle}</div>
        </div>
    );
}
