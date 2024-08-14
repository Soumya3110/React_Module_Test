import React, { useState, useEffect } from 'react'
import './MobileView.css'
import MobileNotesTitle from '../MobileComponents/MobileNotesTitle';

import MobileNotesPopup from '../MobileComponents/MobileNotesPopup';

export default function MobileView() {
  const [titles, setTitles] = useState([]);
  const [showPopup, setShowPopup] = useState(false)
  const [groupNamesParent, setGroupNamesParent] = useState(
    localStorage.getItem("groupNames") || []
  )

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

  return (
    <div className='mobile_sidebar'>
      <div className='mobile_sidebar_title'>
        Pocket Notes
      </div>
      <div className='mobile_sidebar_notes_name'>
        {titles.length > 0 ? (titles.map((item, index) => <MobileNotesTitle key={index} item={item} />)) : ("")}
      </div>
      <div className='mobile_sidebar_create_notes' onClick={() => { setShowPopup(true) }}>
        <span>+</span>
      </div>
      {showPopup && (
        <div className='mobile_popup_sidebar'>
          <MobileNotesPopup groupNamesParent={groupNamesParent} setGroupNamesParent={setGroupNamesParent} onClose={() => { setShowPopup(false) }} />
        </div>
      )}
    </div>
  )
}

