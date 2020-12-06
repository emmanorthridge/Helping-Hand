import React, { useState } from "react";
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Signup from "../Auth/Signup";
import AuthService from "../../services/auth.service";

import PostList from '../Posts/PostList';
import Home from '../Home/Home';
import Navbar from '../Navbar/Navbar'
import About from '../Home/About'

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const service = new AuthService();

  const fetchUser = () => {
    if (loggedInUser === null) {
      service
        .isAuthenticated()
        .then((response) => {
          setLoggedInUser(response);
        })
        .catch((err) => {
          setLoggedInUser(false);
        });
    }
  };

  const getLoggedInUser = (userObject) => {
    setLoggedInUser(userObject);
  };
  
  fetchUser();
  
  return loggedInUser ? (
    <section className='App'>
       <Router>
      <Navbar userInSession={loggedInUser}/>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/posts' component={PostList} />
          <Route exact path='/about' component={About} />
        </Switch>
        </Router>
        </section>
  ) : (
      <section className='App'>
        <Router>
         <Navbar userInSession={loggedInUser}/>
         <Switch>
        <Route exact path='/signup' render={() => <Signup getUser={getLoggedInUser} />}
          />
           <Route exact path='/' component={Home} />
           <Route exact path='/about' component={About} />
           </Switch>
           </Router>
           </section>
  
  );
}



export default App;
