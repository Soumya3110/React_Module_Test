import React from 'react'
import './DesktopHome.css'
import homeimg from '../../Assets/image.png'
import lock from '../../Assets/Icons/lock.png'
export default function DesktopHome() {
  return (
    <div className='desktop_home'>
        <div className='desktop_home_body'>
            <img src={homeimg} alt='image'/>
            <h1>Pocket Notes</h1>
            <p>Send and receive messages without keeping your phone online.
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
        </div>
        <div className='desktop_home_footer'>
            <img src={lock} alt='lock'/>
            <span>end-to-end encrypted</span>
        </div>
    </div>
  )
}
