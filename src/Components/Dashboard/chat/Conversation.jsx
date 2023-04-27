import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BsPersonCircle } from 'react-icons/bs';

const Conversation = ( { conversation, currentUser } ) =>
{
  const [user, setUser]= useState(null)

  useEffect( () =>
  {
    const friendId = conversation.members.find( member => member ) !== currentUser.id
    const getUser = async () =>
    {
      try {
        const response = await axios( '/user/' + friendId )
        setUser(response.data)
      } catch (err) {
        console.log(err);
      }
    }
    getUser()
  },[currentUser, conversation])


  return (
    <div className='d-flex align-items-center mt-3 btn btn-outline-dark'>
      { user?.src ?
        <img src={ user.src  } alt="profile" className='img-fluid rounded-circle border me-3' width={ 40 } />
        : <BsPersonCircle width={ 40 } className='img-fluid rounded-circle border me-3'/>
      }
      <span className='h6 text-capitalize my-auto'>{user?.name}</span>
    </div>
  )
}

export default Conversation