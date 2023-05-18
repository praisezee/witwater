import React from 'react'
import { Col } from 'react-bootstrap';

const MyPost = ( { post } ) =>
{

  return (
    <Col xs={11} className='border mx-auto rounded shadow-sm bg-body-tertiary rounded rounded-3 my-3 py-2'>
      <p className="text-uppercase fw-bold">{ post.title }</p>
      <p>{ post.post }</p>
    </Col>
  )
}

export default MyPost
