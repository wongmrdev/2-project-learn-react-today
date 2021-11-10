import React from 'react';
import { Switch, Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './Home.js';
import Login from './login/Login';
import Registration from './login/Registration'
import Header from './Header'
import PrivateRoute from '../routes/PrivateRoute'
import VerifyEmail from './login/VerifyEmail'

class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Header} />
        <Switch>
          <Route exact path="/"
            render={() => {
              return ((localStorage.getItem("isLoggedIn") === "true") ? <Redirect to="/home" /> : <Redirect to="/login" />)
            }} />
          <PrivateRoute exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/verify-email" component={VerifyEmail} />
        </Switch>
      </Router>
    );
  }
}

export default Routes;
