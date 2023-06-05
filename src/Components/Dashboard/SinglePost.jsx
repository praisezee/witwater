import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import useDashboardContext from '../../hooks/useDashboardContext';
import { Button, Col, Container, FormControl, FormLabel, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap';
import UserDetails from './UserDetails';
import SkeletonLoader from '../Skeleton';
import Comment from './Comment';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const SinglePost = () =>
{
  const axiosPrivate = useAxiosPrivate()
  const { id } = useParams()
  const { posts, user, getUser, isLoading, setNewComment, comments, newComment, sendComment, getComment } = useDashboardContext()
  const [ singlePost, setSinglePost ] = useState( null )
  const [ modal, setModal ] = useState( false )
  const [title, setTitle] = useState('')
  const [post, setPost] = useState('')
  
  useEffect( () =>
  {
    const post = posts.find( post => post._id === id )
    setSinglePost( post )
    getComment( id )
    getUser( post.senderId )
    setTitle(post.title)
    setPost(post.post)

  }, [] )

  // useEffect( () =>
  // {
  //   getComment( id )
  // },[comments])

  const handleSubmit = async () =>
  {
    try {
      const res = await axiosPrivate.patch( `/posts`, JSON.stringify( {
        id, post, title
      } ) ) 
      setSinglePost( res.data )
      setModal(false)
    } catch (err) {
      console.error(err);
    }
  }



  return (
    <Container fluid className='px-4 pt-2 vh-95 d-flex flex-column overflow-auto'>
      { isLoading ?
        (
          <SkeletonLoader />
        ) :
        (
          <>
            <Row >
              <Col xs={ 12 }className='border rounded shadow py-2'>
                <UserDetails user={user} id={id} modal={setModal} />
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
                  <Button variant='outline-primary' onClick={()=>sendComment(id)}>comment</Button>
                </div>
              </Col>
            </Row>
            <Row className='flex-grow-2 overflow-auto'>
              { comments.length ?
                  comments.map( comment => (
                    <Comment comment={ comment } postSenderId={user} />
              ) ) : (
                  <div className="vh-50 center">
                    <p className='rounded border shadow-sm p-5'>No comment to display</p>
                  </div>
              )}
            </Row>
            <Modal show={modal} centered onHide={()=>setModal(false)}>
                <ModalHeader>
                  <div className='d-flex justify-content-between w-100'>
                    <Button variant='outline-danger' onClick={()=>setModal(false)}>
                      Cancle
                    </Button>
                    <p className="h4 my-auto">Edit Post</p>
                    <Button variant='outline-primary' onClick={handleSubmit} >
                      Save
                    </Button>
                  </div>
              </ModalHeader>
              <ModalBody>
                <Row className='p-4'>
                  <Col xs={ 12 } md={ 10 } lg={8} className='mx-auto'>
                    <FormLabel className='h5'>
                      Title
                    </FormLabel>
                    <FormControl value={title} onChange={(e)=>setTitle(e.target.value)}/>
                  </Col>
                  <Col xs={ 12 } md={ 10 } lg={8} className='mx-auto'>
                    <FormLabel className='h5'>
                      Post
                    </FormLabel>
                    <FormControl as='textarea' value={post} onChange={(e)=>setPost(e.target.value)}/>
                  </Col>
                </Row>
              </ModalBody>
            </Modal>
          </>
        )
      }
    </Container>
  )
}

export default SinglePost
