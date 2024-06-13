import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.css';

function Header() {
  return (
    <div className='container mx-auto'>
      <ul className="bar nav p-2 d-flex justify-content-end align-items-center">
        <li className="nav-item">
          <NavLink className="item nav-link fs-4" to="/" >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="item nav-link fs-4" to="/modules" >
            Modules
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="item nav-link fs-4" to="/register" >
            SignUp
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="item nav-link fs-4" to="/login" >
            SignIn
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Header;























