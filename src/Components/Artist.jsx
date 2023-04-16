import React from 'react'
import Error from './Error'
import { Card, CardImg, Col, Container, Row } from 'react-bootstrap';

const Artist = () => {
  const models = []
  const artists = models.filter(model => model.role === 'artist')
  return (
    <Container fluid className='my-5 min-vh-100'>
      { artists.length ? (
        <Row>
          { artists.map(
            artist => (
              <Col xs={ 10 } md={ 6 } lg={ 4 }>
                <Card>
                  <CardImg src={ artist.picture } />
                  <Card.Text>{ artist.name }</Card.Text>
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

export default Artist