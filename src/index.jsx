import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';

import PrivateRoute from './_components/PrivateRoute';
import Landing from './Landing';
import Chatroom from './chatroom/Chatroom';
import Registration from './Registration';
import './Index.css';

function App() {
  return (
    <Router basename="/dnd">
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/registration" component={Registration} />
        <PrivateRoute exact path="/chatroom" component={Chatroom} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
