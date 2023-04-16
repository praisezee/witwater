import React from 'react'
import Error from './Error'
import { Card, CardImg, Col, Container, Row } from 'react-bootstrap';

const Photographer = () =>
{
  const models = []
  const photographers = models.filter(model => model.role = 'photographer')
  return (
    <Container fluid className='my-5 min-vh-100'>
      { photographers.length ? (
        <Row>
          { photographers.map(
            photographer => (
              <Col xs={ 10 } md={ 6 } lg={ 4 }>
                <Card>
                  <CardImg src={ photographer.picture } />
                  <Card.Text>{ photographer.name }</Card.Text>
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