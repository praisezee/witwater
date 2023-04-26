import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Error from '../Error';
import useAuth from '../../hooks/useAuth'

const DashHome = () =>
{
  
  const { posts, getPost } = useAuth();
  useEffect( () =>
  {
    getPost()
  }, [] )
  return (
    <Container fluid className='Main'>
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
                    <img src={post.image} alt="postimage" />
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