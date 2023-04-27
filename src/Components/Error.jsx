import React from 'react';
import useAuth from '../hooks/useAuth';

const Error = ({errRef}) =>
{
  const {errMsg} = useAuth()
  return (
    <div ref={errRef} className='center vh-50'>
      <div className="bg-light rounded rounded-5 shadow p-4">
        <p className="text-center py-5 my-5 fs-2 fw-bold">
        {errMsg ? errMsg : "Ops! We are sorry there is nothing to display here"}
      </p>
      </div>
    </div>
  )
}

export default Error