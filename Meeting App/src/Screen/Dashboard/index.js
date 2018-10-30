/* eslint-disable no-undef */
/* global google */

import React, { Component } from 'react'
import { Button, TextField, FormControl, List, ListItem, ListItemText, Avatar, Table, TableRow, TableBody, Paper, TableCell, TableHead } from '@material-ui/core';
import { Card, CardWrapper } from 'react-swipeable-cards';
import firebase from '../../Config/Firebase'
import EndCall from './end.jpg'
import Call from './call.png'
import swal from "sweetalert";
import '../../App.css';
import { Slide } from 'react-slideshow-image';
import MeetingPoint from './MeetingPoint';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps";


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
            data: [
                {
                    fullName: 'Hammad Ahmed',
                    profilePic: 'https://scontent.fkhi2-1.fna.fbcdn.net/v/t1.0-9/40411075_2112295232357793_3123349137328701440_n.jpg?_nc_cat=103&_nc_ht=scontent.fkhi2-1.fna&oh=7fa0f6f64af74e25485484b0a4f47539&oe=5C88B63B',
                    nickName: 'Oggy',
                    images: [
                        'https://scontent.fkhi2-1.fna.fbcdn.net/v/t1.0-9/40411075_2112295232357793_3123349137328701440_n.jpg?_nc_cat=103&_nc_ht=scontent.fkhi2-1.fna&oh=7fa0f6f64af74e25485484b0a4f47539&oe=5C88B63B',
                        'https://scontent.fkhi2-1.fna.fbcdn.net/v/t1.0-9/37245559_2067516250169025_2938730028239683584_n.jpg?_nc_cat=104&_nc_ht=scontent.fkhi2-1.fna&oh=5795ffdd9d2f8916cb294528e1e0fe6a&oe=5C5034A7',
                        'https://scontent.fkhi2-1.fna.fbcdn.net/v/t1.0-9/35493234_2039636959623621_1489672809201270784_n.jpg?_nc_cat=102&_nc_ht=scontent.fkhi2-1.fna&oh=f1c8cef4ac8f09ee97a8b0f91dd2a776&oe=5C83CCE9',
                    ],
                    userLocation: {
                        latitude: 24.958296,
                        longitude: 66.985070,
                    },
                },
                {
                    fullName: 'Mudassir Raza',
                    profilePic: 'https://scontent.fkhi2-1.fna.fbcdn.net/v/t1.0-9/29176914_2033174930283888_2578770627343155200_o.jpg?_nc_cat=102&_nc_ht=scontent.fkhi2-1.fna&oh=0b9077f0d6859a1a310db505d24715f7&oe=5C4326FF',
                    nickName: 'mudassir',
                    images: [
                        'https://scontent.fkhi2-1.fna.fbcdn.net/v/t1.0-9/29176914_2033174930283888_2578770627343155200_o.jpg?_nc_cat=102&_nc_ht=scontent.fkhi2-1.fna&oh=0b9077f0d6859a1a310db505d24715f7&oe=5C4326FF',
                        'https://scontent.fkhi2-1.fna.fbcdn.net/v/t1.0-9/24852523_1980846822183366_6198704761015810488_n.jpg?_nc_cat=107&_nc_ht=scontent.fkhi2-1.fna&oh=386c5a78fa2a58b41d614880785302a6&oe=5C4BD551',
                        'https://scontent.fkhi2-1.fna.fbcdn.net/v/t1.0-9/28467765_2023876684547046_6679288899442079898_n.jpg?_nc_cat=106&_nc_ht=scontent.fkhi2-1.fna&oh=8709274c0066c4a0d200600a2ce8711c&oe=5C54F4E2',
                    ]
                },
                {
                    fullName: 'Faisal Khan',
                    profilePic: 'https://scontent.fkhi2-1.fna.fbcdn.net/v/t1.0-9/40161573_1916241722003837_931773578406264832_o.jpg?_nc_cat=109&_nc_ht=scontent.fkhi2-1.fna&oh=0c1fa1cca9109ac6fdf79a0663f72269&oe=5C450763',
                    nickName: 'faisal',
                    images: [
                        'https://scontent.fkhi2-1.fna.fbcdn.net/v/t1.0-9/40161573_1916241722003837_931773578406264832_o.jpg?_nc_cat=109&_nc_ht=scontent.fkhi2-1.fna&oh=0c1fa1cca9109ac6fdf79a0663f72269&oe=5C450763',
                        'https://scontent.fkhi2-1.fna.fbcdn.net/v/t1.0-9/37228097_1875182536109756_7945395081886826496_n.jpg?_nc_cat=107&_nc_ht=scontent.fkhi2-1.fna&oh=137026ae2600166e97649b5b66df22a1&oe=5C4EF45C',
                        'https://scontent.fkhi2-1.fna.fbcdn.net/v/t1.0-9/29512662_1810129909281686_1198580464412000256_n.jpg?_nc_cat=109&_nc_ht=scontent.fkhi2-1.fna&oh=a7938684257479bb632b6cda84587bfc&oe=5C889CF3',
                    ]
                },
            ],
            currentUser: {},
            meetings: [],
        }
        this.renderMeetingScreen = this.renderMeetingScreen.bind(this)
        this.swipRight = this.swipRight.bind(this)
        this.searchText = this.searchText.bind(this)
        this.meetingLocation = this.meetingLocation.bind(this)
        this.sendReq = this.sendReq.bind(this)
        this.getMeetings = this.getMeetings.bind(this)
        this.getDirections = this.getDirections.bind(this)
    }

    // componentWillMount() {

    // }

    componentDidMount() {
        this.getMeetings()
        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/`).on('child_added', snapShot => {
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

    getMeetings() {
        const { meetings } = this.state
        firebase.database().ref(`/meetings/${firebase.auth().currentUser.uid}/`).on('child_added', snap => {
            console.log(snap.val())
            const meeting = snap.val()
            meetings.push(meeting)
            this.setState({ meetings })
        })
    }

    sendReq() {
        // console.log(item)
        const { date, time, meetingLocation, meetingReciever } = this.state
        const reqObj = {
            date: date,
            time: time,
            location: meetingLocation,
            recieverName: meetingReciever.fullName,
            recieverProfilePic: meetingReciever.profilePic
        }
        //  console.log(reqObj)
        firebase.database().ref(`/meetings/${firebase.auth().currentUser.uid}/`).push(reqObj)
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
        // console.log(items, newItems)
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

    renderMeetings() {
        const { meetings } = this.state
        return (
            <div>
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
                            {meetings.map((value, index) => {
                                // console.log(value)
                                return <TableRow>
                                    <TableCell component='th' scope='row' >
                                        <ListItem>
                                            <Avatar src={value.recieverProfilePic} />
                                            <ListItemText primary={value.recieverName} secondary="Jan 9, 2014" />
                                        </ListItem>
                                    </TableCell>
                                    <TableCell>pending</TableCell>
                                    <TableCell>"{value.date}" & "{value.time}"</TableCell>
                                    <TableCell><Button color='secondary'>Get Directiom</Button></TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </Paper>
                <Button onClick={() => { this.setState({ startMeeting: true }) }}  >Set Meeting</Button>
            </div>
        );
    }

    render() {
        const { startMeeting, meetings, meetingScreen, meetingLocation, meetPoint, currentUser, directions } = this.state;
        // console.log(meetingLocation)
        return (
            <div>
                <MeetingPoint />

                {!startMeeting && !meetingScreen && meetings.length === 0 && (
                    <div>
                        <h3>You haven’t done any meeting yet!</h3>
                        <p>try creating a new meeting!</p>
                        <Button onClick={() => { this.setState({ startMeeting: true }) }} >Set a meeting!</Button>
                    </div>
                )}
                {!startMeeting && !meetingScreen && meetings.length >= 1 && this.renderMeetings()}
                {startMeeting && !meetingScreen && this.renderCards()}
                {meetingScreen && !meetingLocation && !directions && this.renderMeetingScreen()}
                {meetingScreen && meetingLocation && !meetPoint && <div>
                    <Button onClick={() => { this.setState({ meetPoint: true, meetingLocation: null }) }}>Next</Button>
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
                    <Button onClick={this.sendReq}>Send Request</Button>
                </div>
                }

                {meetingLocation && <MyMapComponent
                    isMarkerShown={true}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJfivohMbjl26zRJPwsR772a-ejcku7s8&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    location={currentUser.userLocation}
                    directions={directions}
                    meetingLocation={meetingLocation}
                />}
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