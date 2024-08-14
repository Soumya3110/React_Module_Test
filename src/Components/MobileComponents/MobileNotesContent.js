import React from 'react'
import './MobileNotesContent.css'

export default function MobileNotesContent({ note }) {
    return (
        <div className="mobile_notes_content_note">
            <div className="mobile_notes_content_details">
                <p>{note.content}</p>
            </div>
            <div className="mobile_notes_content_date_time_details">
                <div className="mobile_notes_content_date">{note.date}</div>
          <div className='circle'>  </div>
                <div className="mobile_notes_content_time">{note.time}</div>
            </div>

        </div>
    )
}
