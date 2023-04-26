import React from 'react'
import Error from './Error'
import { Card, CardImg, Col, Container, Row } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

const Influencer = () => {
  const {   user } = useAuth()
  const influencers = user.filter(model => model.role === 'influencer')
  return (
    <Container fluid className='my-5 min-vh-100'>
      { influencers.length ? (
        <Row>
          { influencers.map(
            influencer => (
              <Col xs={ 10 } md={ 6 } lg={ 4 }>
                <Card>
                  <CardImg src={ influencer.src } />
                  <Card.Text>{ influencer.name }</Card.Text>
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

export default Influencer