import React, { useState, useEffect } from 'react'
import { database } from '../../firebase'
import '../Styles/comments.css'
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles({
    da: {
        marginRight: '2%',
        marginTop: '2%'
    }
});

function Comments({ userData = null, postData = null }) {
    const classes = useStyles();
    const [comments, setComments] = useState(null);

    useEffect(async () => {
        let com = [];
        for (let i = 0; i < postData.Comment.length; i++) {
            let commentId = postData.Comment[i];
            let data = await database.comments.doc(commentId).get();
            com.push(data.data());
        }
        setComments(com);

        // won't render when the comments are deleted hence no error
        return () => { setComments('') }
    }, [postData])

    return (
        <>
            {
                comments == null
                    ? <CircularProgress />
                    :
                    comments.map((comment, index) => (
                        <div key={index} className='comment-div'>
                            <div className='com1'>
                                <Avatar src={comment.ProfilePic} className={classes.da} />
                                <div className='commentUser'>{comment.UserName} :</div>
                            </div>
                            <div className='commentText'>{comment.Text}</div>
                        </div>
                    ))

            }
        </>
    )
}

export default Comments
