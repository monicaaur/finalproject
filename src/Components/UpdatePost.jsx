import React, { useState } from 'react';
import '../index.css';
import './UpdatePost.css';
import './UploadImg.css';
import { useParams } from "react-router-dom";
import Axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const UpdatePost = () => {
  const { postID } = useParams();

  const [uploadImage, setUploadImage] = useState('');
  const [image, setImage] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const [caption, setCaption] = useState('');

  const onImageUpload = (e) => {
    console.log(e.target.files[0]);
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
      console.log("image", response);
      setUploadImage(response.data.url);
      
      await Axios.post(`${import.meta.env.VITE_BASEURL}/api/v1/update-post/${postID}`, {
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
        alert('Update post success')
        window.location.assign('/myprofile');
      })
      .catch(error => {
        console.log(error);
      })
    })
    .catch(error => {
      console.log("Error: ", error);
      alert(`${error.data.message}`);
    })
  }

  return(
    <div className='update_post_wrapper'>
      <h2 className="update_post_text">Update Post</h2>
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

        <Button variant="link" type="submit" className="btn_update_post">
          Update Post
        </Button>
      </Form>
    </div>
  )
}

export default UpdatePost