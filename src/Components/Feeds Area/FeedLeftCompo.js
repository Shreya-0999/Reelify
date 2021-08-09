import React from 'react'
import '../Styles/FeedLeftCompo.css'

function FeedLeftCompo({userData}) {
    return (
        <div className= 'leftBody'>
            <div className='leftFeedPic'>
                <img className='leftFeedimg' src = {userData.ProfileUrl}/>
            </div>
            <h1 className='leftFeedUserName'>{userData.Username}</h1>
        </div>
    )
}

export default FeedLeftCompo
