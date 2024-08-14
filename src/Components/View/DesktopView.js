
import React, { useContext, useEffect, useState } from 'react'
import './DesktopView.css'
import NotesPopup from '../DesktopComponents/NotesPopup';
import NotesTitle from '../DesktopComponents/NotesTitle';
import DesktopNotes from '../DesktopComponents/DesktopNotes';
import NotesContext from '../../Context/NotesContext';
import DesktopHome from '../DesktopComponents/DesktopHome';

export default function DesktopView() {

  const [titles, setTitles] = useState([]);
  const [showPopup, setShowPopup] = useState(false)
  const [groupNamesParent, setGroupNamesParent] = useState(localStorage.getItem("groupNames") || [])
  const { selected } = useContext(NotesContext);
  useEffect(() => {
    const data = localStorage.getItem("groupNames")
    if (data) {
      setGroupNamesParent(JSON.parse(data))
    } else {
      setGroupNamesParent([])
    }
  }, []);

  useEffect(() => {
    if (groupNamesParent.length > 0) {
      const val = JSON.parse(localStorage.getItem("groupNames"))
      const result = Object.keys(val).map((key) => [val[key]])
      setTitles(result)
    }
  }, [groupNamesParent])
  const handleClose = () => {
    setShowPopup(false);
  };
  return (
    <div className='conteniour'>
      <div className='desktop_sidebar'>
        <div className='desktop_sidebar_title'>
          Pocket Notes
        </div>
        <div className='desktop_sidebar_notes'>
          {titles.length > 0 ? (titles.map((item, index) => <NotesTitle key={index} item={item} />)) : ("")}
        </div>
        <div className='create_notes' onClick={() => { setShowPopup(true) }}>
          <span>+</span>
        </div>
        {showPopup && (
          <div className="desktop__popup">
            <NotesPopup
              groupNamesParent={groupNamesParent}
              setGroupNamesParent={setGroupNamesParent}
              onClose={handleClose}
            />
          </div>
        )}

      </div>


      <div className='desktop_home'>
        {selected.length > 0 ? <DesktopNotes /> : <DesktopHome />}
      </div>
    </div>
  )
}
