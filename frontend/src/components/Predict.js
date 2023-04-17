import React from "react";
import ImageUpload from "./ImageUpload";
import ImageListDisplay from "./ImageListDisplay";

function Predict()
{
    let [uploadedImage, setUploadedImage] = React.useState(null)

    function handleChange(event)
    {
        setUploadedImage(function(uploadedImage) {
            return event.target.files[0]
        })
    }

    async function createImage()
    {
        const formData = new FormData();
        formData.append('uploadedImage', uploadedImage);

        fetch(`/api/images/create`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //'X-CSRFToken': getCookie('csrftoken'),
            },
            body: formData
        })
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }

    function getCookie(name) {
        const cookieValue = document.cookie
          .split(';')
          .map(cookie => cookie.trim())
          .find(cookie => cookie.startsWith(name + '='));
        if (cookieValue) {
          return cookieValue.split('=')[1];
        } else {
          return null;
        }
      }

    return (
        <div>
            <h4>Upload a radiograph X-ray image of lungs to detect COVID-19.</h4>
            <ImageUpload/>
            <input type="file" onChange={handleChange} name='image'/>
            <p>hey {JSON.stringify(uploadedImage)}</p>
            <button onClick={createImage}>Predict</button>
            <h4>Prediction History</h4>
            <ImageListDisplay/>
        </div>
    )
}

export default Predict;