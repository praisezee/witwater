import React,{useEffect} from 'react'
import Error from './Error'
import { Card, CardImg, Col, Container, Row } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

const Photographer = () =>
{
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
  
  const photographers = user.filter(model => model.role.toLowecase() === 'photographer')
  return (
    <Container fluid className='my-5 min-vh-100'>
      { photographers.length ? (
        <Row>
          { photographers.map(
            photographer => (
              <Col xs={ 10 } md={ 6 } lg={ 4 }>
                <Card>
                  <CardImg src={ photographer.src } />
                  <Card.Text>{ photographer.name }</Card.Text>
                  <Card.Text>{ photographer.role }</Card.Text>
                </Card>
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

export default Photographer