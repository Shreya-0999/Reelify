import React from 'react'

function Image(props) {
    return (
        <>
            {
                props.prof ?
                    <img
                        className='img'
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
                        className='img'
                        src={props.source}
                        style={{
                            // maxHeight: '100%',
                            // maxWidth: '100%',
                            height: '100%',
                            width: '100%',
                            // borderRadius: "16px",
                            objectFit: 'cover'
                        }}
                    />
            }
        </>
    )
}

export default Image
