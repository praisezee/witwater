import React, {useEffect} from 'react'
import Error from './Error'
import { Card, CardImg, Col, Container, Row } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

const FemaleModel = () =>
{
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
  
  const femaleModels = user.filter(model => model.role.toLowecase() === 'model' && model.gender.toLowecase() === 'female')
  return (
    <Container fluid className='my-5 min-vh-100'>
      { femaleModels.length ? (
        <Row>
          { femaleModels.map(
            femaleModel => (
              <Col xs={ 10 } md={ 6 } lg={ 4 }>
                <Card>
                  <CardImg src={ femaleModel.src } />
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