import React from 'react';

function ImageCard(props)
{
    let domainName = 'http://127.0.0.1:8000'

    async function deleteImage()
    {
        fetch(domainName + '/api/images/' + props.image.id + '/delete', {
            method: 'DELETE',
            'headers': {
                'Content-Type': 'application/json'
            }
        })
    }

    return (
        <div>
            <img src={domainName + '/api/images/' + props.image.id + '/image'}/>
            <div>
                <span>Update</span>
                <span onClick={deleteImage}>Delete</span>
            </div>
        </div>
    )
}

export default ImageCard;