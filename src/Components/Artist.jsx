import React from 'react'
import Error from './Error'
import { Container, Row } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import Profile from './Profile';
import { useEffect } from 'react';

const Artist = () => {
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
  const artists = user.filter(model => model.role.toLowerCase() === 'artist')
  return (
    <Container fluid className='my-5 min-vh-100'>
      { artists.length ? (
        <Row>
          { artists.map(
            artist => (
              <Profile user={artist}/>
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

export default Artist