import React, { Component } from 'react';
import { withRouter, BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import App from "../App";
import Dashboard from '../Screen/Dashboard'
import Login from "../Screen/Login";


function Routes() {
  return (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/setup-profile" component={Login} />
    </div>
  </Router>
  )
};

export default Routes
