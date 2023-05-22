import React,{useEffect} from 'react'
import Error from './Error'
import { Container, Row } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import Profile from './Profile';

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
  const maleModels = user.filter(model => model.role.toLowerCase()=== 'model' && model.gender.toLowerCase()=== 'male')
  return (
    <Container fluid className='my-5 min-vh-100'>
      { maleModels.length ? (
        <Row>
          { maleModels.map(
            maleModel => (
              <Profile user={maleModel}/>
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