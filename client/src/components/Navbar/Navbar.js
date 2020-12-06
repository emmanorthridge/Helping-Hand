import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
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
      </div>
      <div className='navbar-end'>
        <div className='buttons'>
          <div className='nav-bar item'>
            <ul>
              <li>
                <Link
                  className='button is-danger'
                  to='/signup'
                  style={{ textDecoration: 'none' }}
                >
                  <strong>Sign up</strong>
                </Link>
                <Link
                  className='button is-green'
                  to='/login'
                  style={{ textDecoration: 'none' }}
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
