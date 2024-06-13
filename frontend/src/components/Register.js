import React, { useState } from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import './login.css'

function Register() {

    let {register,handleSubmit,formState:{errors}} = useForm();
    let navigate = useNavigate();
    let [err,setErr] = useState('');
    async function handleFormSubmit(userObj){
        // userObj.score=0;
        let response = await axios.post('http://localhost:4000/user-api/user',userObj);
        if(response.data.message==='User created'){
          <div class="alert successful" role="alert">
            Registration successful
          </div>
          navigate('/login')
        }
        else{
          setErr(response.data.message);
          <div class="alert alert-danger" role="alert">
            {err}
          </div>
        }
    }

  return (
    <div className='bg-transparent'>
        <h1 className='text-center mt-5 p-5 display-4 login-heading' style={{color:"#ebf4f6"}}>Register</h1>
      <form className='container w-50 mb-5 mx-auto p-5 form-container' style={{minWidth:"60vh",maxWidth:"60vh",backgroundColor:"aliceblue"}} onSubmit={handleSubmit(handleFormSubmit)}>
        { err!==null && <p className='h6 text-center text-danger'>{err}</p>}
        <div className="mb-3">
            <input type="text" className="form-control" id="username" placeholder='Username...'{...register('username',{required:true},{minLength:4})}/>
            {errors.username?.type==='required'&&<p className='lead text-danger'>This field is required</p>}
            {errors.username?.type==='minLength'&&<p className='lead text-danger'>Minimum length is 6</p>}
        </div>
        <div className="mb-3">
            <input type="password" className="form-control" id="password" placeholder='Password...'{...register('password',{required:true},{minLength:'4'})}/>
            {errors.password?.type==='required'&&<p className='lead text-danger'>This field is required</p>}
            {errors.password?.type==='minLength'&&<p className='lead text-danger'>Minimum length is 6</p>}
        </div>
        <div className="mb-3">
            <input type="email" className="form-control" id="email" placeholder='Email...'{...register('email',{required:true})}/>
            {errors.email?.type==='required'&&<p className='lead text-danger'>This field is required</p>}
        </div>
        <p className='mt-3 lead' style={{color:"midnightblue"}}>Don't have an account? <NavLink style={{color:"midnightblue",fontStyle:"italic"}} to='/login'>login</NavLink></p>
        <button type="submit" className="btn text-dark p-2 login-button" style={{backgroundColor:"lightgoldenrodyellow"}}>Register</button>
        
      </form>
    </div>
  )
}

export default Register
