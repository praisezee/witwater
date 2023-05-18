import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import useDashboardContext from '../../hooks/useDashboardContext';
import { Button, Col, Container, FormControl, Row } from 'react-bootstrap';
import UserDetails from './UserDetails';
import SkeletonLoader from '../Skeleton';

const SinglePost = () =>
{
  const { id } = useParams()
  const { posts, user, getUser, isLoading } = useDashboardContext()
  const [ singlePost, setSinglePost ] = useState( null )
  const [ comments, setComments ] = useState( [] )
  const [newComment, setNewComment] = useState('')
  
  useEffect( () =>
  {
    const post = posts.find( post => post._id === id )
    setSinglePost( post )
    getUser( post.senderId )
    setComments( post.comment )
    console.log(post)
  }, [] )


  return (
    <Container fluid className='mt-4 px-4'>
      { isLoading ?
        (
          <SkeletonLoader />
        ) :
        (
          <>
            <Row >
              <Col xs={ 12 }className='border rounded shadow py-2'>
                <UserDetails user={user} />
                <p className="fw-bold mb-0 text-capitalize">
                  {singlePost?.title}
                </p>
                <p>
                  {singlePost?.post}
                </p>
              </Col>
            </Row>
            <Row className='my-3'>
              <Col className='d-flex'>
                <FormControl as='textarea' value={ newComment } onChange={ ( e ) => setNewComment( e.target.value) } />
                <div className="my-auto px-3">
                  <Button variant='outline-primary'>comment</Button>
                </div>
              </Col>
            </Row>
            <Row>
              { comments.map( comment => (
                <Col>
                  <p>
                    {comment.comment}
                  </p>
                </Col>
              ))}
            </Row>
          </>
        )
      }
    </Container>
  )
}

export default SinglePost
