import React, { useState } from 'react';
import { CiUser } from "react-icons/ci";
import { GoSignOut } from "react-icons/go";
import { resetState } from '../redux/slices/userSlice';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FaBars } from "react-icons/fa6";
import './sidebar.css'; 

function SideBar() {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { userLoginStatus, currentUser } = useSelector(state => state.userLoginReducer);

  function logOut() {
    let actionObj = resetState();
    dispatch(actionObj);
    localStorage.removeItem('token');
    navigate('/')
  }

  const handleOptionSelect = (eventKey) => {
    // console.log(eventKey);
    navigate(`/stats/${currentUser.username}/${eventKey}`, { state: { eventKey } });
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  
  return (
    <div className='bg-transparent'>
         <button className="btn btn-transparent mt-1 p-0 mb-3" style={{color:"lemonchiffon",position:"fixed"}} onClick={toggleSidebar}>
        <FaBars className='icon fs-4' /> <p className='inline mt-1 lead mb-4 header-para'>Menu</p> 
      </button>
      <div className={`sidebar ${isSidebarVisible ? 'd-block' :'d-none'}`}>
        <ul className='list-unstyled p-2 mt-5 me-5 ms-2 '>
          <li className='mb-4'>
            <NavLink to={`/user-profile/${currentUser.username}`} className="d-flex align-items-center" style={{ textDecoration: "none", color: "lemonchiffon" }}>
              <CiUser className='icon' style={{ fontSize: "5vh", color: "lemonchiffon" }} />
              <p className='lead me-2 pt-1 header-para' style={{ textDecoration: "none", color: "lemonchiffon" }}>Profile</p>
            </NavLink>
          </li>
          <li className='mb-4'>
            <NavLink to={`/modules/${currentUser.username}`} className='ps-1 lead header-para' style={{ textDecoration: "none", color: "lemonchiffon"  }}>
              Modules
            </NavLink>
          </li>
          <li>
          <div className="mb-4">
                    <DropdownButton
                    id='dropdown-button'
                    drop='end'
                    variant="dark"
                    title="Leaderboard"
                    data-bs-theme="dark"
                    onSelect={handleOptionSelect} 
                    >
                    <Dropdown.Item eventKey="overall">Overall</Dropdown.Item>
                    <Dropdown.Item eventKey="dsa">DSA</Dropdown.Item>
                    <Dropdown.Item eventKey="os">OS</Dropdown.Item>
                    <Dropdown.Item eventKey="dbms">DBMS</Dropdown.Item>
                    <Dropdown.Item eventKey="java">Java</Dropdown.Item>
                    <Dropdown.Item eventKey="rn">ReactJS & NodeJS</Dropdown.Item>
                    <Dropdown.Item eventKey="hcj">HTML CSS & JS</Dropdown.Item>
                    </DropdownButton>
            </div>
          </li>
          <li className='mb-4'>
            <NavLink to={`/user-profile/${currentUser.username}`} className='lead header-para ps-1' style={{ textDecoration: "none", color: "lemonchiffon"  }}>
                Dashboard
            </NavLink>
          </li>
          <li>
            <button className='btn bg-transparent p-0 d-flex align-items-center' onClick={logOut} style={{ color: "lemonchiffon" }}>
              <GoSignOut className='icon' style={{ fontSize: "4vh", color: "lemonchiffon" }} />
              <p className='lead me-5 pt-1 ps-1 header-para'style={{ color: "lemonchiffon" }}>LogOut</p> 
            </button>
          </li>
        </ul>
        </div>
        </div>
       
  )
}

export default SideBar;
