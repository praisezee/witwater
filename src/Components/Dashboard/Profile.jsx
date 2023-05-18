import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Button, Col, Container, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import male from '../../assets/male.jpg'
import female from '../../assets/female.jpg'
import useDashboardContext from '../../hooks/useDashboardContext'
import MyPost from './MyPost';

const Profile = () =>
{
  const { auth } = useAuth()
  const {posts} = useDashboardContext()
  const {deleteAccount} = useDashboardContext()
  const myPosts = posts.filter( post => post.senderId === auth.id )
  return (
    <main className='w-100'>
      <Container fluid>
        <Row>
          <Col xs={12} md={4} className='my-auto'>
            <div className="d-flex">
              <div className="rounded-circle w-25 mx-auto border border-info">
                <img className='img-fluid w-100 rounded-circle' src={ auth.src !== '' ? auth.src : auth?.src === '' && auth?.gender.toLowerCase() === 'male' ? male : auth?.src === '' && auth?.gender.toLowerCase() === 'female' ? female : null } alt="profile" />
              </div>
              <div className='my-auto flex-grow-1 d-block d-md-none mx-2'>
                <p className="h5 text-primary text-center mx-auto">{ auth.name }</p>
                <p className="text-center text-muted">{ auth.email }</p>
              </div>
            </div>
            <hr className='d-block d-md-none' />
          </Col>
          <Col xs={ 12 } md={ 8 } className='my-auto'>
            <div className='my-auto d-none d-md-block'>
              <p className="h3 text-primary my-auto text-center mx-auto">{ auth.name }</p>
              <p className="w-50 text-center mx-auto text-muted">{ auth.email }</p>
            </div>
            <ListGroup>
              <ListGroupItem className='h6 text-capitalize text-center'>Gender: {auth.gender}</ListGroupItem>
              <ListGroupItem className='h6 text-capitalize text-center'>Skill: {auth.role}</ListGroupItem>
              <ListGroupItem className='h6 text-capitalize text-center'>Phone Number: {auth.phoneNumber}</ListGroupItem>
              <ListGroupItem className='h6 text-capitalize text-center'>State: {auth.state}</ListGroupItem>
              <ListGroupItem className='h6 text-capitalize text-center'>City: {auth.city}</ListGroupItem>
            </ListGroup>
            <div className='w-100 d-flex my-3'>
              <Button variant='outline-primary' >
                Edit info
              </Button>
              <Button variant='outline-danger ms-auto' onClick={deleteAccount} >
                Delete account
              </Button>
            </div>
          </Col>
        </Row>
        <hr />
        <Row className='mt-4'>
          <p className="h5">My posts</p>
          { posts.length ? 
            myPosts.map( post => (
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

export default Profile
