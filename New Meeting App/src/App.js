import React, { Component } from 'react';
import firebase from './Config/Firebase';
import './App.css';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PersistentDrawerLeft from './Components/Constant/AppBar'
import { AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Button, 
  List, 
  ListItem, 
  Avatar, 
  ListItemText, 
  Stepper, 
  Step,
  CssBaseline,
  Drawer,
  Divider,
  ListItemIcon
} from '@material-ui/core';
import PropTypes from 'prop-types';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Login from './Screen/Login'
import Dashboard from './Screen/Dashboard';
import Routes from './Config/Router';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import history from './Config/history'
// import state from 'sweetalert/typings/modules/state';

class App extends Component {
  constructor() {
    super()
    this.state = {
      isSignedIn: false,
      currentUser: null,
      uidArr: [],
      open: false,
    }
    // this.sign = this.sign.bind(this);
    this.logout = this.logout.bind(this)
    // console.log(props)
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callBack: {
      sigInSuccess: () => false,
    }
    
  }
  componentDidMount = () => {
    const { uidArr } = this.state;
    firebase.auth().onAuthStateChanged(user => {
      // console.log(user)
      uidArr.includes(firebase.auth().currentUser.uid) ?history.push(`/setup-profile`) : history.push(`/dashboard/${user.displayName}`)
        
      localStorage.setItem('uid', user.uid)
      var currentUseruid = firebase.auth().currentUser.uid
      firebase.database().ref(`/users/${currentUseruid}/`).on('child_added', snapShot => {
        var currentUser = snapShot.val()
        // console.log(currentUser)
        
        this.setState({ currentUser })
      })
      this.setState({ isSignedIn: !!user })
    })


  }

  componentWillMount() {
    const { uidArr } = this.state;
    firebase.database().ref(`/users/`).on('child_added', snapShot => {
      var currentUser = snapShot.val()
      // console.log(currentUser)
      uidArr.push(currentUser.uid)
      this.setState({uidArr})
    })
  }

  logout() {
    this.setState({ isSignedIn: false, currentUser: null })
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { isSignedIn, currentUser, open } = this.state;
    console.log(this.props)
    
    return (
      <div className="App">
        <PersistentDrawerLeft logout={this.logout} />          
     
          {isSignedIn && !currentUser && <Login />}
          {isSignedIn && currentUser && <Dashboard logout={this.logout} />}
      </div>
    );
  }
}

export default App;