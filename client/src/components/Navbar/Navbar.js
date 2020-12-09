import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthService from "../../services/auth.service";

const Navbar = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const service = new AuthService();

  useEffect(() => {
    setLoggedInUser(props.userInSession);
  }, [props.userInSession]);

  const logoutUser = () => {
    service.logout().then(() => {
      setLoggedInUser(null);
      props.getUser(null);
    });
  };

  if (loggedInUser) {
    return (
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        <div className='navbar-start'>
        <div className='logo'>
        <Link to="/">
          <img src='/superman.png' alt='alternative' width={50} height={20} />
          </Link>
        </div>
        <div className='about'>
          <Link
            className='button is-primary'
            to='/about'
            style={{ textDecoration: 'none' }}
          >
            <strong>About</strong>
          </Link>
        </div>
      </div>
         {/* <div className='navbar-end'>
        <div className='buttons'>
          <div className='nav-bar item'> */}
        <ul>
          <li>
            <Link
              className='button is-info is-outlined'
              to='/posts'
              style={{ textDecoration: 'none' }}
            >
              <strong>Posts</strong>
            </Link>
            {/* <div>
                </div>
                </div> */}
          </li>
          <li>
          <Link
              className='button is-info is-outlined'
              to={`/profile/${loggedInUser._id}`}
             
              style={{ textDecoration: 'none' }}
            >
              <strong>My Profile Page</strong>
            </Link>
            </li>
          <li>
            <Link to='/'>
            <button onClick={logoutUser}>Logout</button>
            </Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      
      <div className='navbar-start'>
        <div className='logo'>
          <img src='/superman.png' alt='alternative' width={50} height={20} />
        </div>
        <div className='about'>
          <Link
            className='button is-primary'
            to='/about'
            style={{ textDecoration: 'none' }}
          >
            <strong>About</strong>
          </Link>
        </div>
        <nav>
          <ul>
            <li>
              <Link
                className='button is-danger is-outlined'
                to='/signup'
                style={{ textDecoration: 'none' }}
              >
                <strong>Sign up</strong>
              </Link>
            </li>
            <li>
              <Link
                className='button is-info is-outlined'
                to='/login'
                style={{ textDecoration: 'none' }}
              >
                <strong>Login</strong>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
};

export default Navbar;