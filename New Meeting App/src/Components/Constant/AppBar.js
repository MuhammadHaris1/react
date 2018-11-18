import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { InputLabel, MenuItem, Select, Input, Chip } from '@material-ui/core'
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar/Avatar';
import firebase from '../../Config/Firebase'
import Button from '@material-ui/core/Button/Button';
import history from '../../Config/history'
import EditIcon from '@material-ui/icons/Edit';
import AccountCircle from '@material-ui/icons/AccountCircle';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Icon from '@material-ui/core/Icon'
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import { TextField, FormControl } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import Logo from '../../Screen/Dashboard/images.jpg'
// import Login from '../../Screen/Login'
// import Dashboard from '../../Screen/Dashboard';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

// const styles = {
//   appBar: {
//     position: 'relative',
//   },
//   flex: {
//     flex: 1,
//   },
// };

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class PersistentDrawerLeft extends React.Component {
  constructor() {
    super()
    this.state = {
      open: false,
      isSignedIn: false,
      uidArr: [],
      currentUser: null,
      openPopUp: false,
      beverages: [],
      timeOfMeeting: [],
      currentUserKey: '',
    };
    this.logout = this.logout.bind(this);
    this.updateUserProfile = this.updateUserProfile.bind(this);
    this.nickName = this.nickName.bind(this);
    this.phoneNumber = this.phoneNumber.bind(this);

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

  logout() {
    const { logout } = this.props;
    // console.log(this.props)
    firebase.auth().signOut()
    localStorage.clear()
    history.push('/')
    this.setState({ isSignedIn: false, currentUser: null, open: false })
    logout()
  }

  componentWillMount() {
    const { uidArr, currentUser } = this.state;
    var uid = localStorage.getItem('uid')
    currentUser && this.setState({ uid, beverages: currentUser.beverage, timeOfMeeting: currentUser.meetingDuration })
    firebase.database().ref(`/users/`).on('child_added', snapShot => {
      var currentUser = snapShot.val()
      // console.log(currentUser)
      uidArr.push(currentUser.uid)
      this.setState({ uidArr })
    })
  }

  componentDidMount = () => {
    const { uidArr } = this.state;
    firebase.auth().onAuthStateChanged(user => {
      // console.log(user)
      uidArr.includes(firebase.auth().currentUser.uid) ? history.push(`/setup-profile`) : history.push(`/dashboard/${user.displayName}`)

      localStorage.setItem('uid', user.uid)
      var currentUseruid = firebase.auth().currentUser.uid
      firebase.database().ref(`/users/${currentUseruid}/`).on('child_added', snapShot => {
        var currentUser = snapShot.val()
        var currentUserKey = snapShot.key
        // console.log(snapShot.key)
        
        this.setState({ currentUser, currentUserKey })
      })
      this.setState({ isSignedIn: !!user })
    })


  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleClickOpen = () => {
    this.setState({ openPopUp: true });
  };

  handleClose = () => {
    this.setState({ openPopUp: false });
  };

  beverages = event => {
    // const { beverages } = this.state
    const { beverage } = this.props
    this.setState({ beverages: event.target.value });
    // beverage(event.target.value)
  };

  durations = event => {
    // const { timeOfMeeting } = this.state
    const { durations } = this.props
    this.setState({ timeOfMeeting: event.target.value });
    // durations(event.target.value)
  };

  updateUserProfile() {
    const { beverages, timeOfMeeting, nickName, phoneNumber, currentUser, currentUserKey } = this.state
    // console.log( beverages, timeOfMeeting, nickName, phoneNumber )

  const userObj = {
            fullName: firebase.auth().currentUser.displayName,
            profilePic: firebase.auth().currentUser.photoURL,
            nickName: nickName ? nickName : currentUser.nickName,
            images: currentUser.images,
            phoneNumber: phoneNumber ? phoneNumber : currentUser.phoneNumber,
            userLocation: currentUser.userLocation,
            beverages: beverages.length === 0 ? currentUser.beverages : beverages,
            meetingDuration: timeOfMeeting.length === 0 ? currentUser.meetingDuration : timeOfMeeting,
            uid: firebase.auth().currentUser.uid
        }
        console.log(userObj)
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/${currentUserKey}/`).update(userObj)
        this.setState({ currentUser: userObj})
      }

  nickName(e) {
    const nickName = e.target.value
    // console.log(nickName)
    this.setState({nickName})
}

phoneNumber(e) {
    const phoneNumber = e.target.value
    // console.log(nickName)
    this.setState({phoneNumber})
}

  render() {
    const { classes, theme } = this.props;
    const { open, isSignedIn, currentUser } = this.state;
    // console.log(this.state)
    const names = [
      'Coffee',
      'Juice',
      'Cocktial',
    ];
    const durations = [
      '20 min',
      '60 min',
      '120 min',
    ];
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              {isSignedIn && <AccountCircle />}
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
             <img src={Logo} height={50} width={100} /> <i style={{marginTop: 50}}>Meeting App</i>
            </Typography>
            {!isSignedIn && <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
            }
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            {isSignedIn && currentUser && <List>
              <ListItem>
                <Avatar src={firebase.auth().currentUser.photoURL} />
                <ListItemText primary={firebase.auth().currentUser.displayName} secondary={`(${currentUser.nickName})`} />
              </ListItem>
            </List>
            }
            <IconButton onClick={this.handleDrawerClose}>

              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem>
              {currentUser && <div>
              <ListItemText primary="Phone Number:" secondary={currentUser.phoneNumber} />
             
              </div>
            }
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              {currentUser && <ListItemText primary="Beverages:" secondary={currentUser.beverages.map(value => <li>{value}</li>)} />}
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
              {currentUser && <ListItemText primary="Meeting Durations:" secondary={currentUser.meetingDuration.map(value => <li>{value}</li>)} />}
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem>
            <div>
        <Button onClick={this.handleClickOpen}>
         <Button variant="fab" aria-label="Edit" >
                <EditIcon />
              </Button>
              </Button>
        <Dialog
          fullScreen
          open={this.state.openPopUp}
          onClose={this.handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
                Edit Profile
              </Typography>
              <Button color="inherit" onClick={this.updateUserProfile}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <List style={{padding: 50}}>
            <ListItem >
            <FormControl>
                    <TextField
                        id="outlined-full-width"
                        // id="outlined-name"
                        label="Nickname"
                        required
                        fullWidth
                        // className={classes.textField}
                        // value={currentUser && currentUser.nickName}
                        onChange={this.nickName}
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        required
                        id="outlined-full-width"
                        fullWidth
                        style={{width:400}}
                        type="number"
                        // id="outlined-name"
                        label="Phone Number"
                        // className={classes.textField}
                        // value={currentUser && currentUser.phoneNumber}
                        onChange={this.phoneNumber}
                        margin="normal"
                        variant="outlined"
                    />
                    <FormControl>
                    <InputLabel htmlFor="select-multiple-chip">Select Beverages</InputLabel>
          <Select
            multiple
            fullWidth
            style={{width: 500}}
            value={this.state.beverages}
            onChange={this.beverages}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div>
                {selected.map(value => (
                  <Chip key={value} label={value}/>
                ))}
              </div>
            )}
          >
            {names.map(name => (
              <MenuItem
                key={name}
                value={name}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="select-multiple-chip">Duration Of Meeting</InputLabel>
          <Select
            multiple
            fullWidth
            style={{width: 500}}
            value={this.state.timeOfMeeting}
            onChange={this.durations}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div>
                {selected.map(value => (
                  <Chip key={value} label={value}/>
                ))}
              </div>
            )}
          >
            {durations.map(name => (
              <MenuItem
                key={name}
                value={name}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
                </FormControl>
                </FormControl>
            </ListItem>
            <Divider />
           
          </List>
        </Dialog>
      </div>
            </ListItem>
          </List>
         
          <Divider />
          <List>
            <center>
              {isSignedIn && <div>
                <Button color='secondary' onClick={this.logout}>Log out</Button>
                
              </div>
              }
            </center>
          </List>
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {/* {isSignedIn && !currentUser && <Login />}
          {isSignedIn && currentUser && <Dashboard />} */}
        </main>
      </div>
    );
  }
}

PersistentDrawerLeft.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(PersistentDrawerLeft);