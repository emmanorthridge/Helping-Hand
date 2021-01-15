import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

import AuthService from '../../services/auth.service';

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
      <nav
        className='navbar is-primary'
        role='navigation'
        aria-label='main navigation'
      >
        <div className='nav'>
          <div className='navbar-start'>
            <div className='logo'>
              <Link to='/'>
                <img
                  src='/superman.png'
                  alt='alternative'
                  width={50}
                  height={20}
                />
              </Link>
              <Link to='/'>
                <img
                  src='/handnav2.png'
                  alt='alternative'
                  width={100}
                  height={200}
                />
              </Link>
            </div>
            <div className='about'>
              <Link
                className='button is-white is-outlined'
                to='/about'
                style={{ textDecoration: 'none' }}
              >
                <strong>About</strong>
              </Link>
            </div>
          </div>
        </div>

        <div className='navbar-end'>
          <div className='buttons'>
            <Link
              className='button is-white is-outlined'
              to='/posts'
              style={{ textDecoration: 'none' }}
            >
              <strong>Posts</strong>
            </Link>
            <Link
              className='button is-white is-outlined'
              to={`/profile/${loggedInUser._id}`}
              style={{ textDecoration: 'none' }}
            >
              <strong>My Profile Page</strong>
            </Link>

            <Link className='button is-white is-outlined' to='/'>
              <strong onClick={logoutUser}>Logout</strong>
            </Link>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav
        className='navbar is-primary'
        role='navigation'
        aria-label='main navigation'
      >
        <div className='navbar-start'>
          <div className='logo'>
            <Link to='/'>
              <img
                src='/superman.png'
                alt='alternative'
                width={50}
                height={20}
              />
            </Link>
          </div>
          <div className='about'>
            <Link
              className='button is-white is-outlined'
              to='/about'
              style={{ textDecoration: 'none' }}
            >
              <strong>About</strong>
            </Link>
          </div>
        </div>
        <div className='navbar-end'>
          <div className='buttons'>
            <Link
              className='button is-white  is-outlined'
              to='/signup'
              style={{ textDecoration: 'none' }}
            >
              <strong>Sign up</strong>
            </Link>
            <Link
              className='button is-white  is-outlined'
              to='/login'
              style={{ textDecoration: 'none' }}
            >
              <strong>Log in</strong>
            </Link>
          </div>
        </div>
      </nav>
    );
  }
};

export default Navbar;
