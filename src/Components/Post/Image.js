import React from 'react'

function Image(props) {
    return (
        <>
            <img 
                src={props.source}
                style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    borderRadius: "1rem"
                    // objectFit: 'cover'
                }}
            />
        </>
    )
}

export default Image
