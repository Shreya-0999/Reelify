import React, { useContext, useEffect, useState } from 'react'
import NaviBar from './NaviBar';
import Profile from '../Profile/Profile';
import UploadImageFile from '../Post/UploadImageFile';
import UploadVideoFile from '../Post/UploadVideoFile';
import Post from '../Post/Post';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { AuthContext } from '../../Context/AuthProvider';
import { database } from './../../firebase';
import '../Styles/Feed.css'

function Feed() {
    console.log("Feed Started");
    const [userData, setUserData] = useState(null);
    const [profile, setProfile] = useState(false);
    const { currentUser } = useContext(AuthContext);

    

    useEffect(() => {
        console.log("Feed Use Effect");
        const unsubs = database.users.doc(currentUser.uid).onSnapshot(doc => {
            setUserData(doc.data());
        })
    }, [])

    return (
        <>
            {
                userData == null
                    ? <h2>Loading Please Wait.....</h2>
                    : <>
                        <div className='feedBody'>
                            <div className='bodyArea'>
                                <div className='naviBar' >
                                    <NaviBar />
                                </div>

                                <div className='feed'>
                                    <div className='feedLeftCompo'>
                                        <div className='leftFeedPic'>
                                            <img className='leftFeedimg' src={userData.ProfileUrl} onClick={()=>{setProfile(true)}} />
                                        </div>
                                        <h1 className='leftFeedUserName' onClick={()=>{setProfile(true)}}>{userData.Username}</h1>
                                        <div className='logoutBox'>
                                            Logout
                                        </div>
                                    </div>

                                    <div className='feedsArea'>
                                        <div className='uploadBtns'>
                                            {profile == true ? <ArrowBackRoundedIcon onClick={()=>{setProfile(false)}} className='backArrow'/> : <></>}
                                            <UploadImageFile userData={userData} />
                                            <UploadVideoFile userData={userData} />
                                        </div>
                                        {profile == true ? <Profile userData={userData}/> : <Post userData={userData} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default Feed
