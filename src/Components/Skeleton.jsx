import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';

const SkeletonLoader = () => {
  return (
    <div className="w-100">
      <Container fluid className='border rounded shadow py-2 my-2'>
        <Row >
          <Col xs={2}>
          <Skeleton circle height={50} width={50} />
          </Col>
          <Col className='my-auto'>
            <Skeleton/>
          </Col>
        </Row>
        <Row>
          <Skeleton count={3}/>
        </Row>
      </Container>
    </div>
  )
}

export default SkeletonLoader
