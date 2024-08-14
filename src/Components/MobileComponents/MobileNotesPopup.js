import React, { useState, useEffect, useRef } from 'react';
import './MobileNotesPopup.css';

export default function MobileNotesPopup({ groupNamesParent, setGroupNamesParent, onClose }) {
    const [groupName, setGroupName] = useState("");
    const [bgColor, setBgColor] = useState("");
    const popupRef = useRef(null);

    const handleBgColor = (e) => {
        setBgColor(getComputedStyle(e.target).backgroundColor);
    };


    const save = () => {
        const addGroup = { name: groupName, color: bgColor };
        setGroupNamesParent([...groupNamesParent, addGroup]);
        localStorage.setItem("groupNames", JSON.stringify([...groupNamesParent, addGroup]));
        onClose();
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className='mobile_popup' ref={popupRef}>
            <div className='mobile_popup_title'>Create New Group</div>
            <div className='mobile_popup_groupname_input'>
                <span>Group Name</span>
                <input type='text' value={groupName} placeholder='Enter group name' onChange={(e) => { setGroupName(e.target.value) }} />
            </div>
            <div className='mobile_popup_bgcolor_input'>
                <span>Choose color</span>
                <div className='popup_bgcolor_choise'>
                    <div className={`popup_bgcolor_choise_1 ${bgColor === "rgb(179, 139, 250)" ? `highlight` : ""}`} onClick={handleBgColor}></div>
                    <div className={`popup_bgcolor_choise_2 ${bgColor === "rgb(255, 121, 242)" ? `highlight` : ""}`} onClick={handleBgColor}></div>
                    <div className={`popup_bgcolor_choise_3 ${bgColor === "rgb(67, 230, 252)" ? `highlight` : ""}`} onClick={handleBgColor}></div>
                    <div className={`popup_bgcolor_choise_4 ${bgColor === "rgb(241, 149, 118)" ? `highlight` : ""}`} onClick={handleBgColor}></div>
                    <div className={`popup_bgcolor_choise_5 ${bgColor === "rgb(0, 71, 255)" ? `highlight` : ""}`} onClick={handleBgColor}></div>
                    <div className={`popup_bgcolor_choise_6 ${bgColor === "rgb(102, 145, 255)" ? `highlight` : ""}`} onClick={handleBgColor}></div>
                </div>
            </div>
            <div className='mobile_close_popup'>
                <button onClick={save} disabled={!(groupName && bgColor)}>Create</button>
            </div>
        </div>
    );
}
