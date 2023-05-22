import React,{useEffect} from 'react'
import Error from './Error'
import { Container, Row } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import Profile from './Profile';

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
  const modeler = user.filter(model => model.role.toLowerCase() === 'model')
  return (
    <Container fluid className='my-5 min-vh-100'>
      { modeler.length ? (
        <Row>
          { modeler.map(
            model => (
              <Profile user={model}/>
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