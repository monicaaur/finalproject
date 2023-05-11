import React, { useState } from 'react';
import '../index.css';
import './TimelinePost.css';
import Axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const Comment = ({ postId, setPostData }) => {
  const [createComment, setCreateComment] = useState("");

  const handleComment = async (e) => {
    e.preventDefault();

    await Axios.post(`${import.meta.env.VITE_BASEURL}/api/v1/create-comment`, {
      data: {
        postId: postId,
        comment: createComment
      }
    }, {
      headers: {
        apiKey: `${import.meta.env.VITE_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(async responses => {
      console.log("comment", responses);
      await Axios.get(`${import.meta.env.VITE_BASEURL}/api/v1/post/${postId}`, {
        headers: {
          apiKey: `${import.meta.env.VITE_APIKEY}`,
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log("post data", response.data.data);
        setPostData(response.data.data)
      })
      .catch(error => {
        console.log(error);
      })
    })
    .catch(error => {
      console.log(error);
    })
    
    setCreateComment("");
  }

  return(
    <div className="input_comment_wrap">
      <Form className="d-flex input_comment" 
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
      <Button variant="link" type="submit" className="btn_send">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#29C6A0" class="bi bi-send-fill" viewBox="0 0 16 16">
        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
        </svg>
      </Button>
    </div>
  )
}

export default Comment