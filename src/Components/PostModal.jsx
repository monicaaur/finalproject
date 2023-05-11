import React, { useEffect, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import Axios from 'axios';
import { useParams } from "react-router-dom";

const PostModal = ({ show, handleClose}) => {
  return(
    <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton className='header_style'>
        <Modal.Title>Posts</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="post_modal_wrap">
          <div className="post_image"></div>
          <div className="post_comment_box">
            <p className="comment_title">Comments</p>
            {/* {posts.comment.length > 0 ? ( */}
              <div className="comment_box_wrap">
                {/* {posts.comment.map(comments => ( */}
                  <>
                    <div className="comment_wrap">
                      <div className="comment_pp_wrap">
                        {/* <img src={comments.user.profilePictureUrl} alt="profile picture" className="comment_pp" /> */}
                      </div>
                      <div className="comment_section">
                        <a href='' className="comment_username">username</a>
                        <p className="comment_text">comments</p>
                      </div>
                    </div>
                  </>
                {/* ))} */}
              </div>
            {/* ) : (
              <div>
                <p className='emptycontent_text'>no comments.</p>
              </div>
            // )} */}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default PostModal