import React, { useEffect, useState } from "react";
import { Modal } from 'react-bootstrap';
import Axios from 'axios';
import './FollowersFollowing.css';

const MyFollowing = ({totalFollowing}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [dataFollowing, setDataFollowing] = useState([]);

  const handleFollowing = async () => {
    await Axios.get(`${import.meta.env.VITE_BASEURL}/api/v1/my-following?size=10&page=1`, {
      headers: {
        apiKey: `${import.meta.env.VITE_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setDataFollowing(response.data.data.users)
    })
    .catch((error) => {
      console.log(error);
    });
  }
  
  useEffect(async () => {
    await handleFollowing();
  }, [])

  return(
    <>
      <p className="numberof_info" onClick={() => handleShow()}>{totalFollowing} following</p>

      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton className='header_style'>
          <Modal.Title>My Following</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dataFollowing.length > 0 ? (
            <div
              style={{
                overflow: `${dataFollowing.length > 5 ? "scroll" : "visible"}`,
                height: `${dataFollowing.length > 5 ? "290px" : "100%"}`,
                overflowX: "hidden"
              }}
            >
              {dataFollowing && dataFollowing.map(following => (
                <div className="followers_list_wrap">
                  <div className="account_wrap">
                    <div className="followers_pp_wrap">
                      <img src={following.profilePictureUrl} alt="" />
                    </div>
                    <a className="followers_username" href={`/profile/${following.id}`}>
                      {following.username}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="no_text">No Following.</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default MyFollowing