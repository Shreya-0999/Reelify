import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { database, storage } from '../../firebase';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { v4 as uuidv4 } from 'uuid'

const useStyles = makeStyles((theme) => ({
    videoBtn: {
        height: '100%',
        width: '100%',
        fontFamily: `'Nunito', sans-serif`,
        fontWeight: 100,
    },
    progress: {
        position: 'absolute',
        bottom: '60px'
    },
    alertBox:{
        position:'absolute',
        bottom: '60px',
    }

}));

function UploadVideoFile(props) {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const type = ['video/mp4', 'video/webm', 'video/ogg']

    const handleVideoFile = (e) => {
        const file = e?.target?.files[0];

        if (!file) {
            setError("Please select a file.");
            setTimeout(() => {
                setError(null)
            }, 2000)
            return
        }

        if (type.indexOf(file.type) == -1) {
            setError("Please select a video file.");
            setTimeout(() => {
                setError(null)
            }, 2000)
            return
        }

        if (file.size / (1024 * 1024) > 100) {
            setError("The file size is too big to upload");
            setTimeout(() => {
                setError(null);
            }, 2000)
            return
        }

        try {
            setLoading(true);
            const id = uuidv4();
            const uploadVideoTask = storage.ref(`/posts/${props.userData.Uid}/videos/${file.name}`).put(file);
            uploadVideoTask.on("state changed", fn1, fn2, fn3);

            function fn1(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');  // tell us the percent of work completed
            }

            function fn2(error) {
                setError(error);
                setTimeout(() => {
                    setError(null)
                }, 2000);
                setLoading(false)
            }

            async function fn3() {
                const videoURL = await uploadVideoTask.snapshot.ref.getDownloadURL();
                const docRef = await database.posts.add({    
                    PostId: id,
                    PostUrl: videoURL,
                    Type: "video",
                    UserId: props.userData.Uid,
                    UserName: props.userData.Username,
                    UserProfile: props.userData.ProfileUrl,
                    Comment: [],
                    Likes: [],
                    CreatedAt: database.getCurrentTimeStamp()
                })
                const res = await database.users.doc(props.userData.Uid).update({
                    Posts: [...props.userData.Posts, docRef.id]
                })

                setLoading(false);
            }

        }
        catch (e) {
            setError(e);
            setTimeout(() => {
                setError(null);
            }, 2000);
            setLoading(false);
        }
    }

    return (
        <>
            {loading ? <CircularProgress className={classes.progress} /> : <></>}
            <div className='upload' style={{width:'50%'}}>
                {error != null ? <Alert severity="error" className={classes.alertBox}>{error}</Alert> : <>
                    <input
                        style={{ display: 'none' }}
                        id="icon-button-file"
                        type="file"
                        onChange={handleVideoFile}
                    />
                    <label htmlFor="icon-button-file" style={{width:'100%'}}>
                        <Button
                            className={classes.videoBtn}
                            component="span"
                            size='medium'
                            disabled={loading}
                            startIcon={<VideocamRoundedIcon style={{ fontSize: 35, color: 'whitesmoke' }} />}
                        >
                        </Button>
                    </label>
                </>
                }
            </div>
        </>

    )
}

export default UploadVideoFile
