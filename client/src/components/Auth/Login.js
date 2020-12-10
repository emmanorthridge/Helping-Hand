import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import AuthService from "../../services/auth.service";

const initialState = { username: "", password: "" };

const Login = (props) => {
  const [loginState, setLoginState] = useState(initialState);
  const [loginErrorMsg, setLoginErrorMsg] = useState("");

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
        props.history.push(`/profile/${response._id}`)

      })
      .catch((error) => {
        // const { message } = error.response.data;
        console.log(error);
        setLoginErrorMsg(message);
   
      });
  };

  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginState({ ...loginState, [name]: value });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={loginState.username}
          onChange={handleChange}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={loginState.password}
          onChange={handleChange}
        />

        <input type="submit" value="Login" />
      </form>
      <br />

      {loginErrorMsg && <span style={{ color: "red" }}>{loginErrorMsg}</span>}

      <p>
        Don't have account?
        <Link to={"/signup"}> Signup</Link>
      </p>
    </div>
  );
};

export default withRouter (Login);