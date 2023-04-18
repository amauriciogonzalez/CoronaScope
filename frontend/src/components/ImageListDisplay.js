import React from 'react'
import ImageCard from './ImageCard'

function ImageListDisplay()
{
    let [imageList, setImageList] = React.useState([])

    React.useEffect(() => {
        getImages()
    }, [])

    async function getImages()
    {
        await fetch('/api/images/')
            .then(response => response.json())
            .then(imageList => setImageList(imageList))
            .catch(err => console.error(err))
    }

    const cardEntries = imageList.map(function(image) {
        return <ImageCard image={image} />
    })

    return (
        <div className='prediction-history'>
            {cardEntries}
        </div>
    )
}

export default ImageListDisplay;