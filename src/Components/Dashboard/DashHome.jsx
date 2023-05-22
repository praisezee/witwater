import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import useDashboardContext from '../../hooks/useDashboardContext';
import Post from './Post';

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
      {  posts.length ?
        (<>
          {
          posts.map( post => (
            <Post post={post} auth={auth}/>
        ))}
        </> )
        : (
          <div className="vh-75 center">
            <p className='rounded border shadow-sm p-5'>No post to display</p>
          </div>
        )
      }
    </Container>
  )
}

export default DashHome