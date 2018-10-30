import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

class Step4 extends Component {
    constructor(props) {
        super(props)
        this.state = {
            coords: null,
            position: '',
        }
        this.dragLocation = this.dragLocation.bind(this)
    }

    setLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log(position.coords)
          var coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          this.setState({ coords })
          this.props.userLocation(coords)
        })
      }

     
      
  componentWillMount() {
    this.setLocation()
  }

    dragLocation(e) {
        // const { coords } = this.state
        this.setState({
          coords: { latitude: e.latLng.lat(), longitude: e.latLng.lng() }
        })
        this.props.userLocation({ latitude: e.latLng.lat(), longitude: e.latLng.lng() })
      }

    render() {
        const { coords } = this.state;
       return( <div>
            <MyMapComponent
                isMarkerShown={true}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                coords={coords}
                setLocation={this.dragLocation}
            />
<br/>
<br/>
<button onClick={this.props.createUserProfile}>Done</button>

        </div>
    );}
}

export default Step4

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  props.coords && <GoogleMap
    defaultZoom={8}
    center={{ lat: props.coords.latitude, lng: props.coords.longitude }}
  >
      {props.isMarkerShown && <Marker defaultDraggable={true} onDragEnd={props.setLocation} position={{ lat: props.coords.latitude, lng: props.coords.longitude }} />}
  </GoogleMap>
))