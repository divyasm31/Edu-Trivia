import React from 'react'
import { CiUser } from "react-icons/ci";
import { TiAdjustBrightness } from "react-icons/ti";
import { GoSignOut } from "react-icons/go";
import { MdOutlineLeaderboard } from "react-icons/md";
import { resetState } from '../redux/slices/userSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import './bodyheader.css'

function BodyHeader() {

    let navigate = useNavigate();
    let dispatch = useDispatch();
    let { userLoginStatus, currentUser } = useSelector(state => state.userLoginReducer);
    let [displayMessage, setDisplayMessage] = useState('');
    let [showDialogue, setShowDialogue] = useState(false);

    function viewUserProfile() {
        if (userLoginStatus) {
            navigate(`/user-profile/${currentUser.username}`);
        } else {
            setDisplayMessage('Please login to view your profile');
            setShowDialogue(true);
        }
    }

    function viewLeaderboard() {
        if (userLoginStatus) {
            navigate(`/stats/${currentUser.username}`);
        } else {
            setDisplayMessage('Please login to view the leaderboard');
            setShowDialogue(true);
        }
    }

    function logOut() {
        let actionObj = resetState();
        dispatch(actionObj);
        localStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div className='bg-transparent'>
            <div className='head' style={{ backgroundColor: "transparent", padding: "10px" }}>
                <ul className='list-unstyled list-inline d-flex justify-content-around align-items-center pt-2 pb-2'>
                    <li className='list-inline-item'>
                        <button className='btn btn-transparent' onClick={viewUserProfile}>
                            <CiUser className='icon' style={{ fontSize: "5vh", color: "lemonchiffon" }} />
                            <p className='d-inline lead text-light ms-2 header-para'>Welcome, {currentUser.username}</p>
                        </button>
                    </li>
                    <li className='list-inline-item'>
                        <button className='btn btn-transparent text-light lead' onClick={viewLeaderboard}>
                        <MdOutlineLeaderboard className='icon' style={{ fontSize: "5vh", color: "lemonchiffon" }}  />
                        <p className='d-inline lead text-light ms-2 header-para'>Leaderboard</p>
                        </button>
                    </li>
                    <li className='list-inline-item'>
                        <button className='btn btn-transparent' onClick={logOut}>
                            <GoSignOut className='icon' style={{ fontSize: "4vh", color: "lemonchiffon" }} />
                            <p className='d-inline lead text-light ms-2 header-para'>LogOut</p>
                        </button>
                    </li>
                </ul>
            </div>
            <Modal show={showDialogue} onHide={() => setShowDialogue(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Notice</Modal.Title>
                </Modal.Header>
                <Modal.Body>{displayMessage}</Modal.Body>
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
    );
}

export default BodyHeader;


