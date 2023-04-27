import React,{useEffect} from 'react'
import Error from './Error'
import { Card, CardImg, Col, Container, Row } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Videographer = () => {
  const { user, getUsers } = useAuth()
  useEffect( () =>
  {
    let isMounted = true
    const controller = new AbortController();
    
    getUsers( isMounted, controller );

    return () =>
    {
      isMounted = false;
      controller.abort()
    }
  }, [] )
  const videographers = user.filter(model => model.role === 'videographer')
  return (
    <Container fluid className='my-5 min-vh-100'>
      { videographers.length ? (
        <Row>
          { videographers.map(
            videographer => (
              <Col xs={ 10 } md={ 6 } lg={ 4 }>
                <Link to={`dashboard/${videographer.id}`}>
                  <Card>
                    <CardImg src={ videographer.src } />
                    <Card.Text>{ videographer.name }</Card.Text>
                  </Card>
                </Link>
              </Col>
            )
          )}
        </Row>
      ) : (
          <Error/>
      )
    }
    </Container>
  )
}

export default Videographer