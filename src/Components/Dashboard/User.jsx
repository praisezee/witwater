import React, { useEffect, useState } from 'react'
import { Button, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import male from '../../assets/male.jpg'
import female from '../../assets/female.jpg'
import useDashboardContext from '../../hooks/useDashboardContext'
import MyPost from './MyPost';
import { useParams } from 'react-router-dom';
import { BsChat } from 'react-icons/bs'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const User = () =>
{
  const axiosPrivate = useAxiosPrivate()
  const {id} = useParams()
  const {  user,setUser, addConversation } = useDashboardContext()
  const [ userPost, setUserPost ] = useState( [] )

  useEffect( () =>
  {
    const getUser = async () =>
  {
    try {
      const response = await axiosPrivate.get( `/user/${ id }` )
      const result = await response.data
      setUser( result )
    } catch (err) {
      console.log(err)
    }
    }
    getUser()
  },[id])

  useEffect( () =>
  {
    const getSinglePost = async (  ) =>
  {
    try {
      const response = await axiosPrivate.get( `/userPost/${ user?.id }` )
      const result = await response.data;
      setUserPost( result )
    } catch (err) {
      console.log(err)
    }
    }
    
    getSinglePost()
  },[user])

  return (
    <main>
      <Container fluid>
        <Row>
          <Col xs={12} md={4} className='my-auto'>
            <div className="d-flex">
              <div className="rounded-circle w-25 mx-auto border border-info">
                <img className='img-fluid w-100 rounded-circle' src={ user?.src !== '' ? user?.src : user?.src === '' && user?.gender.toLowerCase() === 'male' ? male : user?.src === '' && user?.gender.toLowerCase() === 'female' ? female : null } alt="profile" />
              </div>
              <div className='my-auto flex-grow-1 d-block d-md-none mx-2'>
                <div className="d-flex justify-content-evenly">
                  <div className='flex-grow-1'>
                    <p className="h5 text-primary my-auto text-center mx-auto">{ user.name }</p>
                    <p className="text-center mx-auto text-muted">{ user.email }</p>
                  </div>
                  <div className=' my-auto'>
                    <Button variant='outline-secondary' onClick={()=>addConversation(id)}>
                      <BsChat className='fs-4 m-1'/>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <hr className='d-block d-md-none' />
          </Col>
          <Col xs={ 12 } md={ 8 } className='my-auto'>
            <div className='my-auto d-none d-md-block'>
              <div className="d-flex justify-content-evenly">
                  <div className='flex-grow-1'>
                    <p className="h5 text-primary my-auto text-center mx-auto">{ user.name }</p>
                    <p className="text-center mx-auto text-muted">{ user.email }</p>
                  </div>
                  <div className=' my-auto'>
                    <Button variant='outline-secondary' onClick={()=>addConversation(id)}>
                      <BsChat className='fs-4 m-1'/>
                    </Button>
                  </div>
                </div>
            </div>
            <ListGroup>
              <ListGroupItem className='h6 text-capitalize text-center'>Gender: {user.gender}</ListGroupItem>
              <ListGroupItem className='h6 text-capitalize text-center'>Skill: {user.role}</ListGroupItem>
              <ListGroupItem className='h6 text-capitalize text-center'>Phone Number: {user.phoneNumber}</ListGroupItem>
              <ListGroupItem className='h6 text-capitalize text-center'>State: {user.state}</ListGroupItem>
              <ListGroupItem className='h6 text-capitalize text-center'>City: {user.city}</ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
        <hr />
        <Row className='mt-4'>
          <p className="h5">{`${user.name} posts` }</p>
          { userPost.length ? 
            userPost.map( post => (
              <MyPost post={ post } />
            ) )
            : (
              <p className="text-captialize text-center">you have no post uploaded</p>
            )
          }
        </Row>
      </Container>
    </main>
  )
}

export default User
