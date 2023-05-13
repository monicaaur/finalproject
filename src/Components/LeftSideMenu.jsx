import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../index.css';
import './LeftSideMenu.css';
import { Nav, Modal, Button } from 'react-bootstrap';
import CreatePost from './CreatePost';

const LeftSideMenu = () => {
  const location = useLocation();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
      <div className="left_side_menu">
        <Nav className="me-auto mb-2 mb-lg-0" style={{ display: 'block' }}>
          <Nav.Link href="/home" className={[location.pathname === '/home' ? 'active' : 'inactive', 'navlink_style']}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house-door" viewBox="0 0 16 16">
              <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
            </svg>
            <p className="navlink_title">Home</p>
          </Nav.Link>
          <Nav.Link href="/explore" className={[location.pathname === '/explore' ? 'active' : 'inactive', 'navlink_style']}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-compass" viewBox="0 0 16 16">
              <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
              <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z"/>
            </svg>  
            <p className="navlink_title">Explore</p>
          </Nav.Link>
        </Nav>
        <div className="post_photo_wrap">
          <Button type="submit" variant="link" className='btn_post_photo' onClick={() => handleShow()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-camera" viewBox="0 0 16 16">
              <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1v6zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2z"/>
              <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
            </svg>  
            <p className="post_title">Post Photo</p>
          </Button>
        </div>

        <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton className='header_style'>
            <Modal.Title>Post Photo</Modal.Title>
          </Modal.Header>
          <Modal.Body className="post_form_wrap">
            <div>
              <CreatePost />
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default LeftSideMenu