import React,{useEffect} from 'react'
import Error from './Error'
import { Card, CardImg, Col, Container, Row } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

const MaleModel = () => {
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
  const maleModels = user.filter(model => model.role === 'model' && model.gender === 'male')
  return (
    <Container fluid className='my-5 min-vh-100'>
      { maleModels.length ? (
        <Row>
          { maleModels.map(
            maleModel => (
              <Col xs={ 10 } md={ 6 } lg={ 4 }>
                <Card>
                  <CardImg src={ maleModel.src } />
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