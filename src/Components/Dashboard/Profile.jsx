import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Col, Container, Row } from 'react-bootstrap';
import male from '../../assets/male.jpg'
import female from '../../assets/female.jpg'

const Profile = () =>
{
  const {auth} = useAuth()
  return (
    <Container>
      <Row>
        <Col>
          <div className="d-flex">
            <div className="rounded-circle w-25 border border-info">
              <img className='img-fluid' src={auth.src !== 'http://localhost:3500/' ? auth.src : auth?.src === 'http://localhost:3500/' && auth?.gender.toLowercase === 'male' ? male : auth?.src === 'http://localhost:3500/' && auth?.gender.toLowercase === 'female' ? female : null } alt="profile" />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
