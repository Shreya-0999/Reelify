import React, { useState, useEffect } from 'react'
import Avatar from '@material-ui/core/Avatar';
import { database } from '../../firebase';
import Image from './Image';
import Video from './Video';
import Like from './Like';
import '../Styles/post.css'

function Post({ userData }) {
    console.log("Post started ");
    const [posts, setPost] = useState(null);

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

    return (
        <>
            {
                posts == null ? <>Loading wait...................</> :
                    < div className='postContainer' >
                        {posts.map((post, index) => (
                            <React.Fragment key={index}>
                                <div className="post">
                                    <div className='postHeader'>
                                        <Avatar alt="profile image" src={post.UserProfile}></Avatar>
                                        <h4 className='uname'>{post.UserName} </h4>
                                    </div>
                                    
                                    <div className='postMedia'>
                                        {post.Type == 'image' ? <Image source={post.PostUrl} /> : <Video source={post.PostUrl} />}
                                    </div>
                                    
                                    <div className='postDetails'>
                                        <Like userData={userData} postData={post} />
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
