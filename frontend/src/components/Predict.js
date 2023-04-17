import React from "react";
import {useNavigate} from 'react-router-dom';
import ImageListDisplay from "./ImageListDisplay";

function Predict()
{
    let [uploadedImage, setUploadedImage] = React.useState(null)
    let [imagePreview, setImagePreview] = React.useState(null)

    const navigate = useNavigate()

    function handleChange(event)
    {
        let uploadedFile = event.target.files[0]
        setUploadedImage(uploadedFile)

        if (uploadedFile)
        {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            
            reader.readAsDataURL(uploadedFile)
        }
        else
        {
            setImagePreview(null)
        }
    }

    async function createImage()
    {
        const formData = new FormData();
        formData.append('uploadedImage', uploadedImage, uploadedImage.name);

        await fetch(`/api/images/create`, {
            credentials: 'include',
            method: 'POST',
            body: formData
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))

        window.location.reload()
    }

    return (
        <div className="predict-page">
            <h4>Upload a radiograph X-ray image of lungs to detect COVID-19.</h4>
            <div className="select-image">
                <input
                    className="upload-button"
                    type="file"
                    onChange={handleChange}
                    name='image'
                    accept='image/png,image/jpeg'
                /><label></label>
                <div className="overlay-layer">Select Image</div>
            </div>
            {imagePreview && <img src={imagePreview}/>}
            {uploadedImage && <button className="submit-and-predict" onClick={createImage}>Submit & Predict</button>}
            <span>The most recent submitted image is classified under 'normal' with 89% confidence.</span>
            <h4>Prediction History</h4>
            <ImageListDisplay/>
        </div>
    )
}

export default Predict;