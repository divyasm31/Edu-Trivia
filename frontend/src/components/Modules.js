import React, { useState } from 'react'
import '../App.css';

// import { MdOutlineAccountCircle } from "react-icons/md";
import dbmsimg from '../images/dbms.png'
import dsaimg from '../images/dsa.webp'
import hcjimg from '../images/htmlcssjs.jpg'
import javaimg from '../images/java.png'
import osimg from '../images/os.jpg'
import rnimg from '../images/reactnode.png'
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import { NavLink,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import BodyHeader from './BodyHeader';
import './modules.css'



function Modules() {

  let modules=[
    {
      img:dsaimg,
      sub:"Data Structures & Algorithms",
      subbtn:"dsa"
    },
    {
      img:osimg,
      sub:"Operating Systems",
      subbtn:"os"
    },
    {
      img:dbmsimg,
      sub:"Database Management System",
      subbtn:"dbms"
    },
    {
      img:javaimg,
      sub:"Java",
      subbtn:"java"
    },
    {
      img:hcjimg,
      sub:"HTML CSS & Javascript",
      subbtn:"hcj"
    },
    {
      img:rnimg,
      sub:"Reactjs & Nodejs",
      subbtn:"rn"
    }
  ]
  let [displayMessage,setDisplayMessage] = useState('')
  let [showDialogue,setShowDialogue] = useState(false)
  // let dispatch = useDispatch();
  let navigate = useNavigate();
  let {userLoginStatus,currentUser} = useSelector(state=>state.userLoginReducer)
  async function takeQuiz(mod){
    // let token=localStorage.getItem('token')
    // let axiosWithToken=axios.create({
    //   headers:{Authorization:`Bearer ${token}`}
    // })
    if(userLoginStatus){
        let urlNext=`/take-quiz/${currentUser.username}`
        navigate(urlNext,{state:mod})
    }else{
      setDisplayMessage('Please login to take the quiz');
      setShowDialogue(true);
    }
  }
 
  // MdOutlineAccountCircle FaUser
  return (
    <div className='bg-transparent'>
      <BodyHeader />
      <div className="container d-block mx-auto m-5 text-center">
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-3 gx-4">
          {
            modules.map((mod, idx) => (
              <div key={idx} className="col h-50">
                <div className="card crd mb-4">
                  <div className='card-header crdh'>
                      <img className='img-fluid w-50' src={mod.img} alt='' /> 
                  </div>
                  <div className="card-body crdhb text-center">
                    <h5 className="card-title">{mod.sub}</h5>
                  </div>
                  {/* onClick={handleSubmit} */}
                  <div className='card-footer crdhf'>
                    <button className='btn border mx-auto quizButton' onClick={()=>takeQuiz(mod)} >Take Quiz</button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <Modal show={showDialogue} onHide={() => setShowDialogue(false)}>
        <Modal.Body closeButton>
          {displayMessage}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDialogue(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => navigate('/login')}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Modules;
