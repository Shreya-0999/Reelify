import React, { useContext, useEffect, useState } from 'react'
import NaviBar from './NaviBar';
import FeedLeftCompo from './FeedLeftCompo';
import FeedRightCompo from './FeedRightCompo';
import UploadImageFile from '../Post/UploadImageFile';
import UploadVideoFile from '../Post/UploadVideoFile';
import Post from '../Post/Post';
import { AuthContext } from '../../Context/AuthProvider';
import { database } from './../../firebase';
import '../Styles/Feed.css'

function Feed() {
    console.log("Feed Started");
    const [userData, setUserData] = useState(null);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        console.log("Feed Use Effect");
        const unsubs = database.users.doc(currentUser.uid).onSnapshot(doc => {
            setUserData(doc.data());
        })
    }, [])
    // console.log("------------FEeEEEDS-----------", userData);

    return (
        <>
            {
                userData == null
                    ? <h2>Loading Please Wait.....</h2>
                    : <>
                        <div className='feedBody'>
                            <div className='bodyArea'>
                                <div className='feedLeftCompo'>
                                    <FeedLeftCompo userData = {userData} />
                                </div>

                                <div className='middleArea'>
                                    <div className='naviBar'>
                                        <NaviBar />
                                    </div>

                                    <div className='feedsArea'>
                                        <div className='uploadBtns'>
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
                        </div>
                    </>
            }
        </>
    )
}

export default Feed
