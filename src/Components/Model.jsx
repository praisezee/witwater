import React from 'react'
import Error from './Error'
import { Card, CardImg, Col, Container, Row } from 'react-bootstrap';

const Model = () => {
  const models = []
  const modeler = models.filter(model => model.role === 'model')
  return (
    <Container fluid className='my-5 min-vh-100'>
      { modeler.length ? (
        <Row>
          { modeler.map(
            model => (
              <Col xs={ 10 } md={ 6 } lg={ 4 }>
                <Card>
                  <CardImg src={ model.picture } />
                  <Card.Text>{ model.name }</Card.Text>
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

export default Model