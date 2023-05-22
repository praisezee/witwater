import React, {useEffect} from 'react'
import Error from './Error'
import { Container, Row } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import Profile from './Profile';

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
  
  const femaleModels = user.filter(model => model.role.toLowerCase() === 'model' && model.gender.toLowerCase() === 'female')
  return (
    <Container fluid className='my-5 min-vh-100'>
      { femaleModels.length ? (
        <Row>
          { femaleModels.map(
            femaleModel => (
              <Profile user={femaleModel}/>
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