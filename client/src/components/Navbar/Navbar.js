import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // const service = new AuthService();

  // Mimic lifecycle method when a component updates
  useEffect(() => {
    setLoggedInUser(props.userInSession);
  }, [props.userInSession]);

  //    // function to log user out
  // const logoutUser = () => {
  //   service.logout().then(() => {
  //     // reset state value
  //     setLoggedInUser(null);
  //     props.getUser(null);
  //   });
  // };

  if (loggedInUser) {
    return (
      <nav className='navbar' role='navigation' aria-label='main navigation'>
        {/* <div className='navbar-start'>
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
      </div> */}
        <ul>
          <li>
            {/* <div className='navbar-end'>
        <div className='buttons'>
          <div className='nav-bar item'> */}
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
            <Link to='/'>
              <button>Logout</button>
            </Link>
          </li>
        </ul>
      </nav>
    );
  } else {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link
                className='button is-info is-outlined'
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
