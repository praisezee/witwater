import male from '../../assets/male.jpg'
import female from '../../assets/female.jpg'
import {Link, useNavigate} from 'react-router-dom'
import useAuth from '../../hooks/useAuth';
import { BsPencil, BsTrash } from 'react-icons/bs'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

const UserDetails = ({user, id, modal}) =>
{
  const { auth } = useAuth()
  const axiosPrivete = useAxiosPrivate()
  const navigate = useNavigate()

  const handleDelete = async () =>
  {
    try {
      const res = axiosPrivete.delete( `/posts/${id}` )
      console.log( res.data )
      navigate('../../')
    } catch (err) {
      console.log( err )
    }
  }


  return (
    <div className="d-flex">
      <Link to={auth.id === user?.id ? '../../profile' : `../../${user?.id}`} className="d-flex nav-link flex-grow-1">
        <div className="rounded-circle w-5 mx-auto border border-info">
          <img src={user.src !== '' ? user?.src :user?.src === '' && user?.gender.toLowerCase() === 'male' ? male : user?.src === '' && user?.gender.toLowerCase() === 'female'? female : null} alt="" className='img-fluid w-100 rounded-circle' />
        </div>
        <div className="flex-grow-1 my-auto ms-2">
          <p className="h6 text-capitalize">{ auth?.name }</p>
        </div>
      </Link>
      <div className={ auth.id === user?.id ? 'd-flex ' : 'd-none' }>
        <BsPencil className='mx-2 fs-1 btn btn-outline-primary border rounded p-2' role='button' onClick={()=>modal(true)} />
        <BsTrash className='mx-2 fs-1 btn btn-outline-danger border rounded p-2' role='button' onClick={ handleDelete} />
      </div>
    </div>
  )
}

export default UserDetails
