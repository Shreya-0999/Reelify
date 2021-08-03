import React from 'react'

function Video(props) {
    const handleMute = (e)=>{
        e.preventDefault();
        e.target.muted = !e.target.muted;
    }
    return (
        <>
            <video 
                src={props.source}
                onClick={handleMute}
                muted = 'muted'
                type='video/mp4'
                autoPlay
                loop
                style={{
                    maxHeight: '100%',
                    maxWidth: '100%'
                }}
            />
        </>
    )
}

export default Video
