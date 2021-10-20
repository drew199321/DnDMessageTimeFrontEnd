import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';

import Landing from './Landing';
import Chatroom from './Chatroom';
import './App.css';

export default function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/chatroom" component={Chatroom} />
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </Router>
  );
}
