import React, { useState } from 'react'
import '../Styles/addcomments.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { database } from '../../firebase';

const useStyles = makeStyles({
    cbtn: {
        marginRight: '1%',
        marginTop: '4%'
    }
});

function AddComments({ userData = null, postData = null }) {
    const classes = useStyles();
    const [text, setText] = useState('');

    const manageText = e => {
        let comment = e.target.value;
        setText(comment);
    }
    console.log("---------------", postData);

    const handleOnEnter = () => {
        let obj = {
            UserName: userData.UserName,
            Text: text,
            ProfilePic: userData.ProfileUrl
        }
        database.comments.add(obj).then(docRef => {
            database.posts.doc(postData.PostId).update({
                Comment: [...postData.Comment, docRef.id]
            })
        }).catch(e => {
            console.log(e);
        })
        setText('');
    }

    return (
        // emoji npm
        <div className='commentField'>
            <TextField fullWidth={true} value={text} label='Add a Comment' onChange={manageText} />
            <Button onClick={handleOnEnter} disabled={text == '' ? true : false} className={classes.cbtn} color='primary'>Post</Button>
        </div>
    )
}

export default AddComments
