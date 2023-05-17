import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from 'react-bootstrap';
import Axios from 'axios';
import './FollowUnfollow.css';

const FollowUnfollow = ({getUserData}) => {
  const { userID } = useParams();

  const [isFollow, setIsFollow] = useState(false);

  useEffect(() => {
    Axios.get(`${import.meta.env.VITE_BASEURL}/api/v1/my-following?size=10&page=1`, {
      headers: {
        apiKey: `${import.meta.env.VITE_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      const myFollowing = response.data.data.users.map(user => user.id);
      setIsFollow(myFollowing.includes(userID));
    })
    .catch(error => {
      alert(error);
    });
  }, [userID]);

  const handleFollow = () => {
    Axios.post(`${import.meta.env.VITE_BASEURL}/api/v1/follow`, {
      userIdFollow: userID
    }, {
      headers: {
        apiKey: `${import.meta.env.VITE_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setIsFollow(true);
    })
    .catch(error => {
      alert(error);
    });
    getUserData;
  };

  const handleUnfollow = () => {
    Axios.delete(`${import.meta.env.VITE_BASEURL}/api/v1/unfollow/${userID}`, {
      headers: {
        apiKey: `${import.meta.env.VITE_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setIsFollow(false);
    })
    .catch(error => {
      alert(error);
    });
    getUserData;
  };

  return(
    <div className="button_wrap">
      <Button 
        type="submit"
        variant="link"
        className={isFollow ? 'unfoll_btn' : 'follow_btn'}
        onClick={isFollow ? handleUnfollow : handleFollow}
      >
        {isFollow ? 'Unfollow' : 'Follow'}
      </Button>
    </div>
  )
}

export default FollowUnfollow