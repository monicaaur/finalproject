import React, { useState, useEffect } from 'react';
import '../../../index.css';
import './ProfilePostComment.css';
import Axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const ProfilePostComment = ({ postId }) => {
  const [createComment, setCreateComment] = useState("");
  const [postComment, setPostComment] = useState("");

  const [myId, setMyId] = useState("");

  const getMyId = async () => {
    await Axios.get(`${import.meta.env.VITE_BASEURL}/api/v1/user`, {
      headers: {
        apiKey: `${import.meta.env.VITE_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setMyId(response.data.data.id)
    })
    .catch(error => {
      console.log(error);
    })
  }

  const getPostComment = async () => {
    await Axios.get(`${import.meta.env.VITE_BASEURL}/api/v1/post/${postId}`, {
      headers: {
        apiKey: `${import.meta.env.VITE_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setPostComment(response.data.data.comments)
    })
    .catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    getPostComment();
    getMyId();
  }, [])

  const handleUserProfile = async (id) => {
    if(id === myId) {
      window.location.assign("/myprofile")
    } else {
      window.location.assign(`/profile/${id}`)
    }
  }

  const handleComment = async (e) => {
    e.preventDefault();

    await Axios.post(`${import.meta.env.VITE_BASEURL}/api/v1/create-comment`, {
      postId: postId,
      comment: createComment
    }, {
      headers: {
        apiKey: `${import.meta.env.VITE_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(async responses => {
      setCreateComment('')
    })
    .catch(error => {
      console.log(error);
    })
    getPostComment();
  }

  const handleDeleteComment = async (e, commentId) => {
    e.preventDefault();

    await Axios.delete(`${import.meta.env.VITE_BASEURL}/api/v1/delete-comment/${commentId}`, {
      headers: {
        apiKey: `${import.meta.env.VITE_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      alert('delete comment success')
    })
    .catch(error => {
      console.log(error);
    })
    getPostComment();
  }

  return(
    <>
      {postComment.length > 0 ? (
        <div 
          style={{
            overflow: `${postComment.length > 6 ? "scroll" : "visible"}`,
            overflowX: "hidden",
            height: "400px",
            margin: `${postComment.length > 0 ? "10px 10px 18px" : "10px"}`
          }}
        >
          {postComment.map(comments => (
            <>
            <div className="comment_box" key={comments.id}>
              <div className="user_comment_wrap">
                <div className="user_pp">
                  <img src={comments.user.profilePictureUrl} alt="profile picture" />
                </div>
                <div className="box_comment">
                  <a onClick={() => handleUserProfile(comments.user.id)} className="user_username">{comments.user.username}</a>
                  <p className="user_comment">{comments.comment}</p>
                </div>
              </div>
              <Button 
                variant='link'
                className="delcom_text"
                onClick={(e) => handleDeleteComment(e, comments.id)}
                style={{
                  display: `${comments.user.id === myId ? "block" : "none"}`,
                }}
                >delete</Button>
            </div>
            </>
          ))}
        </div>
      ) : (
        <div>
          <p className='emptycomment_text'>no comment.</p>
        </div>
      )}

      <div className="like_comment_wrap">
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
      </div>
    </>
  )
}

export default ProfilePostComment