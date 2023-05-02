import React from 'react'
import useLogout from '../../hooks/useLogout'
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const DashBoardHeader = () =>
{
  const logout = useLogout()
  const navigate = useNavigate()

  const signOut = async () =>
  {
    await logout();
    navigate('../auth/login')
  }
  return (
    <div className='d-flex h-10 w-100 py-3 bg-light'>
      <Button variant='primary' onClick={signOut}>signOut</Button>
    </div>
  )
}

export default DashBoardHeader