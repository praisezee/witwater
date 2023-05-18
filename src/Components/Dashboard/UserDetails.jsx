import male from '../../assets/male.jpg'
import female from '../../assets/female.jpg'
import {Link} from 'react-router-dom'
import useAuth from '../../hooks/useAuth';

const UserDetails = ({user}) =>
{
  const {auth} = useAuth()
  return (
    <Link to={auth.id === user?.id ? '../../profile' : `../../${user?.id}`} className="d-flex nav-link">
      <div className="rounded-circle w-5 mx-auto border border-info">
      <img src={user?.src !== '' ? user?.src :user?.src === '' && user?.gender.toLowerCase() === 'male' ? male : user?.src === '' && user?.gender.toLowerCase() === 'female'? female : null} alt="profile" className='img-fluid w-100 rounded-circle' />
      </div>
      <div className="flex-grow-1 my-auto ms-2">
        <p className="h6 text-capitalize">{ user?.name }</p>
      </div>
    </Link>
  )
}

export default UserDetails
