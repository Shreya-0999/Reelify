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
                    maxWidth: '100%',
                    borderRadius: "1rem",
                    // objectFit: 'fill'
                }}
            />
        </>
    )
}

export default Video
