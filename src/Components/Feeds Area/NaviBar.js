import React from 'react'
import '../Styles/NaviBar.css'
import logo from '../Images/logo.png'
import wordLogo from '../Images/word_logo.png'

function NaviBar() {
    return (
        <div className= 'instaImage'>
            <div className= 'logo'>
                <img src= {logo}/>
            </div>
            <span className="span"/>
            <div className= 'instagram'>
                <img src= {wordLogo}/>
            </div>
        </div>
    )
}

export default NaviBar
