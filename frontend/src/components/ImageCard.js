import React from 'react';

function ImageCard(props)
{
    let domainName = 'http://127.0.0.1:8000'

    async function handleChange(event)
    {
        let uploadedFile = event.target.files[0]
        /* We use 'await' here because otherwise, handleChange function sets the updatedImage state using setUpdatedImage(uploadedFile) before calling the updateImage function, but the updateImage function is called asynchronously and may not have completed before the handleChange function finishes executing. */
        await updateImage(uploadedFile)
    }

    async function updateImage(uploadedFile)
    {
        const formData = new FormData();
        formData.append('updatedImage', uploadedFile, uploadedFile.name);

        await fetch('/api/images/' + props.image.id + '/update', {
            credentials: 'include',
            method: 'PUT',
            body: formData
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))

        window.location.reload(false)
    }

    async function deleteImage()
    {
        await fetch(domainName + '/api/images/' + props.image.id + '/delete', {
            method: 'DELETE',
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))

        window.location.reload(false)
    }

    return (
        <div className='image-card'>
            <img src={domainName + '/api/images/' + props.image.id + '/image'} alt={props.image.id}/>
            <div>
                <div className="update-image">
                    <input
                        className="update-button"
                        type="file"
                        onChange={handleChange}
                        name='image'
                        accept='image/png,image/jpeg'
                    /><label></label>
                    <div className="update-overlay">Update</div>
                </div>
                <span onClick={deleteImage}>Delete</span>
            </div>
        </div>
    )
}

export default ImageCard;