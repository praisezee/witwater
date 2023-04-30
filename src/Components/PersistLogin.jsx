import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useRefreshToken from '../hooks/useRefreshToken'
import useAuth from '../hooks/useAuth'
import { Spinner } from 'react-bootstrap';

const PersistLogin = () =>
{
  const [ isLoading, setIsloading ] = useState( true )
  const refresh = useRefreshToken();
  const { auth } = useAuth()
  
  useEffect( () =>
  {
    const verifyRefreshToken = async () =>
    {
      try {
        await refresh();
      } catch (err) {
        console.log(err)
      } finally {
        setIsloading(false)
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsloading(false)
  },[])
  return (
    <>
      { isLoading ?
        <div className='vh-100 d-flex justify-content-center align-items-center w-100'>
          <Spinner animation='grow' variant='primary'/>
          <Spinner animation='grow' variant='primary'/>
          <Spinner animation='grow' variant='primary'/>
        </div>
        : <Outlet/>
      }
    </>
  )
}

export default PersistLogin