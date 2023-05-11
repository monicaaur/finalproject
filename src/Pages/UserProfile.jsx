import React, { useState, useEffect } from "react";
import Navibar from "../Navibar";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import Axios from 'axios';
import './Profile.css'
import LeftSideMenu from "../Components/LeftSideMenu";
import UserFollowers from "../Components/FollowersFollowing/UserFollowers";
import UserFollowing from "../Components/FollowersFollowing/UserFollowing";
import PostModal from "../Components/PostModal";

const UserProfile = () => {
  const { userID, postID } = useParams();

  const [userData, setUserData] = useState('');
  const [totalPost, setTotalPost] = useState('')
  const [postImage, setPostImage] = useState([]);
  const [postData, setPostData] = useState([])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getUserData = async () => {
    await Axios.get(`${import.meta.env.VITE_BASEURL}/api/v1/user/${userID}`, {
      headers: {
        apiKey: `${import.meta.env.VITE_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(async (response) => {
      setUserData(response.data.data)

      await Axios.get(`${import.meta.env.VITE_BASEURL}/api/v1/users-post/${userID}?size=10&page=1`, {
        headers: {
          apiKey: `${import.meta.env.VITE_APIKEY}`,
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        setTotalPost(response.data.data)
        setPostImage(response.data.data.posts);

        const requests = response.data.data.posts.map(async (post) => {
          const postDetails = await Axios.get(`${import.meta.env.VITE_BASEURL}/api/v1/post/${postID}`, {
            headers: {
              apiKey: `${import.meta.env.VITE_APIKEY}`,
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })

          return postDetails;
        })

        Promise.all(requests)
        .then(responses => {
          setPostData(responses.data.data)
        })
        .catch(error => {
          console.log(error);
        })
      })
      .catch((error) => {
        console.log(error);
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  useEffect(async () => {
    await getUserData()
  }, [userID])

  const handleClick = () => {
    setShow(true)
    window.location.assign(`/profile/post/${postID}`)
  }

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
                <div className="button_wrap">
                  <Button type="submit" variant="link" className='the_button'>Follow</Button>
                </div>
              </div>
              <div className="profile_info_right">
                <p className="profile_username">{userData.username}</p>
                <div className="three_info_wrap">
                  <p className="numberof_info">{totalPost.totalItems} posts</p>
                  <UserFollowers {...userData}/>
                  <UserFollowing {...userData}/>
                </div>
                <p className="bio_info">{userData.bio}</p>
                <a className="website_info" href={userData.website} target="_blank">{userData.website}</a>
              </div>
            </div>

            <div className="photo_list_wrap">
              {postImage.length > 0 ? (
                <>
                  {postImage && postImage.map(image => (
                    <>
                    <div className="photo_list" onClick={() => handleShow()}>
                      <img src={image.imageUrl} alt="" />
                    </div>
                  <PostModal 
                    show={show === image.id}
                    handleClose={handleClose}
                    {...postData}
                  />
                  </>
                  ))}
                </>
              ) : (
                <div className="no_posts">
                  <p >No Post.</p>
                </div>
              )}
            </div>
          </Col>

          <Col lg='1'></Col>
        </Row>
      </Container>
    </>
  )
}

export default UserProfile