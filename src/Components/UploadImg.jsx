import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Axios from "axios";
import '../index.css';
import "./UploadImg.css"

const UploadImg = ({ onChange, title }) => {
  const [image, setImage] = useState("")
  const [imagePreview, setImagePreview] = useState(null)

  const onImageUpload = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]))
  }

  const onImageSubmit = async () => {
    const imgData = new FormData();
    imgData.append("image", image);

    await Axios.post(`${import.meta.env.VITE_BASEURL}/api/v1/upload-image`, imgData, {
      headers: {
        apiKey: `${import.meta.env.VITE_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      console.log(response);
      onChange(response.data.url);
      alert(`${response.data.message}`)
    })
    .catch((error) => {
      console.log("Error: ", error);
      alert(`${error.data.message}`);
    })
  }

  return(
    <>
      <div className="pp_wrapper">
        <Form.Label htmlFor="profilePictureUrl">{title}</Form.Label>

        <div className="upload_wrapper">
          <input
            className="form-control file-upload upload_style"
            type="file"
            onChange={onImageUpload}
            accept="image/*"
            />

          <Button 
            type="submit"
            variant="success"
            className='btn_upload'
            onClick={onImageSubmit}
            encType="multipart/form-data"
            >
            Upload
          </Button>
        </div>

        {/* Image Upload Preview */}
        {imagePreview && <img className="preview" src={imagePreview} alt="preview" />}
      </div>
    </>
  )
}

export default UploadImg