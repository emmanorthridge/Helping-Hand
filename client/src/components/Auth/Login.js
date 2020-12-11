import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import AuthService from '../../services/auth.service';

const initialState = { username: '', password: '' };

const Login = (props) => {
  const [loginState, setLoginState] = useState(initialState);
  const [loginErrorMsg, setLoginErrorMsg] = useState('');

  const service = new AuthService();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginState);
    const { username, password } = loginState;

    service
      .login(username, password)
      .then((response) => {
        setLoginState(initialState);
        console.log(response);
        props.getUser(response);
        props.history.push(`/profile/${response._id}`);
      })
      .catch((error) => {
        // const { message } = error.response.data;
        // setLoginErrorMsg(message);
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginState({ ...loginState, [name]: value });
  };

  return (
    <div className='field'>
      <img src='/welcome.png' alt='alternative' width={300} height={300} />
      <h2>
        <strong>Log in</strong>
      </h2>
      <div className='form'>
        <form onSubmit={handleFormSubmit}>
          <label className='label'>Username:</label>
          <input
            className='input is-primary'
            type='text'
            name='username'
            value={loginState.username}
            onChange={handleChange}
          />

          <label className='label'>Password:</label>
          <input
            className='input is-primary'
            type='password'
            name='password'
            value={loginState.password}
            onChange={handleChange}
          />

          <input className='sign-button' type='submit' value='Login' />
        </form>
      </div>
      <br />

      {loginErrorMsg && <span style={{ color: 'red' }}>{loginErrorMsg}</span>}

      <p>
        Don't have account?
        <Link to={'/signup'}> Signup</Link>
      </p>
    </div>
  );
};

export default withRouter(Login);
