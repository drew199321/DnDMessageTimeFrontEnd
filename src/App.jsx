import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';

import PrivateRoute from './_components/PrivateRoute';
import Landing from './Landing';
import Chatroom from './Chatroom';
import './App.css';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Landing} />
        <PrivateRoute exact path="/chatroom" component={Chatroom} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}
