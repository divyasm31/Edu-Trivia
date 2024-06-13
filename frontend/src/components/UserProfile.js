import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import profile from '../images/profile.png'
import './userprofile.css'
import { Outlet,useNavigate } from 'react-router-dom'
import SideBarDashboard from './SideBarDashboard'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { resetState } from '../redux/slices/userSlice'


function UserProfile() {
  let { currentUser } = useSelector(state=>state.userLoginReducer)
  
  let dispatch=useDispatch();
  let navigate=useNavigate();
  let {register,handleSubmit}=useForm();
  async function handleFormSubmit(obj){
    console.log(obj)
    try{
    let response= await axios.put(`http://localhost:4000/user-api/edit/${currentUser.username}`,obj);
    if(response.data.message==='User updated'){
      let actionObj=resetState();
      dispatch(actionObj);
      localStorage.removeItem('token');
        navigate('/login');
    }}catch(err){
      console.log(err)
    }
  }

  return (
    <div className='bg-transparent'>  
        <SideBarDashboard />
        <div className='d-inline-block mt-5 ms-5 mb-2'>
            <div className='w-75 card profile-card text-center' style={{marginLeft:"20vw",backgroundColor:"rgb(5, 6, 23)"}}>
              <div className='card-header'>
                <p className='lead' style={{color:"lightcyan"}}>{currentUser.email}</p>
              </div>
              <div className='card-body'>
              <form className='form w-full mx-auto mb-4 formuser' style={{color:"lightcyan"}} onSubmit={handleSubmit(handleFormSubmit)}>
              <div className='row row-cols-2'>
                <div className='col mb-2'>
                  <label htmlFor='ID' className='form-label'>ID:</label>
                  <input disabled type='text' className='form-control' id='ID' value={currentUser._id} />
                </div>
                <div className='col mb-2'>
                  <label htmlFor='username' className='form-label'>Username:</label>
                  <input disabled type='text' className='form-control' id='username' value={currentUser.username}/>
                </div>
                <div className='col mb-2'>
                  <label htmlFor='email' className='form-label'>Email:</label>
                  <input type='email' className='form-control' id='email' {...register('email')}/>
                </div>
                <div className='col mb-2'>
                  <label htmlFor='password' className='form-label'>Password:</label>
                  <input className='form-control' type='password' id='password'{...register('password')}/>
                </div>
              </div>
              <button type='submit' className='btn p-2 mt-4 d-block mx-auto buttonUpdate'>Update Profile</button>
            </form>
            </div>
          </div> 
          <div >
          <div className='card w-75 mt-2 bg-transparent' style={{marginLeft:"20vw"}}>
          <div className='card-body bg-transparent'>
            <Outlet />
          </div>
          </div>
        </div>
      </div>
     </div>
      
  )
}

export default UserProfile
