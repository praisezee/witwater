import React, { useEffect, useState } from 'react'
import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import axios from '../api/register'
import male from '../../assets/male.jpg'
import female from '../../assets/female.jpg'
import { BsPencil, BsTrash } from 'react-icons/bs'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useDashboardContext from '../../hooks/useDashboardContext';
import SkeletonLoader from '../Skeleton';

const Comment = ( { comment,postSenderId } ) =>
{
  const axiosPrivate = useAxiosPrivate()
  const {getComment} = useDashboardContext()
  const { auth } = useAuth()
  const [ user, setUser ] = useState( {} )
  const [loading, setLoading] = useState(true)

  const handleDelete = async () =>
  { 
    setLoading(true)
    try {
      await axiosPrivate.delete( `/comment/${ comment._id }` )
      getComment(comment.postId)
      setLoading(false)
    } catch (err) {
      console.error( err )
      setLoading(false)
    }
  }

  const getUser = async () =>
  {
    setLoading( true )
      try {
        const response = await axios.get( `/user/${ comment.senderId }` )
        const result = response.data
        setLoading(false)
        setUser( result )
      } catch (err) {
        console.log( err )
        setLoading(false)
      }
    }

  useEffect( () =>
  {

    getUser()
  }, [comment] );
  return (
    <>
      { loading ? <SkeletonLoader /> :
      (
        <Col xs={12} className='border border-primary-subtle rounded shadow-sm my-2 p-2'>
          <div className="d-flex justify-content-between">
          <Link to={auth.id === user?.id ? '../../profile' : `../../${user?.id}`} className="d-flex nav-link">
            <div className="rounded-circle w-5 mx-auto border border-info">
            <img src={user?.src !== '' ? user?.src :user?.src === '' && user?.gender.toLowerCase() === 'male' ? male : user?.src === '' && user?.gender.toLowerCase() === 'female'? female : null} alt="profile" className='img-fluid w-100 rounded-circle' />
            </div>
            <div className="flex-grow-1 my-auto ms-2">
              <p className="h6 text-capitalize">{ user?.name }</p>
            </div>
          </Link>
          <div className={ auth.id === user?.id || auth.id === postSenderId.id  ? 'd-flex ' : 'd-none' }>
            <BsPencil className={auth.id === postSenderId.id ? 'd-none' : 'mx-2 fs-1 btn btn-outline-primary border rounded p-2'} role='button'  />
            <BsTrash className='mx-2 fs-1 btn btn-outline-danger border rounded p-2' role='button' onClick={handleDelete} />
          </div>
        </div>
          <div>
            <p className="mb-0 mt-2">{ comment.comment }</p>
          </div>
        </Col>
      )}
    </>
  )

}

export default Comment
