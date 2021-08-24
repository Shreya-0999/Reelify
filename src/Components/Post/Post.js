import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { database } from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Comments from './Comments';
import AddComments from './AddComments';
import LoadingIcon from '../Images/loading1.gif'
import Image from './Image';
import Video from './Video';
import Like from './Like';
import '../Styles/post.css'


const useStyles = makeStyles((theme) => ({
    chatBubble: {
        color: '#3f3f41',
        cursor: 'pointer',
        fontSize: '32px',
    },
    typo: {
        marginLeft: '2%',
        marginTop: "0",
        display: 'flex'
    },
    large: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        margin: '8px',
        boxShadow: '0 3px 9px rgba(65, 64, 64, 0.2), 0 8px 15px rgba(0,0,0,.2)'
    },
    postDialogBox: {
        background: "rgba(222, 215, 240, 0.486)",
    },
    dialogHeader: {
        height: "11%",
    },
    dialogComments: {
        height: "67%",
        fontFamily: "'Nunito', sans-serif",
        overflow:'auto'
    },


}))


function Post({ userData = null }) {
    const [posts, setPost] = useState(null);
    const classes = useStyles();
    const [openId, setOpenId] = useState(null);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseA = () => {
        setAnchorEl(null);
    };

    const handleClickOpen = (id) => {
        setOpenId(id);
    };

    const handleClose = () => {
        setOpenId(null);
    };

    const callbacks = enteries => {
        enteries.forEach(element => {
            let el = element.target.childNodes[0];
            el.play().then(() => {
                if (!el.paused && !element.isIntersecting) {
                    el.pause();
                }
            })
        })
    }
    const observer = new IntersectionObserver(callbacks, { threshold: 0.95 }); 

    useEffect(() => {
        let postArr = [];
        let unsbs = database.posts.orderBy('CreatedAt', 'desc').onSnapshot(allPostSnap => {
            postArr = [];
            allPostSnap.forEach(doc => {
                let obj = { ...doc.data(), PostId: doc.id };
                postArr.push(obj);
            })
            setPost(postArr);
        })
        return unsbs;
    }, [])

    useEffect(() => {
        let videos = document.querySelectorAll(".video .postMedia");
        videos.forEach(el => {
            observer.observe(el);
        })
        return () => {
            observer.disconnect();
        }
    }, [posts]);

    return (
        <>
            {
                posts == null ?
                    <div className='feedLoading'>
                        <img src={LoadingIcon} />
                    </div> :
                    < div className='postContainer' >
                        {posts.map((post, index) => (
                            <React.Fragment key={index}>
                                <div className={`post ${post.Type}`}>
                                    <div className='postHeader'>
                                        <Avatar className={classes.large} alt="profile image" src={post.UserProfile} ></Avatar>
                                        <h4 className='uname'>{post.UserName} </h4>
                                    </div>

                                    <div className='postMedia' >
                                        {post.Type == 'image' ? <Image source={post.PostUrl} /> : <Video source={post.PostUrl} />}
                                    </div>

                                    <div className='postDetails'>
                                        <div className='postFunc'>
                                            <Like userData={userData} postData={post} className={`${classes.postLike} iconStyling`} />
                                            <ChatBubbleOutlineIcon className={`${classes.chatBubble} iconStyling`} onClick={() => handleClickOpen(post.PostId)} />
                                        </div>
                                        <div className='postAddComment'>
                                            <AddComments userData={userData} postData={post} />
                                        </div>
                                        <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={openId == post.PostId}>
                                            <MuiDialogTitle className={classes.postDialogBox} elevation={0}>
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
                                                        <CardHeader
                                                            avatar={
                                                                <Avatar src={post?.UserProfile} aria-label="recipe" className={classes.avatar}>
                                                                </Avatar>
                                                            }
                                                            title={post?.UserName}
                                                            className={classes.dialogHeader}
                                                        />

                                                        <hr style={{ border: "none", height: "1px", color: "#dfe6e9", backgroundColor: "#dfe6e9" }} />
                                                        <CardContent className={classes.dialogComments}>
                                                            <Comments userData={userData} postData={post} />
                                                        </CardContent>

                                                        <div className='extra'>
                                                            <div className='likes'>
                                                                <Like userData={userData} postData={post} />
                                                                <Typography className={classes.typo} variant='body2'>{post.Likes.length} Likes</Typography>
                                                            </div>
                                                            <div className='profileCommentBox'>
                                                                <AddComments userData={userData} postData={post} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </MuiDialogTitle>
                                        </Dialog>
                                    </div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div >
            }
        </>
    )
}

export default Post
