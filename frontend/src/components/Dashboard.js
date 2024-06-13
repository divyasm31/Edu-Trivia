import React from 'react'
import { useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import QuizPieChart from './QuizPieChart';
import axios from 'axios';

function Dashboard() {

    let { state } = useLocation();
    let {currentUser} = useSelector(state=>state.userLoginReducer);
    let [correctAnsArray,setCorrectAnsArray] = useState([]);
    let [wrongAnsArray,setWrongAnsArray] = useState([]);
    let [ca,setCA]=useState(0)
    let [wa,setWA]=useState(0)
    let [mod,setMod]=useState('')
    let [total,setTotal] = useState();
    // let [caPercentage,setCAPercentage]=useState(0);
    // let [waPercentage,setWAPercentage]=useState(0);
    sessionStorage.setItem('quiz-completed',true)
    const fetchDetails = async (eventKey) => {
        
      if (!eventKey) eventKey = 'overall'; 
      setMod(eventKey);
      try {
        const response = await axios.get(`http://localhost:4000/user-api/answers/${eventKey}`);
        // console.log(response)
        const receivedData=response.data.payload
        if (response.data.message === 'Data Received') {
        let temp = receivedData.filter((obj)=>obj.username===currentUser.username);
        // console.log(temp);
          setCA(temp[0].correctAnswers);
          setWA(temp[0].wrongAnswers)
        } else {
          console.log("error", response.data.message);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
  
    useEffect(() => {
      fetchDetails(state ? state.eventKey : 'overall'); 
    }, [state]);

    useEffect(() => { 
        console.log(ca);
        console.log(wa);
        setTotal(ca+wa);
      }, [ca, wa]);

  return (
    <div className='d-flex justify-content-center align-items-center gap-2 bg-transparent'>
          <div className='bg-transparent'>
            <QuizPieChart correctAnswers={ca} wrongAnswers={wa}  />
          </div>
          <div className='align-self-center w-50 text-center h-50' style={{backgroundColor:"lightseagreen"}}>
            <h4 className='m-2 bg-transparent' style={{color:"whitesmoke"}}>{mod}</h4>
            <h5 className='bg-transparent m-2' style={{color:"whitesmoke"}}>Total Questions: {total}</h5>
          </div>
    </div>
  )
}

export default Dashboard
