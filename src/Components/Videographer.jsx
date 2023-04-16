import React from 'react'
import Error from './Error'
import { Card, CardImg, Col, Container, Row } from 'react-bootstrap';

const Videographer = () => {
  const models = []
  const videographers = models.filter(model => model.role === 'videographer')
  return (
    <Container fluid className='my-5 min-vh-100'>
      { videographers.length ? (
        <Row>
          { videographers.map(
            videographer => (
              <Col xs={ 10 } md={ 6 } lg={ 4 }>
                <Card>
                  <CardImg src={ videographer.picture } />
                  <Card.Text>{ videographer.name }</Card.Text>
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

export default Videographer