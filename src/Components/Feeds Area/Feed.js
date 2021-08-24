import React, { useContext, useEffect, useState } from 'react'
import NaviBar from './NaviBar';
import Profile from '../Profile/Profile';
import UploadImageFile from '../Post/UploadImageFile';
import UploadVideoFile from '../Post/UploadVideoFile';
import Post from '../Post/Post';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import { AuthContext } from '../../Context/AuthProvider';
import { database, storage } from './../../firebase';
import LoadingIcon from '../Images/loading1.gif'
import CreateIcon from '@material-ui/icons/Create';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import '../Styles/Feed.css'

const useStyles = makeStyles((theme) => ({
    editIcon: {
        fontSize: '15px',
        margin: '0 5px'
    }
}))

function Feed() {
    const classes = useStyles();
    const [userData, setUserData] = useState(null);
    const [profile, setProfile] = useState(false);
    const [edit, setEdit] = useState(false);
    const { currentUser } = useContext(AuthContext);
    const [editBio, setEditBio] = useState('');
    const [editUsername, setEditUsername] = useState("");
    const { logout, deleteAccount } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const boxopen = Boolean(anchorEl);


    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseBox = () => {
        setAnchorEl(null);
    };

    const handleDeleteAcnt = async () => {
        let userDataCopy = userData
        // delete ->
        // 1. all post 
        // 2. comments on each post
        // 3. data of post from storage
        // 4. profile picture from storage
        // 5. user data from Users

        // getting all post
        userDataCopy.Posts.map(async el => {
            // inside post
            let post = await (await database.posts.doc(el).get()).data();


            // deleting comments
            post.Comment.map(async el => {
                await database.comments.doc(el).delete()
            })

            // postURL to storage
            let storageRef = storage.refFromURL(post.PostUrl)
            await storageRef.delete();

            // deleting the post
            database.posts.doc(el).delete()
        })

        // profile Url
        let storageRef = storage.refFromURL(userDataCopy.ProfileUrl)
        await storageRef.delete();

        // user data 
        database.users.doc(userDataCopy.Uid).delete();
        deleteAccount()


    }

    const handleSave = () => {
        database.users.doc(userData.Uid).update({
            Bio: editBio,
            Username: editUsername
        })
        userData.Posts.map(async el => {
            database.posts.doc(el).update({
                UserName: editUsername
            })

            let pData = await database.posts.doc(el).get();

            pData.data().Comment.map(ele => {
                database.comments.doc(ele).update({
                    UserName: editUsername
                })
            })

        })
    }

    useEffect(() => {
        const unsubs = database.users.doc(currentUser.uid).onSnapshot(doc => {
            setUserData(doc.data());
            return unsubs
        })
    }, [])

    useEffect(() => {
        if (userData != null) {
            setEditBio(userData.Bio);
            setEditUsername(userData.Username);
        }
    }, [userData])

    return (
        <>
            <div className='feedBody'>
                <div className='bodyArea'>
                    {
                        userData == null
                            ? <div className='feedLoading'>
                                <img src={LoadingIcon} />
                            </div>
                            : <>
                                <div className='naviBar' >
                                    <NaviBar userData={userData} />
                                </div>

                                <div className='feed'>
                                    <div className='feedLeftCompo'>
                                        <div className='pboxOption'>
                                            <IconButton
                                                aria-label="account of current user"
                                                aria-controls="menu-appbar"
                                                aria-haspopup="true"
                                                onClick={handleMenu}
                                                color="inherit"
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                id="menu-appbar"
                                                anchorEl={anchorEl}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={boxopen}
                                                onClose={handleCloseBox}
                                            >
                                                <MenuItem onClick={() => { logout() }}>Logout</MenuItem>
                                                <MenuItem onClick={handleDeleteAcnt}>Delete Account</MenuItem>
                                            </Menu>
                                        </div>

                                        {profile
                                            ? <>
                                                <div className='pbox1'>
                                                    <div className='pPageimgbox'>
                                                        <img src={userData.ProfileUrl} className='pPageimg'></img>
                                                    </div>
                                                </div>

                                                <div className='pbox2'>
                                                    <div className='pbox21' contentEditable={edit} suppressContentEditableWarning={true}
                                                        onBlur={(e) => { setEditUsername(e.target.innerText) }}
                                                    >
                                                        {edit
                                                            ? <CreateIcon className={classes.editIcon} />
                                                            : <></>
                                                        }
                                                        <h5 className='pbox211' >{userData.Username}</h5>
                                                    </div>
                                                    <div className='pbox22'>
                                                        <div className='editBtn' onClick={() => setEdit(!edit)}>Edit</div>
                                                    </div>
                                                    <div className='pbox23'>
                                                        <h5 className='pbox231'>{userData.Posts.length} Posts</h5>
                                                    </div>
                                                </div>

                                                <div className='pbox3'>
                                                    <div className='pbox31'>
                                                        <h5 className='pbox311' >{userData.Full_Name}</h5>
                                                    </div>
                                                    <div style={{ display: 'flex', height: '80%' }}>
                                                        {edit
                                                            ? <CreateIcon className={classes.editIcon} />
                                                            : <></>
                                                        }
                                                        <div className='pbox32' contentEditable={edit} suppressContentEditableWarning={true}
                                                            onBlur={(e) => { setEditBio(e.target.innerText) }}
                                                        >

                                                            {userData.Bio}
                                                        </div>
                                                    </div>
                                                </div>

                                                {edit
                                                    ?
                                                    <div className='pbox4'>
                                                        <div className='editBtn' onClick={(e) => { handleSave(e); setEdit(!edit) }}>Save</div>
                                                    </div>
                                                    :
                                                    <></>
                                                }
                                            </>

                                            : <>
                                                <div className='leftFeedPic'>
                                                    <img className='leftFeedimg' src={userData.ProfileUrl} onClick={() => { setProfile(true) }} />
                                                </div>
                                                <h4 className='leftFeedUserName' onClick={() => { setProfile(true) }}>{userData.Full_Name}</h4>
                                            </>
                                        }

                                        <div className="uploadBtns">
                                            <UploadImageFile userData={userData} />
                                            <UploadVideoFile userData={userData} />
                                        </div>

                                    </div>

                                    <div className='feedsArea'>
                                        <div className='backBtn'>
                                            {profile == true ? <ArrowBackRoundedIcon onClick={() => { setProfile(false) }} className='backArrow' /> : <></>}
                                        </div>

                                        {profile == true ? <Profile userData={userData} /> : <Post userData={userData} />}
                                    </div>
                                </div>
                            </>
                    }
                </div>
            </div>
        </>
    )
}

export default Feed