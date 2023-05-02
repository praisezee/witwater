import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useRefreshToken from '../hooks/useRefreshToken'
import useAuth from '../hooks/useAuth'
import { Spinner } from 'react-bootstrap';

const PersistLogin = () =>
{
  const [ isLoading, setIsloading ] = useState( true )
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth()
  
  useEffect( () =>
  {
    let isMounted = true
    const verifyRefreshToken = async () =>
    {
      try {
        await refresh();
      } catch (err) {
        console.log(err)
      } finally {
        isMounted && setIsloading(false)
      }
    }

    !auth?.accessToken ? verifyRefreshToken() : setIsloading(false)

    return () => isMounted = false;
  },[])
  return (
    <>
      { !persist ?
        <Outlet/> :
        isLoading ?
        <div className='vh-100 d-flex justify-content-center align-items-center w-100'>
          <Spinner animation='grow' variant='primary'/>
          <Spinner animation='grow' variant='primary' className='mx-2'/>
          <Spinner animation='grow' variant='primary'/>
        </div>
        : <Outlet/>
      }
    </>
  )
}

export default PersistLogin