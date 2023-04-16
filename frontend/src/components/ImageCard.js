import React from 'react';

function ImageCard(props)
{
    let domainName = 'http://127.0.0.1:8000'

    return (
        <div>
            <img src={domainName + '/api/images/' + props.image.id + '/image'}/>
            <div>
                <span>Update</span>
                <span>Delete</span>
            </div>
        </div>
    )
}

export default ImageCard;