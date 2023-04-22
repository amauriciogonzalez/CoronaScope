import React from "react";
import ImageListDisplay from "./ImageListDisplay";

function Predict()
{
    let [uploadedImage, setUploadedImage] = React.useState(null)
    let [imagePreview, setImagePreview] = React.useState(null)
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

        window.location.reload(false)
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
            {imagePreview && <img className="image-preview" src={imagePreview} alt='uploadedImage'/>}
            {uploadedImage && <button className="submit-and-predict" onClick={createImage}>Submit & Predict</button>}
            {imageList && <>
                <h5>The most recent submitted image is classified under 'normal' with 89% confidence.</h5>
                <h4>Prediction History</h4>
                <ImageListDisplay imageList={imageList}/>
            </>}
        </div>
    )
}

export default Predict;