import React, { useState, useEffect } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import { database } from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Comments from './Comments';
import AddComments from './AddComments';
import Image from './Image';
import Video from './Video';
import Like from './Like';
import '../Styles/post.css'

const useStyles = makeStyles((theme)=>({
    chaticon: {
        color: 'white',
        cursor: 'pointer'
    },
    root: {
        width: '100%',
        padding: '0px'
    },
    typo: {
        marginLeft: '2%'
    },
    large: {
        width: theme.spacing(5),
        height: theme.spacing(5),
        margin:'8px'
      }
}))


function Post({ userData=null }) {
    console.log("Post started ");
    const [posts, setPost] = useState(null);
    const classes = useStyles();
    const [openId, setOpenId] = useState(null);

    const handleClickOpen = (id) => {
        setOpenId(id);
    };
    const handleClose = () => {
        setOpenId(null);
    };

    const callbacks = enteries => {
        enteries.forEach(element => {
            // console.log("enteries", element);
            let el = element.target.childNodes[1].childNodes[0];
            el.play().then(() => {
                console.log("play");
                if (!el.paused && !element.isIntersecting) {
                    el.pause();
                }
            })
        })
    }
    const observer = new IntersectionObserver(callbacks, { threshold: 0.8 });   // chnage

    useEffect(() => {
        console.log("Post use effect 1");
        let postArr = [];
        let unsbs = database.posts.orderBy('CreatedAt', 'desc').onSnapshot(allPostSnap => {
            postArr = [];
            allPostSnap.forEach(doc => {
                // console.log("Postssssssss",doc.data());
                let obj = { ...doc.data(), PostId: doc.id };
                postArr.push(obj);
            })
            setPost(postArr);
        })
        return unsbs;
    }, [])

    useEffect(() => {
        console.log("Observer use effect");
        let videos = document.querySelectorAll(".video");
        videos.forEach(el => {
            console.log("el=>", el);
            observer.observe(el);
        })
    }, [posts]);

    return (
        <>
            {
                posts == null ? <>Loading wait...................</> :
                    < div className='postContainer' >
                        {posts.map((post, index) => (
                            <React.Fragment key={index}>
                                <div className={`post ${post.Type}`}>
                                    <div className='postHeader'>
                                        <Avatar className={classes.large} alt="profile image" src={post.UserProfile}></Avatar>
                                        <h4 className='uname'>{post.UserName} </h4>
                                    </div>

                                    <div className='postMedia'>
                                        {post.Type == 'image' ? <Image source={post.PostUrl} /> : <Video source={post.PostUrl} />}
                                    </div>

                                    <div className='postDetails'>
                                        <Like userData={userData} postData={post} />
                                        <ChatBubbleOutlineIcon className={`${classes.ci} ${classes.chaticon} icon-styling`} onClick={() => handleClickOpen(post.PostId)} />
                                        <Dialog maxWidth="md" onClose={handleClose} aria-labelledby="customized-dialog-title" open={openId == post.PostId}>
                                            <MuiDialogTitle>
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
                                                                    <IconButton aria-label="settings">
                                                                        <MoreVertIcon />
                                                                    </IconButton>
                                                                }
                                                                title={post?.UserName}

                                                            />

                                                            <hr style={{ border: "none", height: "1px", color: "#dfe6e9", backgroundColor: "#dfe6e9" }} />
                                                            <CardContent className={classes.seeComments}>

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
                                </div>
                            </React.Fragment>
                        ))}
                    </div >
            }
        </>
    )
}

export default Post
