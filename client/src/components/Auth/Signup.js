import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthService from "../../services/auth.service";

const initialState = { username: "", password: "" };

const Signup = (props) => {
  const [regForm, setRegForm] = useState(initialState);
  const [regErrorMsg, setRegErrorMsg] = useState("");

  const service = new AuthService();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { username, password, email } = regForm;

    service
      .signup(username, password, email)
      .then((response) => {
        setRegForm(initialState);
        props.getUser(response);
        console.log("SIGN UP RESPONSE", response);
        props.history.push(`/profile/${response._id}`)

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
    <div>
      <h2>Sign up</h2>
      <form onSubmit={handleFormSubmit}>
      <label>Email:</label>
        <input
          type="text"
          name="email"
          value={regForm.email}
          onChange={handleChange}
        />
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={regForm.username}
          onChange={handleChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={regForm.password}
          onChange={handleChange}
        />

        <input type="submit" value="Signup" />
      </form>
      <br />

      {regErrorMsg && <span style={{ color: "red" }}>{regErrorMsg}</span>}

      <p>
        Already have account?
        <Link to={"/"}> Login</Link>
      </p>
    </div>
  );
};

export default withRouter (Signup);