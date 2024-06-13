import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BodyHeader from './BodyHeader';
import './takequiz.css'

function TakeQuiz() {
  let { register, handleSubmit, formState: { errors } } = useForm();
  let { state } = useLocation();
  let { currentUser } = useSelector(state => state.userLoginReducer);
  let navigate = useNavigate();

  function handleFormSubmit(quizObj) {
    sessionStorage.setItem('quiz-completed', false);
    quizObj.topic = state.sub;
    navigate(`/modules/${currentUser.username}/test`, { state: quizObj });
  }

  return (
    <div className='bg-transparent'>
      <BodyHeader />
      <h6 className='h4 text-light text-center m-5 p-4'>Topic: <span className='h4 bg-transparent fw-bolder' style={{ color: "#eed2ee" }}>{state.sub}</span></h6>
      <form className='form mx-auto w-50 p-4 lead fw-2' style={{ backgroundColor: "#e6e6fa", borderRadius: "2%" }} onSubmit={handleSubmit(handleFormSubmit)}>
        <div className='w-50 mb-2'>
          <label className='form-label fw-bolder mb-1 w-50'>Select the level</label>
          <select className="level form-select mb-1-1 bg-transparent" id="level" defaultValue="" {...register('level', { required: true })}>
            <option value="" disabled>--Select--</option>
            <option value='easy'>Easy</option>
            <option value='medium'>Medium</option>
            <option value='hard'>Hard</option>
          </select>
          {errors.level && <p className='lead text-danger'>This field is required</p>}
        </div>
        <div className='mb-2'>
          <label className='form-label fw-bolder mb-1' htmlFor='noOfQuestions'>Select the no. of questions</label>
          <select className='form-select w-50 mb-1 bg-transparent' id='noOfQuestions' defaultValue="" {...register('noOfQuestions', { required: true })}>
            <option value="" disabled>--Select--</option>
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='15'>15</option>
          </select>
          {errors.noOfQuestions && <p className='lead text-danger'>This field is required</p>}
        </div>
        <div className='mb-2'>
          <label className='form-label fw-bolder mb-1' htmlFor='timer'>Timer per question</label>
          <select className="timer form-select mb-2 mt-2 w-50 bg-transparent" id="timer" defaultValue="" {...register('timer', { required: true })}>
            <option value="" disabled>--Select--</option>
            <option value='10'>10sec</option>
            <option value='20'>20sec</option>
            <option value='30'>30sec</option>
          </select>
          {errors.timer && <p className='lead text-danger'>This field is required</p>}
        </div>
        <button className='takequizform d-block mx-auto text-center p-2' style={{ backgroundColor: "#123524", color: "ivory" }}>Start Quiz</button>
      </form>
    </div>
  );
}

export default TakeQuiz;






















