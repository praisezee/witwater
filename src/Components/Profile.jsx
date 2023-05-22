import React from 'react'
import { Card, CardImg, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import male from '../assets/male.jpg'
import female from '../assets/female.jpg'

const Profile = ({user}) => {
  return (
    <Col xs={ 10 } md={ 6 } lg={ 3 } >
      <Link to={`../dashboard/${user.id}`} className='nav-link'>
        <Card className='shadow'>
          <CardImg src={ user.src !== '' ? user.src : user.src === '' && user.gender.toLowerCase() === 'male' ? male : user.src === '' && user.gender.toLowerCase() === 'female' ? female : null } width={200} height={300} />
          <Card.Text className='h4 text-center mt-2 mb-0'>{ user.name }</Card.Text>
          <Card.Text className='text-center'>{ user.gender }</Card.Text>
        </Card>
      </Link>
    </Col>
  )
}

export default Profile
