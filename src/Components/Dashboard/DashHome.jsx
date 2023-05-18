import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import Error from '../Error';
import useDashboardContext from '../../hooks/useDashboardContext';
import Post from './Post';
import SkeletonLoader from '../Skeleton';

const DashHome = () =>
{
  
  const { posts, getPost, auth } = useDashboardContext();
  
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
    <Container fluid >
      {  posts.length &&
        (<>
          {
          posts.map( post => (
            <Post post={post} auth={auth}/>
        ))}
        </>)
      }
    </Container>
  )
}

export default DashHome