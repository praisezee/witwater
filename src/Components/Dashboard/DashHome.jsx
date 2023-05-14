import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import Error from '../Error';
import useDashboardContext from '../../hooks/useDashboardContext';
import Post from './Post';

const DashHome = () =>
{
  
  const { posts, getPost, errRef } = useDashboardContext();
  
  useEffect( () =>
  {
    let isMounted = true
    const controller = new AbortController();
    getPost( isMounted, controller );

    return () =>
    {
      isMounted = false
      controller.abort()
    }
  }, [] )
  
  return (
    <Container fluid className='Main'>
      { posts.length ? (
        <div>
          {
          posts.map( post => (
            <Post post={post}/>
        ))}
        </div>
      ) : (
          <Error errRef={ errRef} />
      ) }
    </Container>
  )
}

export default DashHome