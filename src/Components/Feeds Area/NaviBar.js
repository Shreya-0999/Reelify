import React from 'react'
import '../Styles/NaviBar.css'
import logo from '../Images/logo.png'
import wordLogo from '../Images/word_logo.png'

function NaviBar({ userData }) {

    return (
        <>
            <div className='navImage'>
                <div className="side1">
                    <div className='navName'>
                        <img src={wordLogo} />
                    </div>
                    <div className='logo'>
                        <img src={logo} />
                    </div>
                </div>
            </div>

        </>
    )
}

export default NaviBar
