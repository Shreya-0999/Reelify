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
        console.log("Comment Display Use Effect");
        let com = [];
        for (let i = 0; i < postData.Comment.length; i++) {
            let commentId = postData.Comment[i];
            let data = await database.comments.doc(commentId).get();
            com.push(data.data());
        }
        setComments(com);
    }, [postData])
    
    return (
        <>
            {
                comments == null
                    ? <CircularProgress/>
                    :
                    comments.map((comment, index) => (
                        <div key={index} className='comment-div'>
                            <Avatar src={comment.ProfilePic} className={classes.da} />
                            <p><span style={{ fontWeight: 'bold', display: 'inline-block' }}>{comment.UserName}</span>&nbsp; &nbsp; {comment.Text}</p>    {/* nbsp for sppace */}
                        </div>
                    ))

            }
        </>
    )
}

export default Comments
