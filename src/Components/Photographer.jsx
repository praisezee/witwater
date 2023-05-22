import React,{useEffect} from 'react'
import Error from './Error'
import { Container, Row } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import Profile from './Profile';

const Photographer = () =>
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
  
  const photographers = user.filter(model => model.role.toLowerCase() === 'photographer')
  return (
    <Container fluid className='my-5 min-vh-100'>
      { photographers.length ? (
        <Row>
          { photographers.map(
            photographer => (
              <Profile user={photographer}/>
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

export default Photographer