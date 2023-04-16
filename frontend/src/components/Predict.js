import React from "react";
import ImageUpload from "./ImageUpload";
import ImageListDisplay from "./ImageListDisplay";

function Predict()
{
    let [uploadedImage, setUploadedImage] = React.useState(null)

    function handleChange(event)
    {
        setUploadedImage(function(uploadedImage) {
            const {name, value} = event.target

            return ({
                ...uploadedImage,
                [name]: value
            })
        })
    }

    async function createImage()
    {
        fetch(`/api/images/`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadedImage)
        })
    }

    return (
        <div>
            <h4>Upload a radiograph X-ray image of lungs to detect COVID-19.</h4>
            <ImageUpload/>
            <input type="file" onChange={handleChange}/>
            <p>hey {JSON.stringify(uploadedImage)}</p>
            <button onClick={createImage}>Predict</button>
            <h4>Prediction History</h4>
            <ImageListDisplay/>
        </div>
    )
}

export default Predict;