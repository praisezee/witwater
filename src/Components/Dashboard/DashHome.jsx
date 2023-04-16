import React, { useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Error from '../Error';
import DashboardContext from '../context/Context';

const DashHome = () =>
{
  const {posts} = useContext(DashboardContext)
  return (
    <Container fluid>
      { posts.length ? (
        <div>
          {
          posts.map( post => (
            <Row key={post.id}>
              <Col xs={11} className='border mx-auto rounded rounded-3 my-3 py-2'>
                <p className="h5 text-capitalize">{ post.title }</p>
                <p>{ post.message }</p>
                { post.image ? (
                  <Col>
                    <img src={post.image} alt="post image" />
                  </Col>
                ) : null}
              </Col>
            </Row>
        ))}
        </div>
      ) : (
          <Error/>
      ) }
    </Container>
  )
}

export default DashHome