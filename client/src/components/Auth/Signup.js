import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import AuthService from '../../services/auth.service';

const initialState = { username: '', password: '' };

const Signup = (props) => {
  const [regForm, setRegForm] = useState(initialState);
  const [regErrorMsg, setRegErrorMsg] = useState('');

  const service = new AuthService();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { username, password} = regForm;

    service
      .signup(username, password)
      .then((response) => {
        setRegForm(initialState);
        props.getUser(response);
        console.log('SIGN UP RESPONSE', response);
        props.history.push(`/profile/${response._id}`);
      })
      .catch((error) => {
        const { message } = error.response.data;
        setRegErrorMsg(message);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRegForm({ ...regForm, [name]: value });
  };

  return (
    <div className='field'>
      <img src='/hand2.png' alt='alternative' width={300} height={300} />

      <div className='signup-form'>
        <h2>
          <strong>Sign up</strong>
        </h2>

        <div className='form'>
          <form onSubmit={handleFormSubmit}>
    
            <label className='label'>Username:</label>
            <input
              className='input is-primary'
              type='text'
              name='username'
              value={regForm.username}
              onChange={handleChange}
            />

            <label className='label'>Password:</label>
            <input
              className='input is-primary'
              type='password'
              name='password'
              value={regForm.password}
              onChange={handleChange}
            />

            <input className='sign-button' type='submit' value='Signup' />
          </form>
          <br />
        </div>

        {regErrorMsg && <span style={{ color: 'red' }}>{regErrorMsg}</span>}

        <p>
          Already have account?
          <Link to={'/'}> Login</Link>
        </p>
      </div>
    </div>
  );
};

export default withRouter(Signup);
