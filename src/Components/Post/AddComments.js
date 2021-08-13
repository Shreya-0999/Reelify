import React, { useState } from 'react'
import '../Styles/addcomments.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InsertEmoticonRoundedIcon from '@material-ui/icons/InsertEmoticonRounded';
import Button from '@material-ui/core/Button';
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import { database } from '../../firebase';

const useStyles = makeStyles({
    cbtn: {
        marginRight: '1%',
        marginTop: '4%'
    },
    emoticons: {
        fontSize: '35px'
    }
});

function AddComments({ userData = null, postData = null }) {
    console.log("AddComments start");
    const classes = useStyles();
    const [text, setText] = useState('');
    const [emoji, setEmoji] = useState(false);

    const manageText = e => {
        let comment = e.target.value;
        setText(comment);
    }

    const handleOnEnter = () => {
        let obj = {
            UserName: userData.Username,
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

    const handleEmoji = () => {
        let val = !emoji;
        setEmoji(val);
    }

    const addEmoji = e => {
        let emoji = e.native;
        let commentText = text + emoji;
        setText(commentText);
    };

    return (
        // emoji npm
        <div className='commentField'>
            <div className='emojis' onClick={handleEmoji}>
                <InsertEmoticonRoundedIcon className={classes.emoticons} />
                {emoji
                    ? <span className='emojiBox'>
                        <Picker onSelect={addEmoji} />
                    </span>
                    : <></>
                }
            </div>
            <TextField fullWidth={true} value={text} label='Add a Comment' onChange={manageText} />

            <Button onClick={handleOnEnter} disabled={text == '' ? true : false} className={classes.cbtn} color='primary'>Post</Button>
        </div>
    )
}

export default React.memo(AddComments)
