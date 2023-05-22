import React,{useEffect} from 'react'
import Error from './Error'
import { Container, Row } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import Profile from './Profile';

const Stylist = () =>
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
  const stylist = user.filter( model => model.role.toLowerCase() === 'stylist' );
  return (
    <Container fluid className='my-5 min-vh-100'>
      { stylist.length ? (
        <Row>
          { stylist.map(
            stylist => (
              <Profile user={stylist}/>
            )
          ) }
        </Row>
      ) : (
        <Error/>
      )
      }
    </Container>
  );
}

export default Stylist