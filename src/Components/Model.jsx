import React,{useEffect} from 'react'
import Error from './Error'
import { Card, CardImg, Col, Container, Row } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

const Model = () => {
  const { user, getUsers } = useAuth()
  useEffect( () =>
  {
    let isMounted = true
    const controller = new AbortController();
    
    getUsers( isMounted, controller );

    return () =>
    {
      isMounted = false;
      controller.abort()
    }
  }, [] )
  const modeler = user.filter(model => model.role === 'model')
  return (
    <Container fluid className='my-5 min-vh-100'>
      { modeler.length ? (
        <Row>
          { modeler.map(
            model => (
              <Col xs={ 10 } md={ 6 } lg={ 4 }>
                <Card>
                  <CardImg src={ model.src } />
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