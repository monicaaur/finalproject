import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, } from 'react-bootstrap';
import Axios from 'axios';
import { useLocation } from 'react-router-dom';
import '../../index.css'
import './Navibar.css'

function Navibar() {        
  const location = useLocation();

  const [username, setUsername] = useState();

  useEffect( async () => {
    await Axios.get(
      `${import.meta.env.VITE_BASEURL}/api/v1/user`, {
        headers: {
        apiKey: `${import.meta.env.VITE_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      setUsername(response.data.data.username);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  const handleSignOut = async () => {
    await Axios.get(`${import.meta.env.VITE_BASEURL}/api/v1/logout`, {
      headers: {
        apiKey: `${import.meta.env.VITE_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then((response) => {
      localStorage.removeItem("token");
      alert('Sign out success')
      window.location.assign("/Signin")
    })
    .catch((error) => {
      alert('Failed to Sign out')
    });
  }

  const renderUsername = () => {
    return (
      <>
        <li className="nav_hidden nav-link nav_username_wrap">Logged Account: <a className='nav_username' href="/myprofile">{username}</a></li>
      </>
    );
  };

  return (
    <Container fluid>
      <Navbar expand="lg" fixed="top" bg="body-tertiary" dark>
        <Container fluid>
          <Navbar.Brand className='navbar-title'>KumoKumo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
            <Nav className="me-auto mb-2 mb-lg-0 nav_hidden">
              <Nav.Link href="/home" className={[location.pathname === '/home' ? 'active' : 'inactive', 'navlink_style']}>Home</Nav.Link>
              <Nav.Link href="/explore" className={[location.pathname === '/explore' ? 'active' : 'inactive', 'navlink_style']}>Explore</Nav.Link>
            </Nav>
            <Nav className="mb-2 mb-lg-0">
              {renderUsername()}
              <Nav.Link className="nav_signout" onClick={handleSignOut}>Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  )
}

export default Navibar