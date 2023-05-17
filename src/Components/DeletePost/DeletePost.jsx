import React from 'react';
import '../../index.css';
import Axios from 'axios';
import { Dropdown } from 'react-bootstrap';

const DeletePost = ({ postId }) => {
  const handleDeletePost = async (e, postId) => {
    e.preventDefault();

    await Axios.delete(`${import.meta.env.VITE_BASEURL}/api/v1/delete-post/${postId}`, {
      headers: {
        apiKey: `${import.meta.env.VITE_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      }
    })
    .then(response => {
      alert('Delete post success')
      window.location.assign('/myprofile');
    })
    .catch(error => {
      alert(error);
    })
  }

  return(
    <Dropdown.Item href="" onClick={(e) => handleDeletePost(e, postId)}>Delete Post</Dropdown.Item>
  )
}

export default DeletePost