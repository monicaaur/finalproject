import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../../index.css';
import './RightSideComponent.css';
import { Button } from 'react-bootstrap';

const RightSideComponent = () => {
  const [userData, setUserData] = useState('');

  useEffect( async () => {
    await Axios.get(
      `${import.meta.env.VITE_BASEURL}/api/v1/user`, {
        headers: {
        apiKey: `${import.meta.env.VITE_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then((response) => {
      setUserData(response.data.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);

  const renderUsername = () => {
    return (
      <div className="side_username">{userData.username}</div>
    );
  };

  return(
    <div className="right_side_component">
      <p className="logged_account">Logged Account</p>
      <div className="side_user_component">
        <div className="side_pp">
          <img src={userData.profilePictureUrl} alt="Profile Picture" />
        </div>
        {renderUsername()}
      </div>
      <div className="see_profile_wrap">
        <Button type="submit" variant="link" className='btn_see_profile' href='/myprofile'>See Profile</Button>
      </div>
    </div>
  )
}

export default RightSideComponent