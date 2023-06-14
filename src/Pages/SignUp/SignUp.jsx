import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import '../../index.css';
import './SignUp.css';

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      passwordRepeat: '',
      phoneNumber: '',
      bio: '',
      website: ''
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, 'Must be 3 characters or more')
        .max(50, 'Must be less than 50 characters')
        .required('*Required'),
      username: Yup.string().required('*Required'),
      email: Yup.string().email('Invalid email address').required('*Required'),
      password: Yup.string()
        .min(8, 'Must be 8 character or more')
        .required('*Required'),
      passwordRepeat: Yup.string()
      .oneOf([Yup.ref('password'), null], "Password does not match"),
      phoneNumber: Yup.string()
        .matches(/^[0-9]{10,12}$/, "Must be in number")
        .required('*Required'),
      bio: Yup.string()
        .max(250, 'Max 250 characters'),
      website: Yup.string()
    }),

    onSubmit: async (values) => {
      await Axios({
        method: 'post',
        url: `${import.meta.env.VITE_BASEURL}/api/v1/register`,
        headers: {
          apiKey: `${import.meta.env.VITE_APIKEY}`
        },
        data: {
          name: values.name,
          username:values.username,
          email: values.email,
          password: values.password,
          passwordRepeat: values.passwordRepeat,
          phoneNumber: values.phoneNumber,
          bio: values.bio,
          website: values.website
        },
      })

      .then((response) => {
        alert('Registration success')
        window.location.assign("/Signin")
      })
      .catch((error) => {
        alert(`${error.response.data.message}`)
      });
    },
  });

  return (
    <div className="signup_box">
      <Container fluid className='signup_wrapper'>
        <h2 className="signup_title">Sign Up</h2>
        <Form onSubmit={formik.handleSubmit}>
          <div className="form_component">
            <div className="mb-2 label_style">
              <Form.Label htmlFor="name">Name</Form.Label>
              <Form.Control 
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
                className="form_style"
                placeholder="Enter name"
              />
              {formik.errors.name ? (
                <div style={{ color: '#e6283e', marginLeft: '2px'}}>{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="mb-2 label_style">
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control 
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
                className="form_style"
                placeholder="Enter username"
              />
              {formik.touched.bio && formik.errors.username ? (
                <div style={{ color: '#e6283e', marginLeft: '2px'}}>{formik.errors.username}</div>
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
                onChange={formik.handleChange}
                value={formik.values.email}
                className="form_style"
                placeholder="Enter email"
              />
              {formik.touched.email && formik.errors.email ? (
                <div style={{ color: '#e6283e', marginLeft: '2px'}}>{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="mb-2 label_style">
              <Form.Label htmlFor="phoneNumber">Phone Number</Form.Label>
              <Form.Control 
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                className="form_style"
                placeholder="Enter phone number"
              />
              {formik.touched.bio && formik.errors.phoneNumber ? (
                <div style={{ color: '#e6283e', marginLeft: '2px'}}>{formik.errors.phoneNumber}</div>
              ) : null}
            </div>
          </div>

          <div className="form_component">
            <div className="mb-2 label_style">
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control 
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                className="form_style"
                placeholder="Enter password"
              />
              {formik.touched.bio && formik.errors.password ? (
                <div style={{ color: '#e6283e', marginLeft: '2px'}}>{formik.errors.password}</div>
              ) : null}
            </div>
            <div className="mb-2 label_style">
              <Form.Label htmlFor="password">Confirm Password</Form.Label>
              <Form.Control 
                id="passwordRepeat"
                name="passwordRepeat"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.passwordRepeat}
                className="form_style"
                placeholder="Confirm password"
              />
              {formik.errors.passwordRepeat ? (
                <div style={{ color: '#e6283e', marginLeft: '2px'}}>{formik.errors.passwordRepeat}</div>
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
              onChange={formik.handleChange}
              value={formik.values.bio}
              className="bioform_style"
              placeholder="Enter bio"
            />
            {formik.touched.bio && formik.errors.bio ? (
              <div style={{ color: '#e6283e', marginLeft: '2px'}}>{formik.errors.bio}</div>
            ) : null}
          </div>

          <div className="website_box">
            <Form.Label htmlFor="website">Website Url</Form.Label>
            <Form.Control 
              id="website"
              name="website"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.website}
              placeholder="Enter website url"
            />
          </div>
          
          <div className="btntext_wrapper">
            <div className="btnsignup_wrapper">
              <Button type="submit" variant="success" className='btn_signup'>Sign Up</Button>
            </div>

            <div className='to_signin_text'>
              <p>Already have an account? <a href="/Signin" className='signin_link'>Sign in</a></p>
            </div>
          </div>
        </Form>
      </Container>
    </div>
  )
}

export default SignUp