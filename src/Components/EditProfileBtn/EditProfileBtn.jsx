import React, { useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import Axios from 'axios';
import '../../index.css';
import './EditProfileBtn.css';
import '../UploadImg.css';

const EditProfileBtn = ({...userData}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [uploadImage, setUploadImage] = useState("");

  const [image, setImage] = useState("")
  const [imagePreview, setImagePreview] = useState(null)

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");

  const onImageUpload = (e) => {
    setImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  }

  const updateProfile = async (e) => {
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

      await Axios.post(`${import.meta.env.VITE_BASEURL}/api/v1/update-profile`, {
        name: name,
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        bio: bio,
        website: website,
        profilePictureUrl: response.data.url
      }, {
        headers: {
          apiKey: `${import.meta.env.VITE_APIKEY}`,
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
      .then(() => {
        alert('Update profile success')
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  return(
    <>
      <div className="button_wrap">
        <Button type="submit" variant="link" className='edit_profile_btn the_button' style={{ width: '100%' }} onClick={() => handleShow()}>Edit Profile</Button>
      </div>

      <Modal show={show} onHide={handleClose} size='lg' aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton className='header_style'>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="edit_profile_wrap">
          <div>
          <Form onSubmit={updateProfile}>
            <div className="form_component">
              <div className="mb-2 label_style">
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control 
                  id="name"
                  name="name"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={userData.name}
                  className="myprofile_form_style"
                  placeholder="Enter name"
                />
              </div>
              <div className="mb-2 label_style">
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control 
                  id="username"
                  name="username"
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  defaultValue={userData.username}
                  className="myprofile_form_style"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div className="form_component">
              <div className="mb-2 label_style">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control 
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  defaultValue={userData.email}
                  className="myprofile_form_style"
                  placeholder="Enter email"
                />
              </div>
              <div className="mb-2 label_style">
                <Form.Label htmlFor="phoneNumber">Phone Number</Form.Label>
                <Form.Control 
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  defaultValue={userData.phoneNumber}
                  className="myprofile_form_style"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            
            <div className="bio_box">
              <Form.Label htmlFor="bio">Bio</Form.Label>
              <Form.Control 
                as="textarea"
                rows={3}
                id="bio"
                name="bio"
                type="text"
                onChange={(e) => setBio(e.target.value)}
                defaultValue={userData.bio}
                placeholder="Enter bio"
              />
            </div>

            <div className="website_box">
              <Form.Label htmlFor="website">Website Url</Form.Label>
              <Form.Control 
                id="website"
                name="website"
                type="text"
                onChange={(e) => setWebsite(e.target.value)}
                defaultValue={userData.website}
                placeholder="Enter website url"
              />
            </div>

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

            <div className="btn_wrapper">
              <Button type="submit" variant="success" className='btn_update'>Update Profile</Button>
            </div>
          </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditProfileBtn