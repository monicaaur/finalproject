import React, { useEffect, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import Axios from 'axios';
import { useParams } from "react-router-dom";
import '../../Pages/Profile.css';

const Followers = ({totalFollowers}) => {
  const { userID } = useParams();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [dataFollowers, setDataFollowers] = useState([]);

  const handleFollowers = async () => {
    await Axios.get(`${import.meta.env.VITE_BASEURL}/api/v1/my-followers?size=10&page=1`, {
      headers: {
        apiKey: `${import.meta.env.VITE_APIKEY}`,
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setDataFollowers(response.data.data.users)
    })
  }
  
  useEffect(async () => {
    await handleFollowers();
  }, [])

  return(
    <>
      <p className="numberof_info" onClick={() => handleShow()}>{totalFollowers} followers</p>

      <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton className='header_style'>
          <Modal.Title>Followers</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {dataFollowers.length > 0 ? (
            <div
              style={{
                overflow: `${dataFollowers.length > 5 ? "scroll" : "visible"}`,
                height: `${dataFollowers.length > 5 ? "290px" : "100%"}`,
                overflowX: "hidden"
              }}
            >
              {dataFollowers && dataFollowers.map(followers => (
                <div className="followers_list_wrap">
                  <div className="account_wrap">
                    <div className="followers_pp_wrap">
                      <img src={followers.profilePictureUrl} alt="" />
                    </div>
                    <a className="followers_username" href={`/profile/${followers.id}`}>
                      {followers.username}
                    </a>
                  </div>
                  {/* <div className="follow_button_wrap">
                    <Button type="submit" variant="link" className='follow_button'>Follow</Button>
                  </div> */}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p className="no_text">No Followers.</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Followers