import React from 'react'
import { Link } from 'react-router-dom';
import {BsHouse, BsChat, BsPersonCircle, BsPlusLg} from 'react-icons/bs'

const DashboardFooter = () => {
  return (
    <div className='d-flex justify-content-evenly py-2 bg-light h-10'>
      <Link className='link-dark fs-4' to='/dashboard'>
        <BsHouse/>
      </Link>
      <Link className='link-dark fs-4' to='new-post'>
        <BsPlusLg/>
      </Link>
      <Link className='link-dark fs-4' to='chat'>
        <BsChat/>
      </Link>
      <Link className='link-dark fs-4' to='profile'>
        <BsPersonCircle/>
      </Link>
    </div>
  )
}

export default DashboardFooter