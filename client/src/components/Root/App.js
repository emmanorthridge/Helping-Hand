import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Signup from "../Auth/Signup";

import PostList from '../Posts/PostList';
import Home from '../Home/Home';
import Navbar from '../Navbar/Navbar'
import About from '../Home/About'

function App() {
  return (
    <div className='App'>
      <Router>
      <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />

          <Route exact path='/posts' component={PostList} />
          <Route exact path='/about' component={About} />
        </Switch>
      </Router>
      <footer class='footer'>
        <div class='content has-text-centered'>
          <p>
            <strong>Built by</strong> {' '}
            <a href='https://www.linkedin.com/in/emma-northridge/'>Emma Northridge</a> for the third Ironhack project
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
