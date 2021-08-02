import React from 'react'
import './styles/NaviBar.css'
import logo from './images/logo.png'
import instagram from './images/instagram.png'

function NaviBar() {
    return (
        <div className= 'instaImage'>
            <div className= 'logo'>
                <img src= {logo}/>
            </div>
            <span className="span"/>
            <div className= 'instagram'>
                <img src= {instagram}/>
            </div>
            
        </div>
    )
}

export default NaviBar
