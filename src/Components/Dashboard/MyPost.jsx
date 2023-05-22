import React from 'react'
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import male from '../../assets/male.jpg'
import female from '../../assets/female.jpg'

const MyPost = ( { post, auth } ) =>
{

  return (
    <Col key={ post._id } xs={ 11 } className='border mx-auto rounded shadow-sm bg-body-tertiary rounded rounded-3 my-3 py-2'>
      <div className="d-flex">
        <div className="rounded-circle w-5 mx-auto border border-info">
          <img src={auth.src !== '' ? auth.src :auth.src === '' && auth.gender.toLowerCase() === 'male' ? male : auth.src === '' && auth.gender.toLowerCase() === 'female'? female : null} alt="" className='img-fluid w-100 rounded-circle' />
        </div>
        <div className="flex-grow-1 my-auto ms-2">
          <p className="h6 text-capitalize">{ auth.name }</p>
        </div>
      </div>
      <Link to={`../post/${post._id}`} className='nav-link'>
        <p className="text-uppercase fw-bold mb-0 mt-2">{ post.title }</p>
        <p>{ post.post }</p>
      </Link>
    </Col>
  )
}

export default MyPost
