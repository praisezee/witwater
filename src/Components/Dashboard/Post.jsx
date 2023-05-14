import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import axios from '../api/register'

const Post = ( { post } ) =>
{
  const [user,setUser] = useState({})
  useEffect( () =>
  {
    const getUser = async () =>
    {
      const response = await axios.get( `/user/${ post?.senderId }` )
      const result = response.data
      setUser(result)
    }

    getUser()
  }, [post])
  return (
    <Row key={post.id}>
              <Col xs={11} className='border mx-auto rounded rounded-3 my-3 py-2'>
                <p className="h5 text-capitalize">{ user?.name }</p>
                <p>{ post.post }</p>
                { post.image ? (
                  <Col>
                    <img src={post.image} alt="postimage" />
                  </Col>
                ) : null}
              </Col>
            </Row>
  )
}

export default Post
