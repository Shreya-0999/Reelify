import React from 'react'
import '../Styles/NaviBar.css'
import logo from '../Images/logo.png'
import wordLogo from '../Images/word_logo.png'

function NaviBar() {
    return (
        <div className= 'navImage'>
            <div className= 'navName'>
                <img src= {wordLogo}/>
            </div>
            <div className= 'logo'>
                <img src= {logo}/>
            </div>
        </div>
    )
}

export default NaviBar
