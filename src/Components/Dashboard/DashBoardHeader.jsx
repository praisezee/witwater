import React from 'react'
import useLogout from '../../hooks/useLogout'
import { useNavigate } from 'react-router-dom';

const DashBoardHeader = () =>
{
  const logout = useLogout()
  const navigate = useNavigate

  const signOut = async () =>
  {
    await logout();
    navigate('auth')
  }
  return (
    <div className='d-flex h-10 w-100 py-3 bg-light'>
      <button onClick={signOut}>signOut</button>
    </div>
  )
}

export default DashBoardHeader