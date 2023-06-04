import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import axios from '../api/register'
import male from '../../assets/male.jpg'
import female from '../../assets/female.jpg'
import { Link } from 'react-router-dom'
import SkeletonLoader from '../Skeleton'

const Post = ( { post, auth } ) =>
{
  const [ user, setUser ] = useState( {} )
  const [isLoading, setIsLoading] = useState(false)
  useEffect( () =>
  {
    const getUser = async () =>
    {
      setIsLoading(true)
      try {
        const response = await axios.get( `/user/${ post.senderId }` )
      const result = response.data
        setUser( result )
        setTimeout( () =>
      {
        setIsLoading(false)
      }, 3000)
      } catch (err) {
        console.log(err)
      }
    }

    getUser()
  }, [ post ] )
  return (
    <Row  key={ post._id }>
      { isLoading ?
        (
          <SkeletonLoader />
        ) : (
          <Col  xs={11} className='border mx-auto shadow-sm rounded rounded-3 my-3 py-2'>
            <Link to={auth.id === user.id ? 'profile' : `${user.id}`} className="d-flex nav-link">
              <div className="rounded-circle w-5 mx-auto border border-info">
                <img src={ user?.src !== '' ? user.src : user?.src === '' && user?.gender.toLowerCase() === 'male' ? male : user?.src === '' && user?.gender.toLowerCase() === 'female' ? female : null } alt="" className=' rounded-circle img-fluid' />
              </div>
              <div className="flex-grow-1 my-auto ms-2">
                <p className="h6 text-capitalize">{ user?.name }</p>
              </div>
            </Link>
            <Link to={`post/${post._id}`} className='nav-link'>
              <p className="text-uppercase fw-bold mb-0 mt-2">{ post.title }</p>
              <p>{ post.post }</p>
            </Link>
          </Col>
        )
      }
    </Row>
  )
}

export default Post
