import React from 'react'
import { Outlet } from 'react-router-dom'
import '../App.css'
function RootLayout() {
  return (
    <div className='main' style={{ backgroundColor: 'transparent',backgroundImage:"none" }}>
      <Outlet />
    </div>
  )
}

export default RootLayout
