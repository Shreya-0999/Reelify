import React, { useState, useEffect } from 'react'
import { database } from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Image from '../Post/Image';
import Video from '../Post/Video';
import Comments from '../Post/Comments';
import AddComments from '../Post/AddComments';
import Like from '../Post/Like';
import '../Styles/profile.css'

const useStyles = makeStyles((theme) => ({

}))

function Profile({ userData }) {
    console.log("Profile page");
    const classes = useStyles();
    const [openId, setOpenId] = useState(null);
    const [profPosts, setProfPost] = useState(null);
    const handleClickOpen = (id) => {
        setOpenId(id);
    };
    const handleClose = () => {
        setOpenId(null);
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
                profPosts == null ? <>Loading wait...................</> :
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
                                                                    <IconButton aria-label="settings">
                                                                        <MoreVertIcon />
                                                                    </IconButton>
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
