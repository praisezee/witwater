import React from 'react'
import Error from './Error'
import { Card, CardImg, Col, Container, Row } from 'react-bootstrap';

const FemaleModel = () => {
  const models = []
  const femaleModels = models.filter(model => model.role === 'model' && model.gender === 'female')
  return (
    <Container fluid className='my-5 min-vh-100'>
      { femaleModels.length ? (
        <Row>
          { femaleModels.map(
            femaleModel => (
              <Col xs={ 10 } md={ 6 } lg={ 4 }>
                <Card>
                  <CardImg src={ femaleModel.picture } />
                  <Card.Text>{ femaleModel.name }</Card.Text>
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

export default FemaleModel