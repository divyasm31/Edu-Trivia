import { NavLink } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { userLoginThunk } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom'
import {useSelector,useDispatch } from 'react-redux'
import { useEffect } from 'react';
import './login.css'
function Login() {

    let {register,handleSubmit,formState:{errors}} = useForm();
    let {userLoginStatus,errOccurred,errMessage,currentUser} = useSelector(state=>state.userLoginReducer);
    let navigate=useNavigate();
    let dispatch = useDispatch();
    function handleFormSubmit(userObj){
    //  console.log(userObj)
        dispatch(userLoginThunk(userObj))
    }
    useEffect(() => {
      if (userLoginStatus && currentUser) {
        <div class="alert alert-success" role="alert">
          Login successful 
        </div>
        navigate(`/modules/${currentUser.username}`);
      }else{
        <div class="alert alert-danger" role="alert">
          {errMessage}
        </div>
      }
    }, [userLoginStatus, currentUser, navigate]);
  
  
  return (
    <div className='bg-transparent'>
    <h1 className='text-center mt-5 p-5 display-4 login-heading' style={{color:"#feeee1"}}>Login</h1>
    <form 
      className='container w-50 mb-5 mx-auto p-5 form-container'
      style={{minWidth:"60vh",maxWidth:"60vh"}}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      {errOccurred && <p className='h6 text-center text-danger'>{errMessage}</p>}
      <div className="mb-3">
        <input type="text" className="form-control" id="username" placeholder='Username...' name='username' {...register('username', {required: true})}/>
        {errors.username?.type === 'required' && <p className='lead text-danger'>This field is required</p>}
      </div>
      <div className="mb-3">
        <input type="password" className="form-control" id="password" placeholder='Password...' name='password' {...register('password', {required: true})}/>
        {errors.password?.type === 'required' && <p className='lead text-danger'>This field is required</p>}
      </div>
      <p className='mt-3 lead'>Don't have an account? <NavLink style={{color:"royalblue",fontStyle:"italic"}} to='/register'>register</NavLink></p>
      <button type="submit" className="btn text-dark p-2 m-2 login-button" style={{backgroundColor:"#b4eaff"}}>Login</button>
    </form>
  </div>
  )
}

export default Login
