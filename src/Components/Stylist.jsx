import React from 'react'
import Error from './Error'
import { Card, CardImg, Col, Container, Row } from 'react-bootstrap';
const Stylist = () =>
{
  const models = [];
  const stylist = models.filter( model => model.role === 'stylist' );
  return (
    <Container fluid className='my-5 min-vh-100'>
      { stylist.length ? (
        <Row>
          { stylist.map(
            stylist => (
              <Col xs={ 10 } md={ 6 } lg={ 4 }>
                <Card>
                  <CardImg src={ stylist.picture } />
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