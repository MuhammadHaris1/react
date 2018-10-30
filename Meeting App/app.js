import React, { Component } from 'react';
import firebase from './Config/Firebase';
import './App.css';
import { AppBar, Toolbar, IconButton, Typography, Button, List, ListItem, Avatar, ListItemText } from '@material-ui/core'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Login from './Screen/Login'
import Dashboard from './Screen/Dashboard';
import Routes from './Config/Router';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  constructor() {
    super()
    this.state = {
      isSignedIn: false,
      currentUser: null
    }
    // this.sign = this.sign.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
    this.logout = this.logout.bind(this)
  }

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callBack: {
      sigInSuccess: () => false
    }
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      var currentUseruid = firebase.auth().currentUser.uid
      firebase.database().ref(`/users/${currentUseruid}/`).on('child_added', snapShot => {
        var currentUser = snapShot.val()
        this.setState({ currentUser })
      })
      this.setState({ isSignedIn: !!user })
    })


  }

  logout() {
    firebase.auth().signOut()
    this.setState({ isSignedIn: false, currentUser: null })
  }

  renderHeader() {
    const { isSignedIn } = this.state
    return (
      <div className="head">
        <AppBar position="static" >
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              {/* <MenuIcon /> */}
              <Typography variant="title" color="inherit" >
                Meeting App
            </Typography>
            </IconButton>
            {isSignedIn ? (
                  <div style={{float: 'right', marginLeft: 200}}>
                    <List >
                      <ListItem>
                        <Avatar src={firebase.auth().currentUser.photoURL} />
                        <ListItemText primary={firebase.auth().currentUser.displayName} />
                    <Button onClick={this.logout}>Log Out</Button>
                      </ListItem>
                    </List>
                  </div>
              
            ) :
              <div className="login-but">
                <StyledFirebaseAuth
                  uiConfig={this.uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              </div>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  renderProfile() {
    // const { isSignedIn } = this.state
    return (
      <div>
        <img src={firebase.auth().currentUser.photoURL} />
        <p>{firebase.auth().currentUser.displayName}</p>
        <button onClick={this.logout} > logout</button>
      </div>
    )
  }

  render() {
    const { isSignedIn, currentUser } = this.state
    // console.log(currentUser)
    return (
      <div className="App">
        {this.renderHeader()}
        <p className="App-intro">
          {isSignedIn && !currentUser && <Login />}
          {isSignedIn && currentUser && <Dashboard />}
        </p>

      </div>
    );
  }
}

export default App;


