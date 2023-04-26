import React from 'react'
import Error from './Error'
import { Card, CardImg, Col, Container, Row } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

const Stylist = () =>
{
  const {   user } = useAuth()
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