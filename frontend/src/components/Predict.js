import React from "react";
import ImageUpload from "./ImageUpload";

function Predict()
{
    let [image, setImage] = React.useState(null)

    let [imageList, setImageList] = React.useState([])
    React.useEffect(() => {
        getImages()
    })


    async function getImages()
    {
        await fetch('/api/images/')
            .then(response => response.json())
            .then(imageList => setImageList(imageList))
            .catch(err => console.error(err))
    }

    async function displayImage(pk)
    {
        await fetch('/api/images/' + String(pk) + '/image')
            .then(response => response.json())
            .then(imageList => setImageList(imageList))
            .catch(err => console.error(err))
    }

    return (
        <div>
            <h4>Upload a radiograph X-ray image of lungs to detect COVID-19.</h4>
            <input type="file" />
            <img src='http://127.0.0.1:8000/api/images/5/image'/>
        </div>
    )
}

export default Predict;