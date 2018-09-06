import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import swal from 'sweetalert';
import add from '../../incandescent-e1456179151174.jpg';
class Onoff extends Component {
constructor(props){
super(props)
this.state = {
}
// console.log(this.props)
}
  render() {
    return (
      <div>
      <img height='450px' width='450px' src={add}/>
      <button  onClick={this.props.on}>on</button>
      <button onClick={this.props.tootgya}>broke</button>
      </div>
    );
  }
}

export default Onoff;
