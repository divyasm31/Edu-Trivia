// to handle routing errors
import React from 'react'
import { MdErrorOutline } from "react-icons/md";
// import { useSelector } from 'react-redux'
import { useRouteError } from 'react-router-dom'
function ErrorElement() {

    let routingError = useRouteError();
    // let {errMessage} = useSelector(state=>state.userAuthorLoginReducer)

  return (
    <div className='container mx-auto m-5 p-5'>
      <h1 className='h1 text-center text-danger m-5 p-5' style={{fontFamily:"Freeman"}}><MdErrorOutline style={{color:"darkred",fontSize:"5vh"}} />  {routingError.status} -- {routingError.data}</h1>
    </div>
  )
}

export default ErrorElement
