import './quizPage.css';
import { AiOutlineLoading } from "react-icons/ai";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import congrats from '../images/congrats.gif'
import Streak from './Streak';
import { useLocation } from 'react-router-dom';
import { BsHourglassSplit } from "react-icons/bs";
import useTimer from './usetimer';

function QuizPage() {
  const { state }=useLocation()
  // console.log(state)
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  let [streak,setStreak] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.userLoginReducer);
  const [timeLeft, resetTimer] = useTimer(Number(state.timer), handleOptionClick);
  let [viewScore,setViewScore] = useState(0);
  let [vS,sVS] = useState(false);
  const [scoreUpdated, setScoreUpdated] = useState(false);
  let [correctAns,setCorrectAns] = useState(0);
  let [wrongAns,setWrongAns] = useState(0);

  useEffect(() => {
    if(sessionStorage.getItem('quiz-completed')===true){
      navigate(`/modules/${currentUser.username}`)
    }
    async function fetchQuestions() {
      const questionObjToSend = { "noOfQuestions":state.noOfQuestions,"topic":state.topic,"level":state.level};
      try {
        const received = await axios.post('http://localhost:4000/questions-api/questions', questionObjToSend);
        // console.log(received);
        //  let jsonDataReceived = received.data.payload;
        //  console.log(jsonDataReceived);
         let parsedContent = received.data.payload;
        // console.log(parsedContent)
         setQuestions(parsedContent);
         setQuestionIndex(0);
        setIsLoading(false);
      } catch (error) {
        console.error('Error making request:', error);
        setIsLoading(false);
      }
    }

    fetchQuestions();
  }, []);

  useEffect(() => {
    if (questions.length > 0 && questionIndex < questions.length) {
      const question = questions[questionIndex];
      setCurrentQuestion(question);
      let shuffledAnswers = [
        question.correctAnswer,
        ...question.wrongAnswers
      ].sort(() => Math.random() - 0.5);
      setAnswers(shuffledAnswers);
      resetTimer(state.timer);
    }
  }, [questionIndex, questions]);
  useEffect(() => {
    if (questionIndex >= questions.length && questions.length > 0 && !scoreUpdated) {
        setWrongAns(questions.length-correctAns);
      updateScore(score, questions.length,state.topic,correctAns,questions.length-correctAns);
      setScoreUpdated(true);
    }
  }, [questionIndex, questions.length, scoreUpdated]);
  
  // useEffect(()=>{
  //   if(timeLeft==0){
  //     console.log(timeLeft);
  //     setQuestionIndex(prev=>prev+1);
  //     const question = questions[questionIndex];
  //     setCurrentQuestion(question);
  //     let shuffledAnswers = [
  //       question.correctAnswer, ...question.wrongAnswers
  //     ].sort(()=>Math.random()-0.5);
  //     setAnswers(shuffledAnswers);
  //     resetTimer(state.timer);
  //   }
  // },[timeLeft,questionIndex,questions]);
  async function updateScore(sc,noOfQuestions,module,noOfCorrectAns,noOfWrongAns){
    // console.log("hi")
    if(scoreUpdated===false){
    let objToSend={
      "module":`${module}`,
      "addScore":`${sc}`,
      "addCorrectAns":`${noOfCorrectAns}`,
      "addWrongAns":`${noOfWrongAns}`,
      "addQuestions":`${noOfQuestions}`
    }
    let status = await axios.put(`http://localhost:4000/user-api/score/${currentUser.username}`,objToSend);
    // console.log(status.data.payload)
    setViewScore(status.data.payload)
    // setScoreUpdated(true);
    sVS(true);}
  }
  function handleOptionClick(event) {
    if (event && event.target){
    let givenAnswer = event.target.value;
    if (givenAnswer === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
      setCorrectAns(prev=>prev+1);
      setStreak(true);
    }
    setQuestionIndex(prevIndex => prevIndex + 1);

    setTimeout(() => {
      setStreak(false);
    },1000); 
  }else{
    setQuestionIndex(prevIndex=>prevIndex+1);
  }
  }

  if (isLoading) {
    return(
      <div className=' loader-container'>
      <AiOutlineLoading className='loader' />
      </div>
      );
  }

  if (questionIndex >= questions.length) {
    sessionStorage.setItem('quiz-completed',true)
    return (
      <div className='container text-center completed-container bg-transparent'>
        {
          (score===questions.length) ? ( <div style={{backgroundImage:`url(${congrats})`}}>
          <h4 className='ques fs-2 mt-5'>Quiz Completed!</h4>
          <p className='para mt-2 fs-3 d-block mx-auto '><span className='fw-bolder' style={{ color: "darksalmon" }}>Final Score:</span> <span className='lead text-light'> {score} / {questions.length}</span></p>
          { vS && <h4 className='text-center bg-transparent m-4' style={{color: "darksalmon"}}>{state.topic} Score: <span className='bg-transparentn text-light'>{viewScore}</span></h4>}
          <button className='btn btn-primary d-inline' onClick={() => navigate(`/stats/${currentUser.username}`) }>Go to Leaderboard</button></div>):
          (
            <div>
          <h4 className='ques fs-2 mt-5'>Quiz Completed!</h4>
          <p className='para mt-2 fs-3 d-block mx-auto '><span className='fw-bolder' style={{ color: "darksalmon" }}>Final Score:</span> <span className='lead text-light'> {score} / {questions.length}</span></p>
          { vS && <h4 className='text-center bg-transparent m-4' style={{color: "darksalmon"}}>{state.topic} Score: <span className='bg-transparentn text-light'>{viewScore}</span></h4>}
          <button className='btn btn-primary' onClick={() => navigate(`/stats/${currentUser.username}`)}>Go to Dashboard</button></div>
          )
        }
        
      </div>
    );
  }

  if (!currentQuestion) {
    return null; 
  }

  return (
    <div className='container text-center bg-transparent'>
      <div className='quiz container'>
        <div className='text-center'>
          <h4 className='ques fs-2'>{questionIndex+1}. {currentQuestion.question}</h4>
          <p className='para mt-2 fs-3'>
            <span className='fw-bolder' style={{ color: "darksalmon" }}>Score:</span>
            <span className='lead text-light'>{score} / {questions.length}</span>{streak && <span><Streak show={setStreak}/> </span>}
          </p>
          <p className='para mt-2 fs-3'>
            <span className='fw-bolder' style={{ color: "darksalmon" }}><BsHourglassSplit className='fs-4'/> </span>
            <span className='lead text-light'>{timeLeft} seconds</span>
          </p>
        </div>
        <div className='choice row row-cols-1 row-cols-md-2 row-cols-lg-2 text-center g-4 mt-5'>
          {answers.map((answer, index) => (
            <div className="col ans-col" key={index}>
              <button 
                className='opn w-full h-full text-lg uppercase font-bold p-16 rounded' 
                onClick={handleOptionClick} 
                value={answer}>
                {answer}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  );
}

export default QuizPage;

