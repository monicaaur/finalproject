import React, { useEffect, useState } from "react";
import Navibar from "../Navibar";
import { Container, Row, Col, Modal, Dropdown, Form, Button } from 'react-bootstrap';
import Axios from 'axios';
import './Profile.css';

// Import file Components
import LeftSideMenu from "../Components/LeftSideMenu";
import EditProfileBtn from "../Components/EditProfileBtn";
import Followers from "../Components/FollowersFollowing/Followers";
import Following from "../Components/FollowersFollowing/Following";
import DeletePost from "../Components/DeletePost";
import ProfilePostComment from "../Components/ProfilePostComment";

const MyProfile = () => {
  const [userData, setUserData] = useState('');
  const [totalPost, setTotalPost] = useState('')
  const [postImage, setPostImage] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => setShow(id);

  const handleLoggedUser = async () => {
    await Axios.get(`${import.meta.env.VITE_BASEURL}/api/v1/user`, {
      headers: {
        apiKey: `${import.meta.env.VITE_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(async (response) => {
      setUserData(response.data.data);

      await Axios.get(`${import.meta.env.VITE_BASEURL}/api/v1/users-post/${response.data.data.id}?size=10&page=1`, {
        headers: {
          apiKey: `${import.meta.env.VITE_APIKEY}`,
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(async (response) => {
        setTotalPost(response.data.data)
        setPostImage(response.data.data.posts);
      })
      .catch((error) => {
        console.log(error);
      })
      
    })
    .catch((error) => {
      console.log(error);
    })
  }
  
  useEffect(async () => {
    await handleLoggedUser();
  }, [])

  const handleLike = async (id, isLike) => {
    if (!isLike) {
      await Axios.post(`${import.meta.env.VITE_BASEURL}/api/v1/like`, {
        postId: id
      }, {
        headers: {
          apiKey: `${import.meta.env.VITE_APIKEY}`,
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      await Axios.post(`${import.meta.env.VITE_BASEURL}/api/v1/unlike`, {
        postId: id
      }, {
        headers: {
          apiKey: `${import.meta.env.VITE_APIKEY}`,
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }
    handleLoggedUser();
  };

  return(
    <>
      <Navibar />

      <Container fluid className='profile_wrap'>
        <Row>
          <Col lg='3'>
            <LeftSideMenu />
          </Col>

          <Col lg='1'></Col>

          <Col lg='7'>
            <div className="profile_info_wrap">
              <div className="profile_info_left">
                <div className="info_pp">
                  <img src={userData.profilePictureUrl} alt="Profile Picture" />
                </div>
                <EditProfileBtn />
              </div>

              <div className="profile_info_right">
                <p className="profile_username">{userData.username}</p>
                <div className="three_info_wrap">
                  <p className="numberof_info">{totalPost.totalItems} posts</p>
                  <Followers {...userData}/>
                  <Following {...userData}/>
                </div>
                <p className="bio_info">{userData.bio}</p>
                <a className="website_info" href={userData.website} target="_blank">{userData.website}</a>
              </div>
            </div>

            <div className="photo_list_wrap">
              {postImage && postImage.map(image => (
                <>
                <div className="photo_list" onClick={() => handleShow(image.id)}>
                  <img src={image.imageUrl} alt="" />
                </div>

                <Modal show={show === image.id} onHide={handleClose} size='xl' className='modal_test' aria-labelledby="contained-modal-title-vcenter" centered>
                  <Modal.Header closeButton className='header_style'>
                    <Modal.Title>Post</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className='post_modal_body'>
                    <div className="post_picture">
                      <img src={image.imageUrl} alt="" />
                    </div>
                    <div className="post_information_wrap">
                      <div className="post_information">
                        <div className="user_info">
                          <div className="post_pp">
                            <img src={image.user.profilePictureUrl} alt="" />
                          </div>
                          <p className="username_post">{image.user.username}   <span className='post_caption'>   {image.caption}</span></p>
                        </div>
                        <div className="dots_dropdown">
                          <Dropdown>
                            <Dropdown.Toggle variant="link" id="dropdown-basic">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                            </svg>
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href={`/updatepost/${image.id}`}>Update Post</Dropdown.Item>
                              <DeletePost postId={image.id}/>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>

                      <ProfilePostComment postId={image.id}/>

                      <div className="profile_heart_icon"
                        onClick={() => handleLike(image.id, image.isLike)}
                      >
                        {image.isLike ? 
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29C6A0" class="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                          </svg>
                        :                   
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="black" className="bi bi-heart" viewBox="0 0 16 16">
                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                          </svg>}
                        <p className='profile_like_total'>{image.totalLikes} likes</p>
                      </div>

                      {/* <div className="like_comment_wrap">
                        <div className="profile_heart_icon"
                          onClick={() => handleLike(image.id, image.isLike)}
                        >
                          {image.isLike ? 
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29C6A0" class="bi bi-heart-fill" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                            </svg>
                          :                   
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="black" className="bi bi-heart" viewBox="0 0 16 16">
                              <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>}
                          <p className='profile_like_total'>{image.totalLikes} likes</p>
                        </div>
                        <div className="post_input_comment">
                          <Form className="d-flex post_input" 
                          onSubmit={handleComment}
                          >
                            <Form.Control
                              id="comment"
                              name="comment"
                              type="text"
                              value={createComment}
                              onChange={(e) => setCreateComment(e.target.value)}
                              className="comment_form"
                              placeholder="Write comment.."
                            />
                          </Form>
                          <Button variant="link" type="submit" className="send_comment">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#29C6A0" class="bi bi-send-fill" viewBox="0 0 16 16">
                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                            </svg>
                          </Button>
                        </div>
                      </div> */}
                    </div>
                  </Modal.Body>
                </Modal>
                </>
              ))}
            </div>
          </Col>

          <Col lg='1'></Col>
        </Row>
      </Container>
    </>
  )
}

export default MyProfile