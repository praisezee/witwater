import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import vid1 from '../../assets/videos/vid1.webm'

const Socials = () => {
  return (
    <Container fluid className=' my-4'>
      <p className="text-center py-3 fs-2 fw-bold text-uppercase"><span className="f-percifico text-capitalize">witwater</span> on socials</p>
      <Row className='d-flex align-items-center justify-content-center h-100'>
        <Col className='ratio ratio-16x9'>
          <iframe src={vid1} className='object-fit-fill' title='witwater on socials' autoPlay allowFullScreen ></iframe>
        </Col>
      </Row>
    </Container>
  )
}

export default Socials