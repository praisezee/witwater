import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import axios from '../api/register'
import male from '../../assets/male.jpg'
import female from '../../assets/female.jpg'

const Comment = ( { comment } ) =>
{
  const { auth } = useAuth()
  const [user, setUser] = useState({})

  useEffect( () =>
  {
    const getUser = async () =>
    {
      try {
        const response = await axios.get( `/user/${ comment.senderId }` )
      const result = response.data
        setUser( result )
      } catch (err) {
        console.log(err)
      }
    }

    getUser()
  }, [] );
  return (
    <Col xs={12} className='border border-warning rounded shadow-sm my-2 p-2'>
      <Link to={auth.id === user.id ? '../../profile' : `../../${user.id}`} className="d-flex nav-link">
        <div className="rounded-circle w-5 mx-auto border border-info">
          <img src={user.src !== '' ? user.src :user.src === '' && user.gender.toLowerCase() === 'male' ? male : user.src === '' && user.gender.toLowerCase() === 'female'? female : null} alt="" className='img-fluid w-100 rounded-circle' />
        </div>
        <div className="flex-grow-1 my-auto ms-2">
          <p className="h6 text-capitalize">{ user.name }</p>
        </div>
      </Link>
      <div>
        <p className="mb-0 mt-2">{ comment.comment }</p>
      </div>
    </Col>
  )
}

export default Comment
