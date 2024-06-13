import axios from 'axios';
import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { HiTrophy } from "react-icons/hi2";
import './leaderboard.css'
import { useLocation } from 'react-router-dom';
import { RiSparklingLine } from "react-icons/ri";


function Leaderboard() {

  let { state } = useLocation();
  let {currentUser} = useSelector(state=>state.userLoginReducer);
  let [arr,setArr] = useState([]);
  sessionStorage.setItem('quiz-completed',true)
  const fetchStandings = async (eventKey) => {
    if (!eventKey) eventKey = 'overall'; 
    try {
      const response = await axios.get(`http://localhost:4000/user-api/${eventKey}`+'scores');
      if (response.data.message === 'Data Received') {
        const sortedArray = response.data.payload.sort((a, b) => b.score - a.score);
        setArr(sortedArray);
      } else {
        console.log("error", response.data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchStandings(state ? state.eventKey : 'overall'); 
  }, [state]);
  return (
    <div className='containerDashboard mt-5 me-5 bg-transparent' style={{marginLeft:"20vw"}}>
          <table>
            <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
            </thead>
            <tbody className='text-light'>
          {
            arr.map((user,idx)=><tr key={idx} className={user.username === currentUser.username ? 'highlight' : ''}>
                <td>
                  {idx===0 && <HiTrophy className='ps-1' style={{fontSize:"7vh",color:"gold",border:"1px",borderColor:"silver"}}/>} {idx+1}
                  {user.username === currentUser.username && idx === 0 && <RiSparklingLine className='sparkling' />}
                </td>
                <td>{user.username}</td>
                <td>{user.score}</td>
              </tr>)
          }
          </tbody>
          </table>
          </div>
  )
}

export default Leaderboard
