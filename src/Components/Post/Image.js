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
                            objectFit: 'fill'
                        }}
                    />
                    :
                    <img
                        className='img'
                        src={props.source}
                        style={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'fill'
                        }}
                    />
            }
        </>
    )
}

export default Image
