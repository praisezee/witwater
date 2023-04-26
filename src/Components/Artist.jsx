import React from 'react'
import Error from './Error'
import { Card, CardImg, Col, Container, Row } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

const Artist = () => {
  const {   user } = useAuth()
  const artists = user.filter(model => model.role === 'artist')
  return (
    <Container fluid className='my-5 min-vh-100'>
      { artists.length ? (
        <Row>
          { artists.map(
            artist => (
              <Col xs={ 10 } md={ 6 } lg={ 4 }>
                <Card>
                  <CardImg src={ artist.src } />
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