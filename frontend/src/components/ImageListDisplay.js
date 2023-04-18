import React from 'react'
import ImageCard from './ImageCard'

function ImageListDisplay(props)
{
    const cardEntries = props.imageList.map(function(image) {
        return <ImageCard image={image} />
    })

    return (
        <div className='prediction-history'>
            {cardEntries}
        </div>
    )
}

export default ImageListDisplay;