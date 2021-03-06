/* eslint-disable no-undef */
/* global google */

import React, { Component } from 'react'
import PersistentDrawerLeft from '../../Components/Constant/AppBar';

import {
    Button,
    TextField,
    FormControl,
    ListItem,
    ListItemText,
    Avatar,
    Table,
    TableRow,
    TableBody,
    Paper,
    TableCell,
    TableHead,
    AppBar,
    Tabs,
    Tab,
    Typography,
    Zoom,
    Icon,
    Badge
} from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import { Card, CardWrapper } from 'react-swipeable-cards';
import firebase from '../../Config/Firebase'
import EndCall from './end.jpg'
import Call from './call.png'
import swal from "sweetalert";
import '../../App.css';
import { Slide } from 'react-slideshow-image';
import MeetingPoint from './MeetingPoint';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps";
import ApBar from '../../Components/Constant/AppBar'

function TabContainer(props) {
    const { children, dir } = props;

    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
}



class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            startMeeting: false,
            meetingScreen: false,
            // meetingLocation:{},
            data: [],
            currentUser: {},
            meetingReciever: [],
            meetingSender: [],
            value: 0,
            meetingLocation: null,
            pendingReqArr: []
        }
        this.renderMeetingScreen = this.renderMeetingScreen.bind(this)
        this.swipRight = this.swipRight.bind(this)
        this.searchText = this.searchText.bind(this)
        this.meetingLocation = this.meetingLocation.bind(this)
        this.sendReq = this.sendReq.bind(this)
        this.getMeetings = this.getMeetings.bind(this)
        this.getDirections = this.getDirections.bind(this)
        this.getPendingMeeting = this.getPendingMeeting.bind(this)
    }

    componentWillMount() {
        var uid = localStorage.getItem('uid')
        this.setState({ uid })
    }

    getPendingMeeting() {
        const { uid, pendingReqArr } = this.state
        firebase.database().ref('/meetings/').on('child_added', snap => {
            var pendingReq = snap.val()
            if (pendingReq.status === 'pending' &&  pendingReq.recieverId === uid) {
                console.log(pendingReq)
                pendingReqArr.push(pendingReq)
                this.setState({ pendingReqArr })
            }
            else {
                console.log('no pendings')
            }
        })
    }

    componentDidMount() {
        this.getPendingMeeting()
        this.getMeetings()
        this.getUsers()
        firebase.database().ref(`/users/${this.state.uid}/`).on('child_added', snapShot => {
            // console.log(snapShot.val())
            var currentUser = snapShot.val()
            this.setState({ currentUser })
            fetch(`https://api.foursquare.com/v2/venues/explore?client_id=OTF2RU1F2SMSGAORW5OCFHGTQOEVSJ4L5KDX4PZUQHECGXQK&client_secret=QBLSXQ0UO1IJGXRVZXKENHGRGD0GYSUUZUHAT1S3LNBAL3QI&v=20181022&limit=3&ll=${currentUser.userLocation.latitude},${currentUser.userLocation.longitude}&query=parks`)
                .then(res => res.json())
                .then(result => {
                    console.log(result.response.groups[0].items)
                    this.setState({ items: result.response.groups[0].items })
                })
                .catch(err => console.log(err))
        })
    }

    getUsers() {
        const { data } = this.state
        firebase.database().ref(`/users/`).on('child_added', snap => {
            var users = snap.val()
            for (var key in users) {
                if (users[key].uid !== this.state.uid) {
                    data.push(users[key])
                    this.setState({ data })
                }
            }
            // console.log(users)

        })
    }

    getMeetings() {
        const { meetingSender, meetingReciever } = this.state
        firebase.database().ref(`/meetings/`).on('child_added', snap => {
            // console.log(snap.val())
            const meeting = snap.val()
            const key = [snap.key]
            meeting.key = snap.key
            if (meeting.senderId === this.state.uid) {
                meetingSender.push(meeting)
                this.setState({ meetingSender })
            }
            if (meeting.recieverId === this.state.uid) {
                meetingReciever.push(meeting)
                // console.log([meeting, ...key])
                this.setState({ meetingReciever })
            }
        })
    }

    sendReq() {
        // console.log(item)
        const { date, time, meetingLocation, meetingReciever } = this.state;
        // console.log(meetingLocation)
        const reqObj = {
            date: date,
            time: time,
            location: meetingLocation,
            recieverName: meetingReciever.fullName,
            senderName: firebase.auth().currentUser.displayName,
            senderProfilePic: firebase.auth().currentUser.photoURL,
            recieverProfilePic: meetingReciever.profilePic,
            senderId: this.state.uid,
            recieverId: meetingReciever.uid,
            status: 'pending',
            sendingDate: new Date().toLocaleDateString()
        }
        console.log(reqObj)
        firebase.database().ref(`/meetings/`).push(reqObj)
        this.setState({
            meetingScreen: false,
            startMeeting: false
        })
    }

    searchText(e) {
        const { currentUser } = this.state
        var text = e.target.value
        // console.log(e.target.value)
        fetch(`https://api.foursquare.com/v2/venues/search?client_id=OTF2RU1F2SMSGAORW5OCFHGTQOEVSJ4L5KDX4PZUQHECGXQK&client_secret=QBLSXQ0UO1IJGXRVZXKENHGRGD0GYSUUZUHAT1S3LNBAL3QI&v=20181022&ll=${currentUser.userLocation.latitude},${currentUser.userLocation.longitude}&query=${text}`)
            .then(res => res.json())
            .then(result => {
                console.log(result)
                text !== '' ?
                    this.setState({
                        newItems: result.response.venues
                    }) :
                    this.setState({ newItems: null })
            })
            .catch(err => console.log(err))

    }

    getDirections() {
        const { currentUser, meetingLocation } = this.state
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
            origin: new google.maps.LatLng(currentUser.userLocation.latitude, currentUser.userLocation.longitude),
            destination: new google.maps.LatLng(meetingLocation.lat, meetingLocation.lng),
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                // console.log(result)
                this.setState({
                    directions: result,
                });
            } else {
                alert("Sorry! Can't calculate directions!")
            }
        });
    }

    meetingLocation(value) {

        this.setState({ meetingLocation: value })
        // console.log(value)
    }

    renderMeetingScreen() {
        const { items, newItems, meetingLocation } = this.state;
        // console.log('items', 'newItems')
        return (
            <div>
                <h1>Select place where you want to meet</h1>
                <FormControl>
                    <TextField
                        type='search'
                        onChange={this.searchText}
                    />
                </FormControl>
                {!newItems ? items.map((value, index) => {
                    return <ul>
                        <li onClick={this.meetingLocation.bind(this, value.venue.location)} ><Button>{value.venue.name}</Button></li>
                    </ul>
                }) :
                    newItems.map((value, index) => {
                        return <ul>
                            <li><Button onClick={this.meetingLocation.bind(this, value.location)} >{value.name}</Button></li>
                        </ul>
                    })
                }

            </div>
        )
    }

    swipRight(item, index) {
        // console.log(item)
        const { data } = this.state
        swal({
            title: `you want to meet ${item.fullName} ?`,
            // text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Meeting", {
                        icon: "success",
                    });
                    this.setState({ meetingScreen: true, meetingReciever: item })
                    // this.sendReq.bind(this, item)
                } else {
                    data[index] = item
                    this.setState({ data })
                    swal("You cancel the meeting");
                }
            });
    }

    onSwipeLeft(index) {
        const { data } = this.state
        // console.log(index)
        data.splice(index, 1)
        this.setState({ data })
    }

    renderCards() {
        const { data } = this.state
        // console.log(data)
        return (
            <div>
                <h1>You Want To Meet?</h1>
                <CardWrapper className='master-root'>

                    {data.map((item, index) =>
                        <Card
                            onSwipeLeft={() => swal('swipe left')}
                            onSwipeRight={this.swipRight.bind(this, item, index)}
                            style={{ height: 800 }}
                        >
                            <Slide {...properties}>
                                <div className="each-slide">
                                    <div style={{ 'backgroundImage': `url(${item.images[0]})`, height: 500, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                                        {/* <span>Slide 1</span> */}
                                    </div>
                                </div>
                                <div className="each-slide">
                                    <div style={{ 'backgroundImage': `url(${item.images[1]})`, height: 500, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                                        {/* <span>Slide 2</span> */}
                                    </div>
                                </div>
                                <div className="each-slide">
                                    <div style={{ 'backgroundImage': `url(${item.images[2]})`, height: 500, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                                        {/* <span>Slide 3</span> */}
                                    </div>
                                </div>
                            </Slide>
                            <h2>{item.fullName}</h2>
                            <p>{item.nickName}</p>
                            <div style={{ width: 100, display: 'inline' }}>
                                <img onClick={this.onSwipeLeft.bind(this, index)} src={EndCall} style={{ float: 'left' }} height={100} width={100} />
                                <img onClick={this.swipRight.bind(this, item, index)} src={Call} style={{ float: 'right', marginRight: 10 }} height={100} width={100} />
                            </div>
                        </Card>
                    )}
                </CardWrapper>
            </div>
        )
    }

    rejectReq(key, index) {
        const { meetingReciever, meetingSender } = this.state
        firebase.database().ref(`/meetings/${key}/`).update({ status: 'cencelled' })
        meetingReciever[index].status = 'cencelled'
        // meetingSender[index].status = 'accepted'
        // console.log(meetingReciever[index], meetingSender[index])
        this.setState({ meetingReciever })
    }

    acceptReq(key, index) {
        const { meetingReciever, meetingSender } = this.state
        firebase.database().ref(`/meetings/${key}/`).update({ status: 'accepted' })
        meetingReciever[index].status = 'accepted'
        // meetingSender[index].status = 'accepted'
        // console.log(meetingReciever[index], meetingSender[index])
        this.setState({ meetingReciever })
    }

    renderMeetings() {
        const { meetingSender, meetingReciever, pendingReqArr } = this.state
        console.log(pendingReqArr)
        return (
            <div>
                <AppBar position='static' color='default'>
                    <Tabs
                        value={this.state.value}
                        onChange={(event, value) => this.setState({ value })}
                        indicatorColor="primary"
                        textColor="primary"
                        fullWidth
                    >
                        <Tab label="My Meetings" />
                        {pendingReqArr.length === 0  ? <Tab label="Meeting Requests" />
                        :<Tab
                        label={
                            <Badge color="secondary" badgeContent={pendingReqArr.length}>
                                Meeting Requests
                            </Badge>}
                            />
                            }
                        {/* <Tab label="Item Three" /> */}
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    onChangeIndex={index => this.setState({ value: index })}
                    index={this.state.value}
                >
                    {meetingSender.length >= 1 ? <TabContainer>
                        <Paper >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Meeting Date & Time</TableCell>
                                        <TableCell>Location</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {meetingSender.map((value, index) => {
                                        // console.log(value)
                                        if (value.senderId == this.state.uid) {

                                            return <TableRow>
                                                <TableCell component='th' scope='row' >
                                                    <ListItem>
                                                        <Avatar src={value.recieverProfilePic} />
                                                        <ListItemText primary={value.recieverName} secondary={value.sendingDate} />
                                                    </ListItem>
                                                </TableCell>
                                                <TableCell>{value.status}</TableCell>
                                                <TableCell>{value.date} & {value.time}</TableCell>
                                                <TableCell><Button color='secondary'>Get Directiom</Button></TableCell>

                                            </TableRow>
                                        }
                                    })}
                                </TableBody>
                            </Table>
                        </Paper>
                    </TabContainer> : <h2>No Meetings Yet...</h2>}
                    {meetingReciever.length >= 1 ? <TabContainer >
                        <Paper >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Meeting Date & Time</TableCell>
                                        <TableCell>Location</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {meetingReciever.map((value, index) => {
                                        // console.log(value)
                                        if (value.recieverId == this.state.uid) {

                                            return <TableRow>
                                                <TableCell component='th' scope='row' >
                                                    <ListItem>
                                                        <Avatar src={value.senderProfilePic} />
                                                        <ListItemText primary={value.senderName} secondary={value.sendingDate} />
                                                    </ListItem>
                                                </TableCell>
                                                <TableCell>
                                                    {value.status === 'pending' ? <div>
                                                        <Button color='primary' onClick={this.acceptReq.bind(this, value.key, index)}>Accept</Button>/<Button color='secondary' onClick={this.rejectReq.bind(this, value.key, index)}>Reject</Button></div> : value.status}
                                                </TableCell>
                                                <TableCell>{value.date} & {value.time}</TableCell>
                                                <TableCell><Button color='secondary'>Get Directiom</Button></TableCell>
                                            </TableRow>
                                        }

                                    })}
                                </TableBody>
                            </Table>
                        </Paper>
                    </TabContainer> : <h2>No Request Yet...</h2>}
                </SwipeableViews>
                <Zoom
                    key='primary'
                    in={true}
                    // timeout={transitionDuration}
                    // style={{
                    //     transitionDelay: `${this.state.value === index ? transitionDuration.exit : 0}ms`,
                    // }}
                    unmountOnExit
                >
                    <Icon fontSize='large'>+</Icon>
                </Zoom>

                <Button onClick={() => { this.setState({ startMeeting: true }) }}  >Set Meeting</Button>
            </div >
        );
    }

    render() {
        const { startMeeting, meetingReciever, meetingSender, meetingScreen, meetingLocation, meetPoint, currentUser, directions, date, time } = this.state;
        const { logout } = this.props
        // console.log(meetingLocation)
        // console.log(logout)
        return (
            <div>
                <PersistentDrawerLeft logout={logout} />
                {/* <ApBar /> */}
                <MeetingPoint />
                <center>
                    {!startMeeting && !meetingScreen && meetingReciever.length === 0 && meetingSender.length === 0 && (
                        <div>
                            <h3>You haven’t done any meeting yet!</h3>
                            <p>try creating a new meeting!</p>
                            <Button onClick={() => { this.setState({ startMeeting: true }) }} >Set a meeting!</Button>
                        </div>
                    )}
                    {!startMeeting && !meetingScreen && (meetingSender.length >= 1 || meetingReciever.length >= 1) && this.renderMeetings()}
                    {startMeeting && !meetingScreen && this.renderCards()}
                    {meetingScreen && !meetingLocation && !directions && this.renderMeetingScreen()}
                    {meetingScreen && meetingLocation && !meetPoint && <div>
                        <Button onClick={() => { this.setState({ meetPoint: true, directions: true }) }}>Next</Button>
                        <Button onClick={this.getDirections}>Get location</Button>
                    </div>}
                    {meetingScreen && meetPoint && <div>
                        <h1>Select meeting date and time</h1>
                        <TextField
                            type='date'
                            onChange={(e) => this.setState({ date: e.target.value })}
                            defaultValue={`${new Date().getUTCFullYear().toString()}-0${new Date().getMonth().toString()}-${new Date().getDate().toString()}`}
                        />
                        <TextField
                            type='time'
                            defaultValue={`0${new Date().getHours().toString()}:${new Date().getMinutes().toString()}`}
                            onChange={(e) => this.setState({ time: e.target.value })}
                        />
                        {(date && time) ? <Button onClick={this.sendReq}>Send Request</Button> : <p>Please select date and time...</p>}
                    </div>
                    }


                    {meetingLocation && !meetPoint && <MyMapComponent
                        isMarkerShown={true}
                        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJfivohMbjl26zRJPwsR772a-ejcku7s8&v=3.exp&libraries=geometry,drawing,places"
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `400px` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        location={currentUser.userLocation}
                        directions={directions}
                        meetingLocation={meetingLocation}
                    />}
                </center>
            </div>
        );
    }
}

export default Dashboard

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
    <GoogleMap
        defaultZoom={14}
        center={{ lat: props.location.latitude, lng: props.location.longitude }}
    >

        <Marker position={{ lat: props.location.latitude, lng: props.location.longitude }} />
        <Marker position={{ lat: props.meetingLocation.lat, lng: props.meetingLocation.lng }} />

        {props.directions && <DirectionsRenderer directions={props.directions} />}

    </GoogleMap>
))