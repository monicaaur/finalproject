import React, { useState } from 'react';
import '../../index.css';
import './CreatePost.css';
import '../UploadImg.css';
import Axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const CreatePost = () => {
  const [uploadImage, setUploadImage] = useState('');
  const [image, setImage] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const [caption, setCaption] = useState('');

  const onImageUpload = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  }

  const onCaptionPost = (e) => {
    setCaption(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgData = new FormData();
    imgData.append("image", image);

    await Axios.post(`${import.meta.env.VITE_BASEURL}/api/v1/upload-image`, imgData, {
      headers: {
        apiKey: `${import.meta.env.VITE_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(async (response) => {
      setUploadImage(response.data.url);
      
      await Axios.post(`${import.meta.env.VITE_BASEURL}/api/v1/create-post`, {
        imageUrl: response.data.url,
        caption: caption
      }, {
        headers: {
          apiKey: `${import.meta.env.VITE_APIKEY}`,
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
      .then(() => {
        setUploadImage('');
        setCaption('');
        alert('Create post success')
        window.location.reload();
      })
      .catch(error => {
        alert(`${error.data.message}`);
      })
    })
    .catch(error => {
      alert(`${error.data.message}`);
    })
  }

  return(
    <>
      <Form className="input_caption" onSubmit={handleSubmit}>
        <div className="pp_wrapper">
          <Form.Label htmlFor="profilePictureUrl">Upload Photo</Form.Label>

          <div className="upload_wrapper">
            <input
              className="form-control file-upload upload_style"
              type="file"
              onChange={onImageUpload}
              accept="image/*"
              />
          </div>

          {/* Image Upload Preview */}
          {imagePreview && <img className="preview" src={imagePreview} alt="preview" />}
        </div>

        <Form.Label htmlFor="caption" className='caption_title'>Caption</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          id="caption"
          name="caption"
          type="text"
          onChange={onCaptionPost}
          value={caption}
          placeholder="Write caption.."
        />

        <Button variant="link" type="submit" className="btn_post">
          Post
        </Button>
      </Form>
    </>
  )
}

export default CreatePost