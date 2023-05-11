import React, { useEffect, useState } from "react";
import Navibar from "../Navibar";
import { Container, Row, Col } from 'react-bootstrap';
import Axios from 'axios';
import './Profile.css';
import LeftSideMenu from "../Components/LeftSideMenu";
import EditProfileBtn from "../Components/EditProfileBtn";
import Followers from "../Components/FollowersFollowing/Followers";
import Following from "../Components/FollowersFollowing/Following";

const MyProfile = () => {
  const [userData, setUserData] = useState('');
  const [totalPost, setTotalPost] = useState('')
  const [postImage, setPostImage] = useState([]);

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
      .then((response) => {
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
              </div>
            </div>

            <div className="photo_list_wrap">
              {postImage && postImage.map(image => (
                <div className="photo_list">
                  <img src={image.imageUrl} alt="" />
                </div>
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