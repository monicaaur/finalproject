import React, { useState, useEffect } from 'react';
import '../index.css';
import './TimelinePost.css';
import Axios from 'axios';
import { Modal } from 'react-bootstrap';
import Comment from './Comment';

const TimelinePost = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => setShow(id);

  const [postData, setPostData] = useState([]);

  const getPostData = async () => {
    await Axios.get(`${props.apiUrl}`, {
      headers: {
        apiKey: `${import.meta.env.VITE_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    .then((explore) => {
      const requests = explore.data.data.posts.map(async (post) => {
        const postDetails = await Axios.get(`${import.meta.env.VITE_BASEURL}/api/v1/post/${post.id}`, {
          headers: {
            apiKey: `${import.meta.env.VITE_APIKEY}`,
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        const postLike = post.totalLikes
        const isLike = post.isLike

        return Promise.all([postDetails, postLike, isLike]);
      })

      Promise.all(requests)
      .then((responses) => {
      setPostData(responses.map(([postDetails, postLike, isLike]) => {
        const post = postDetails.data.data
        post.comment = postDetails.data.data.comments
        post.like = postLike
        post.isLike = isLike
        return post;
      }))
      });  
    })
  }

  useEffect(async () => {
    await getPostData()
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
    getPostData();
  };

  return (
    <>
    {postData.length > 0 ? (
      <div>
        {postData && postData.map(posts => (
          <>
            <div className="post_wrapper">
              <div className="user_wrapper">
                <div className="photo_profile">
                  <img src={posts.user.profilePictureUrl} alt="" />
                </div>
                <a href={`/profile/${posts.user.id}`} className="username_text">{posts.user.username}</a>
              </div>
              <div className="post_image">
                <img src={posts.imageUrl} alt="" />
              </div>
              <div className="interacted_icon">
                <div className="heart_icon" onClick={() => handleLike(posts.id, posts.isLike)}>
                  {posts.isLike ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#29C6A0" class="bi bi-heart-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                    :                   
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="black" className="bi bi-heart" viewBox="0 0 16 16">
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                    </svg>}
                  <p className='likes_total_text'>{posts.like} likes</p>
                </div>
                <a className="comment_icon" onClick={() => handleShow(posts.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-chat" viewBox="0 0 16 16">
                  <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z"/>
                  </svg>
                  <p className='comments_total_text'>{posts.comment.length} comments</p>
                </a>
              </div>
              <div className="post_caption_wrap">
                <p className="post_username"><a href={`/profile/${posts.user.id}`} className="uname">{posts.user.username}</a>   <span className='caption'>{posts.caption}</span></p>
                <p className="create_date">Created at: {posts.createdAt}</p>
              </div>
            </div>

            <Modal show={show === posts.id} onHide={handleClose} size='md' aria-labelledby="contained-modal-title-vcenter" centered>
              <Modal.Header closeButton className='header_style'>
                <Modal.Title>All Comments</Modal.Title>
              </Modal.Header>
              <Modal.Body className='comment_modal_body'>
                <Comment postId={posts.id} postComment={posts.comment} commentId={posts.comment.id}/>
              </Modal.Body>
            </Modal>
          </>
        ))}
      </div>
    ) : (
      <div>
        <p className="emptycontent_text">{props.text}</p>
      </div>
    )}
    </>
  )
}

export default TimelinePost