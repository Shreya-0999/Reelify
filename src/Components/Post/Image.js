import React from 'react'

function Image(props) {
    return (
        <>
            {
                props.prof ?
                    <img
                        src={props.source}
                        style={{
                            height: '100%',
                            width: '100%',
                            borderRadius: "16px",
                            objectFit: 'cover'
                        }}
                    />
                    :
                    <img
                        src={props.source}
                        style={{
                            maxHeight: '100%',
                            maxWidth: '100%',
                        }}
                    />
            }
        </>
    )
}

export default Image
