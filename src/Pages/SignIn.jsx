import React from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Axios from 'axios';
import '../index.css';
import './SignIn.css';

function SignIn() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },

    validationSchema: Yup.object({
      email: Yup.string().required('*Required'),
      password: Yup.string().required('*Required'),
    }),

    onSubmit: values => {
      Axios({
        method: 'post',
        url: `https://photo-sharing-api-bootcamp.do.dibimbing.id/api/v1/login`,
        headers: {
          apiKey: `c7b411cc-0e7c-4ad1-aa3f-822b00e7734b`
        },
        data: {
          email: values.email,
          password: values.password,
        },
      })

      .then((response) => {
        const token = response.data.token;
        localStorage.setItem('token', token);

        const username = response.data.user.username;
        localStorage.setItem('username', username);

        const email = response.data.user.email;
        localStorage.setItem('email', email);
        
        alert('Sign in success!')
        window.location.assign("/home")
      })
      .catch((error) => {
        console.log(error);
        alert(`${error.data.message}`)
      });
    },
  });

  return (
    <Container fluid className='signin_page'>
      <h2 className="greet_title">Hi, welcome to <span className='kumo_title'>KumoKumo!</span> </h2>

      <div className="signin_box">
        <h2 className="signin_title">Sign In</h2>
        <Form onSubmit={formik.handleSubmit}>
          <div className="mb-2 label_style">
            <Form.Label htmlFor="username">Email</Form.Label>
            <Form.Control 
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="signin_form_style"
              placeholder="Enter email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: '#e6283e'}}>{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="mb-2 mt-3 label_style">
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Control 
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="signin_form_style"
              placeholder="Enter password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: '#e6283e'}}>{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="btntext_wrapper">
            <div className="btn_wrapper">
              <Button type="submit" variant="success" className='btn_signin'>Sign In</Button>
            </div>

            <div className='to_signup_text'>
              <p>Don't have an account? <a href="/Signup" className='signup_link'>Sign up</a></p>
            </div>
          </div>
        </Form>
      </div>
    </Container>
  )
}

export default SignIn