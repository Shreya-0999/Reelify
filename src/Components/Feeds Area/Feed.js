import React, { useContext, useState } from 'react'
import NaviBar from './NaviBar';
import FeedLeftCompo from './FeedLeftCompo';
import FeedRightCompo from './FeedRightCompo';
import UploadImageFile from './Post/UploadImageFile';
import UploadVideoFile from './Post/UploadVideoFile';
import Post from './Post/Post';
import { AuthContext } from '../../Context/AuthProvider';
import './styles/Feed.css'

function Feed() {
    console.log("Feed Started");
    const [userData, setUserData] = useState(null);
    const { currentUser } = useContext(AuthContext);
    console.log("Current User: ",currentUser)

    return (
        <div className='bodyArea'>
            <div className='feedLeftCompo'>
                <FeedLeftCompo />
            </div>
            <div className='middleArea'>
                <div className='naviBar'>
                    <NaviBar />
                </div>
                <div className='feedsArea'>
                    <div className= 'uploadBtns'>
                        <UploadImageFile userData={userData} />
                        <UploadVideoFile userData={userData} />
                    </div>
                    <Post userData={userData} />
                </div>
            </div>
            <div className='feedRightCompo'>
                <FeedRightCompo />
            </div>
        </div>
    )
}

export default Feed
