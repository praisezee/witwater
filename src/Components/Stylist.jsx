import React,{useEffect} from 'react'
import Error from './Error'
import { Card, CardImg, Col, Container, Row } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

const Stylist = () =>
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
  const stylist = user.filter( model => model.role === 'stylist' );
  return (
    <Container fluid className='my-5 min-vh-100'>
      { stylist.length ? (
        <Row>
          { stylist.map(
            stylist => (
              <Col xs={ 10 } md={ 6 } lg={ 4 }>
                <Card>
                  <CardImg src={ stylist.src } />
                  <Card.Text>{ stylist.name }</Card.Text>
                </Card>
              </Col>
            )
          ) }
        </Row>
      ) : (
        <Error/>
      )
      }
    </Container>
  );
}

export default Stylist