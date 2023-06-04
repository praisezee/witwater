import React from 'react'
import useAuth from '../hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireFlutter = () =>
{
  const { subscribe } = useAuth()
  const monthly = subscribe?.data.map((s)=> s.plan ==='36573' && s.status === 'active')
  const biannual = subscribe?.data.map((s)=> s.plan ==='36577' && s.status === 'active')
  const annual = subscribe?.data.map( ( s ) => s.plan === '36578' && s.status === 'active' )
  console.log(subscribe)
  const location =useLocation()
  return (
    monthly.length || biannual.length || annual.length ?
      <Outlet /> :
      <Navigate
        to='../dashboard/subscribe'
        state={ { from: location } }
        replace
      />
  )
}

export default RequireFlutter
