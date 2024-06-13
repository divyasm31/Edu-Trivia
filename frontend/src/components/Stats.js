import React from 'react'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'
import Leaderboard from './Leaderboard'

function Stats() {
  return (
    <div className='bg-transparent'>
      <SideBar />
      <div className='d-inline-block ms-5 mt-5 mb-2'>
        <h1 className='text-center text-info' style={{textDecorationLine:"underline",textDecorationColor:"#e6ffef",marginLeft:"17vw"}}>Leaderboard</h1>
        <Outlet />
      </div>
    </div>
  )
}

export default Stats
