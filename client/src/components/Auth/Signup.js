import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import AuthService from "../../services/auth.service";

const initialState = { username: "", password: "" };

const Signup = (props) => {
  const [regForm, setRegForm] = useState(initialState);
  const [regErrorMsg, setRegErrorMsg] = useState("");

  const service = new AuthService();

  // Form submission handler
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const { username, password, email } = regForm;

    // Use the service.signup method to make a call to the back end and sign the user up
    service
      .signup(username, password, email)
      .then((response) => {
        setRegForm(initialState);
        props.getUser(response);
        console.log("SIGN UP RESPONSE", response);
      })
      .catch((error) => {
        // console.log(error.response);
        const { message } = error.response.data;
        setRegErrorMsg(message);
      });
  };

  // Change handler
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