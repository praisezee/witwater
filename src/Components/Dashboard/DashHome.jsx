import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Error from '../Error';
import useAuth from '../../hooks/useAuth'

const DashHome = () =>
{
  
  const { posts, getPost, errRef } = useAuth();
  
  useEffect( () =>
  {
    let isMounted = true
    const controller = new AbortController();
    getPost( isMounted, controller );
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
          <Error errRef={ errRef} />
      ) }
    </Container>
  )
}

export default DashHome