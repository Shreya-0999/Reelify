import React from 'react'
import Button from '@material-ui/core/Button';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import { makeStyles } from '@material-ui/core/styles';
import './styles/uploadBtn.css'

const useStyles = makeStyles((theme) => ({
    uploadBtn: {
        height: '100%',
        width: 150
    }

}));

function UploadImageFile() {
    const classes = useStyles();
    return (
        <>
            <div className='upload'>
                <input
                    // className={classes.input}
                    style={{ display: 'none' }}
                    id="contained-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="contained-button-file">
                    <Button
                        className ={classes.uploadBtn}
                        variant="contained"
                        color="secondary"
                        component="span"
                        size='medium'
                        style={{ fontSize: 18 }}
                        startIcon = {<ImageRoundedIcon style={{ fontSize: 30 }} />}
                    >
                        Image
                    </Button>
                </label>
            </div>
        </>

    )
}

export default UploadImageFile
