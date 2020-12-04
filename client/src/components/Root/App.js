import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PostList from '../Posts/PostList';
import Home from '../Home';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/posts' component={PostList} />
        </Switch>
      </Router>
      <footer class='footer'>
        <div class='content has-text-centered'>
          <p>
            <strong>Built by</strong> by{' '}
            <a href='https://jgthms.com'>Emma Northridge</a> for the final Ironhack project
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
