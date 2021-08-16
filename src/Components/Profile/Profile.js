import React, { useState, useEffect } from 'react'
import { database, storage } from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Image from '../Post/Image';
import Video from '../Post/Video';
import Comments from '../Post/Comments';
import AddComments from '../Post/AddComments';
import LoadingIcon from '../Images/loading1.gif'
import Like from '../Post/Like';
import '../Styles/profile.css'

const useStyles = makeStyles((theme) => ({
    chatBubble: {
        color: '#3f3f41',
        cursor: 'pointer',
        fontSize: '32px'
    },
    typo: {
        marginLeft: '2%',
        marginTop: "0",
    },
    large: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        margin: '8px',
        boxShadow: '0 3px 9px rgba(65, 64, 64, 0.2), 0 8px 15px rgba(0,0,0,.2)'
    },
    postDialogBox: {
        background: "rgba(222, 215, 240, 0.486)",
        boxShadow: " 0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(6.7px)",
        border: "2px solid rgba(216, 218, 219, 0.877)",
        WebkitBackdropFilter: "blur(6.7px)"
    },
    dialogHeader: {
        height: "8vh"
    },
    dialogComments: {
        height: "55vh",
        fontFamily: "'Nunito', sans-serif",
    },
}))

function Profile({ userData }) {
    console.log("Profile page");
    const classes = useStyles();
    const [openId, setOpenId] = useState(null);
    const [profPosts, setProfPost] = useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClickOpen = (id) => {
        setOpenId(id);
    };
    const handleClose = () => {
        setOpenId(null);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleDeleteClose = (post) => {
        if (post.UserId == userData.Uid) {
            // delete post comments, update userdata
            const obj = userData.Posts.filter((el) => {
                return el != post.PostId
            })

            // update user
            console.log(obj);
            database.users.doc(userData.Uid).update({
                Posts: obj
            })

            // comment
            post.Comment.map(async (el) => {
                await database.comments.doc(el).delete();
            })


            let storageRef = storage.refFromURL(post.PostUrl)
            console.log(storageRef.name);

            storageRef.delete().then(() => {
                console.log("Succesfully Deleted");
            }).catch((error) => {
                // error
            });

            // post
            database.posts.doc(post.PostId).delete().then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
        else {
            // error msg
            alert("Please delete your own post")
        }
        setAnchorEl(null);
    }
    const handleCloseA = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        console.log("Profile use effect 1");
        let postArr = [];
        let unsbs = database.posts.orderBy('CreatedAt', 'desc').onSnapshot(allPostSnap => {
            postArr = [];
            allPostSnap.forEach(doc => {
                // console.log(doc.data().UserId);
                if (doc.data().UserId == userData.Uid) {
                    let obj = { ...doc.data(), PostId: doc.id };
                    postArr.push(obj);
                }
            })
            setProfPost(postArr);
        })
        return unsbs;
    }, [])

    return (
        <>
            {
                profPosts == null ?
                    <div className='feedLoading'>
                        <img src={LoadingIcon} />
                    </div>
                    :
                    <div className='profilePostContainer'>
                        {
                            profPosts.map((post, index) => (
                                <React.Fragment key={index}>
                                    <div className={`profilePost ${post.Type}`}>
                                        <div className='profilePostMedia' onClick={() => handleClickOpen(post.PostId)}>
                                            {post.Type == 'image' ? <Image source={post.PostUrl} prof={true} /> : <Video source={post.PostUrl} prof={true} />}
                                        </div>
                                        <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={openId == post.PostId}>
                                            <MuiDialogTitle className={classes.postDialogBox}>
                                                <div className='dialogContainer'>
                                                    <div className='media-part'>
                                                        {post.Type == 'image'
                                                            ? <>
                                                                <img src={post.PostUrl} loading='eager' className='dialogVideo'></img>
                                                            </>
                                                            : <>
                                                                <video autoPlay={true} className='dialogVideo' controls id={post.PostId} muted="muted" type="video/mp4" loop >
                                                                    <source src={post.PostUrl} type="video/webm" />
                                                                </video>
                                                            </>
                                                        }
                                                    </div>
                                                    <div className='info-part'>
                                                        <Card>
                                                            <CardHeader
                                                                avatar={
                                                                    <Avatar src={post?.UserProfile} aria-label="recipe" className={classes.avatar}>
                                                                    </Avatar>
                                                                }
                                                                action={
                                                                    <div className='optionBox'>
                                                                        <IconButton
                                                                            aria-label="more"
                                                                            aria-controls="long-menu"
                                                                            aria-haspopup="true"
                                                                            onClick={handleMenu}
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
                                                                            open={open}
                                                                            onClose={handleCloseA}
                                                                        >
                                                                            <MenuItem onClick={() => { handleDeleteClose(post) }}>Delete</MenuItem>
                                                                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                                        </Menu>
                                                                    </div>
                                                                }
                                                                title={post?.UserName}
                                                                className={classes.dialogHeader}

                                                            />

                                                            <hr style={{ border: "none", height: "1px", color: "#dfe6e9", backgroundColor: "#dfe6e9" }} />
                                                            <CardContent className={classes.dialogComments}>

                                                                <Comments userData={userData} postData={post} />
                                                            </CardContent>

                                                        </Card>
                                                        <div className='extra'>
                                                            <div className='likes'>
                                                                <Like userData={userData} postData={post} />
                                                                <Typography className={classes.typo} variant='body2'>Liked By {post.Likes.length == 0 ? 'nobody' : ` others`}</Typography>
                                                            </div>
                                                            <AddComments userData={userData} postData={post} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </MuiDialogTitle>
                                        </Dialog>

                                    </div>
                                </React.Fragment>

                            ))
                        }
                    </div>
            }
        </>
    )
}

export default Profile
