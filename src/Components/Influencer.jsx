import React,{useEffect} from 'react'
import Error from './Error'
import { Container, Row } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import Profile from './Profile';

const Influencer = () => {
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
  const influencers = user.filter(model => model.role.toLowerCase() === 'influencer')
  return (
    <Container fluid className='my-5 min-vh-100'>
      { influencers.length ? (
        <Row>
          { influencers.map(
            influencer => (
              <Profile user={influencer}/>
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