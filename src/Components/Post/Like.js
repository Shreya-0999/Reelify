import React, { useState, useEffect } from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { database } from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    like: {
        color: '#e74c3c',
        cursor: 'pointer'
    },
    unlike: {
        color: 'white',
        cursor: 'pointer'
    }
})

function Like({ userData = null, postData = null }) {
    console.log("Like start");
    const classes = useStyles();
    const [like, setLike] = useState(null);

    const handleLike = async () => {
        if (like == true) {
            let newLikeArr = postData.Likes.filter(el => {
                return el != userData.Uid;
            })
            await database.posts.doc(postData.PostId).update({
                Likes: newLikeArr
            })
        }
        else {
            let newLikeArr = [...postData.Likes, userData.Uid];
            await database.posts.doc(postData.PostId).update({
                Likes: newLikeArr
            })
        }
    }

    useEffect(() => {
        let check = postData?.Likes?.includes(userData?.Uid) ? true : false;
        console.log(check);
        setLike(check);
    }, [postData])

    return (
        <div className='like'>
            {
                like != null
                    ? <>{like == false
                        ? <><FavoriteIcon className={`${classes.unlike} icon-styling`} onClick={handleLike} /> </>
                        : <><FavoriteIcon className={`${classes.like} icon-styling`} onClick={handleLike} /></>
                    }</>
                    : <></>
            }
        </div>
    )
}

export default Like
