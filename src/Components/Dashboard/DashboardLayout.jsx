import React from 'react'
import DashBoardHeader from './DashBoardHeader';
import { Outlet } from 'react-router-dom';
import DashboardFooter from './DashboardFooter';


const DashboardLayout = () => {
  return (
    <div className='d-flex vh-100 flex-column flex-grow-1'>
      <DashBoardHeader />
      <div className="flex-grow-1 overflow-y-auto">
        <Outlet />
      </div>
      <DashboardFooter/>
    </div>
  )
}

export default DashboardLayout