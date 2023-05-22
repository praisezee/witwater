import React from 'react'
import DashBoardHeader from './DashBoardHeader';
import { Outlet } from 'react-router-dom';


const DashboardLayout = () => {
  return (
    <div className='w-100 d-flex flex-column vh-100 '>
      <DashBoardHeader />
      <div className="flex-grow-1 mx-o px-0 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout