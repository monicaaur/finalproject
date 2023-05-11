import React, { useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import '../index.css';
import './EditProfileBtn.css';
import UploadImg from "../Components/UploadImg";

const EditProfileBtn = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [uploadImage, setUploadImage] = useState("");

  const updateProfile = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      phoneNumber: '',
      bio: '',
      profilePictureUrl: null
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Must be 3 characters or more')
        .max(50, 'Must be less than 50 characters'),
      username: Yup.string(),
      email: Yup.string().email('Invalid email address'),
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10,12}$/, "Must be in number"),
      bio: Yup.string()
        .max(250, 'Max 250 characters'),
      profilePictureUrl: Yup.mixed()
      .test(
        "fileSize",
        "File size should not be more than 1MB",
        (value) => value && value.size <= 1000000
      )
    }),

    onSubmit: async (values) => {
      await Axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL}/api/v1/update-profile`,
        headers: {
          apiKey: `${import.meta.env.VITE_APIKEY}`,
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        data: {
          name: values.name,
          username:values.username,
          email: values.email,
          phoneNumber: values.phoneNumber,
          bio: values.bio,
          profilePictureUrl: uploadImage
        },
      })

      .then((response) => {
        console.log(response);
        alert('Update profile success')
      })
      .catch((error) => {
        console.log(error);
        alert('Update profile failed. Try again')
      });
    },
  });

  return(
    <>
      <div className="button_wrap">
        <Button type="submit" variant="link" className='the_button' style={{ width: '100%' }} onClick={() => handleShow()}>Edit Profile</Button>
      </div>

      <Modal show={show} onHide={handleClose} size='lg' aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton className='header_style'>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="edit_profile_wrap">
          <div>
          <Form onSubmit={updateProfile.handleSubmit}>
            <div className="form_component">
              <div className="mb-2 label_style">
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control 
                  id="name"
                  name="name"
                  type="text"
                  onChange={updateProfile.handleChange}
                  value={updateProfile.values.name}
                  className="myprofile_form_style"
                  placeholder="Enter name"
                />
                {updateProfile.touched.name && updateProfile.errors.name ? (
                  <div style={{ color: '#e6283e', marginLeft: '2px'}}>{updateProfile.errors.name}</div>
                ) : null}
              </div>
              <div className="mb-2 label_style">
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control 
                  id="username"
                  name="username"
                  type="text"
                  onChange={updateProfile.handleChange}
                  value={updateProfile.values.username}
                  className="myprofile_form_style"
                  placeholder="Enter username"
                />
                {updateProfile.touched.username && updateProfile.errors.username ? (
                  <div style={{ color: '#e6283e', marginLeft: '2px'}}>{updateProfile.errors.username}</div>
                ) : null}
              </div>
            </div>

            <div className="form_component">
              <div className="mb-2 label_style">
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control 
                  id="email"
                  name="email"
                  type="email"
                  onChange={updateProfile.handleChange}
                  value={updateProfile.values.email}
                  className="myprofile_form_style"
                  placeholder="Enter email"
                />
                {updateProfile.touched.email && updateProfile.errors.email ? (
                  <div style={{ color: '#e6283e', marginLeft: '2px'}}>{updateProfile.errors.email}</div>
                ) : null}
              </div>
              <div className="mb-2 label_style">
                <Form.Label htmlFor="phoneNumber">Phone Number</Form.Label>
                <Form.Control 
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  onChange={updateProfile.handleChange}
                  value={updateProfile.values.phoneNumber}
                  className="myprofile_form_style"
                  placeholder="Enter phone number"
                />
                {updateProfile.touched.phoneNumber && updateProfile.errors.phoneNumber ? (
                  <div style={{ color: '#e6283e', marginLeft: '2px'}}>{updateProfile.errors.phoneNumber}</div>
                ) : null}
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
                onChange={updateProfile.handleChange}
                value={updateProfile.values.bio}
                className="bioform_style"
                placeholder="Enter bio"
              />
              {updateProfile.touched.bio && updateProfile.errors.bio ? (
                <div style={{ color: '#e6283e', marginLeft: '2px'}}>{updateProfile.errors.bio}</div>
              ) : null}
            </div>

            <UploadImg onChange={(e) => setUploadImage(e)} title='Photo Profile'/>

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