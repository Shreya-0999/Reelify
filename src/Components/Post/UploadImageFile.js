import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid'
import CircularProgress from '@material-ui/core/CircularProgress';
import { database, storage } from '../../firebase';

const useStyles = makeStyles((theme) => ({
    imageBtn: {
        height: '100%',
        width: "100%",
        // fontSize: 18,
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

function UploadImageFile(props) {
    console.log("Upload Image starts");
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const types = ["image/jpg", "image/jpeg", "image/png"];

    const handleImageFile = (e) => {
        console.log("Upload Image Starts ");
        const file = e?.target?.files[0];

        if (!file) {
            setError("Please select a file.");
            console.log("Please select a file.");
            setTimeout(() => {
                setError(null)
            }, 2000)
            return
        }

        if (types.indexOf(file.type) == -1) {
            setError("Please select a file.");
            console.log("Please select a image file.");
            setTimeout(() => {
                setError(null)
            }, 2000)
            return
        }
        // minimum file size ?

        try {
            setLoading(true);
            const id = uuidv4();
            const uploadImageTask = storage.ref(`/posts/${props.userData.Uid}/images/${file.name}`).put(file);
            uploadImageTask.on("state changed", fn1, fn2, fn3);

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
                console.log("Uploading image ");
                const imageURL = await uploadImageTask.snapshot.ref.getDownloadURL();
                const docRef = await database.posts.add({
                    PostId: id,
                    PostUrl: imageURL,
                    Type: "image",
                    UserId: props.userData.Uid,
                    UserName: props.userData.Username,
                    UserProfile: props.userData.ProfileUrl,
                    Comment: [],
                    Likes: [],
                    CreatedAt: database.getCurrentTimeStamp()
                })
                const res = database.users.doc(props.userData.Uid).update({
                    Posts: [...props.userData.Posts, docRef.id]
                })
                console.log("result", res);
                console.log("DocRef", docRef);

                setLoading(false);
            }
        }
        catch (e) {
            setError(e);
            setTimeout(() => {
                setError(null)
            }, 2000);
            setLoading(false);
        }

    }

    return (
        <>
            {loading ? <CircularProgress className={classes.progress} /> : <></>}
            <div className='upload' style={{ width: '50%' }}>
                {error != null ? <Alert severity="error" className={classes.alertBox}>{error}</Alert> : <>
                    <input
                        // className={classes.input}
                        style={{ display: 'none' }}
                        id="contained-button-file"
                        type="file"
                        onChange={handleImageFile}
                    />
                    <label htmlFor="contained-button-file">
                        <Button
                            className={classes.imageBtn}
                            // variant="contained"
                            // color="secondary"
                            component="span"
                            size='medium'
                            disabled={loading}
                            endIcon={<ImageRoundedIcon style={{ fontSize: 30, color: 'whitesmoke' }} />}
                        >
                        </Button>
                    </label>
                </>
                }
            </div>
        </>

    )
}

export default UploadImageFile
