import {useState, useEffect} from 'react';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Teacher from './components/Teacher/Teacher';
import Login from './components/Login/Login';
import Topics from './components/Topics/Topics';
import {
  HashRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {

  return (
     <Router>

      <Switch>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/teacher">
            <Teacher />
          </Route>
          <Route path="/student">
            <Dashboard />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          
          
      </Switch>

    </Router>
  );
}

export default App;
