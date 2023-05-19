import React from 'react';
import '../index.css';
import './HomeExplore.css';
import { Container, Row, Col } from 'react-bootstrap';

// Import Component
import Navibar from '../Components/Navibar/Navibar';
import LeftSideMenu from '../Components/LeftSideMenu/LeftSideMenu';
import TimelinePost from '../Components/TimelinePost/TimelinePost';
import RightSideComponent from '../Components/RightSideComponent/RightSideComponent';

const Home = () => {
  const homeApi = `${import.meta.env.VITE_BASEURL}/api/v1/following-post?size=10&page=1`;

  return(
    <>
      <Navibar />
      <Container fluid className='homeexplore_wrapper'>
        <Row>
          <Col lg='3' md='3' className='leftside_wrapper'>
            <LeftSideMenu />
          </Col>
          <Col lg='5' md='5' sm='12' className='timelinepost_wrapper'>
            <TimelinePost apiUrl={homeApi} text="No posts. Start following someone!"/>
          </Col>
          <Col lg='4' md='4' className='rightside_wrapper'>
            <RightSideComponent />
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Home