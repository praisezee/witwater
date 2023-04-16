import React from 'react'
import Error from './Error'
import { Card, CardImg, Col, Container, Row } from 'react-bootstrap';

const MaleModel = () => {
  const models = []
  const maleModels = models.filter(model => model.role === 'model' && model.gender === 'male')
  return (
    <Container fluid className='my-5 min-vh-100'>
      { maleModels.length ? (
        <Row>
          { maleModels.map(
            maleModel => (
              <Col xs={ 10 } md={ 6 } lg={ 4 }>
                <Card>
                  <CardImg src={ maleModel.picture } />
                  <Card.Text>{ maleModel.name }</Card.Text>
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

export default MaleModel