import React,{useState, useEffect} from 'react'
import male from '../../../assets/male.jpg'
import female from '../../../assets/female.jpg'
import axios from '../../api/register'

const Conversation = ( { conversation, auth } ) =>
{
    const [user, setUser]= useState(null)

  useEffect( () =>
  {
    const friendId = conversation.members.find( member => member  !== auth.id)
    const getUser = async () =>
    {
      try {
        const response = await axios.get( '/user/'+friendId )
        setUser( response.data )
      } catch (err) {
        console.log(err);
      }
    }
    getUser()
  },[auth, conversation])



  return (
    <div className='d-flex align-items-center mt-3 btn btn-outline-primary'>
    <div className="rounded-circle w-5 me-3 border border-primary">
      <img className='img-fluid w-100 rounded-circle' src={ user?.src !== '' ? user?.src : user?.src === '' && user?.gender.toLowerCase() === 'male' ? male : user?.src === '' && user?.gender.toLowerCase() === 'female' ? female : null } alt="profile" />
    </div>
      <div className='h6 text-capitalize my-auto'>{user?.name}</div>
    </div>
  )
}

export default Conversation