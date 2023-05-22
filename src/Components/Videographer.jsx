import React,{useEffect} from 'react'
import Error from './Error'
import { Container, Row } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import Profile from './Profile';

const Videographer = () => {
  const { user, getUsers } = useAuth()
  useEffect( () =>
  {
    
    getUsers();
  }, [getUsers] )
  const videographers = user.filter( model => model.role.toLowerCase() === 'videographer' )
  return (
    <Container fluid className='my-5 min-vh-100'>
      { videographers.length ? (
        <Row>
          { videographers.map(
            videographer => (
              <Profile user={videographer}/>
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

export default Videographer