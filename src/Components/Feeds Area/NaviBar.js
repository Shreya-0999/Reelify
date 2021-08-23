import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import '../Styles/NaviBar.css'
import logo from '../Images/logo.png'
import wordLogo from '../Images/word_logo.png'
import { AuthContext } from '../../Context/AuthProvider';
import { storage, database } from '../../firebase';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

function NaviBar({ userData }) {
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

                {(
                    <div className='side2'>
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
                )}
            </div>

        </>
    )
}

export default NaviBar
