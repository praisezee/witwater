import React from 'react'
import DashBoardHeader from './DashBoardHeader';
import { Outlet } from 'react-router-dom';
import DashboardFooter from './DashboardFooter';


const DashboardLayout = () => {
  return (
    <div className='d-flex flex-column vh-100 w-100'>
      <DashBoardHeader />
      <div className="flex-grow-1 overflow-y-auto">
        <Outlet />
      </div>
      <DashboardFooter/>
    </div>
  )
}

export default DashboardLayout