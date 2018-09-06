import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import swal from 'sweetalert';
import add from '../../aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzAwMi83NTkvb3JpZ2luYWwvMDgxMjA5LWxpZ2h0LWJ1bGItMDIuanBn.webp';
class Onoff extends Component {
constructor(props){
super(props)
this.state = {
}
// console.log(this.props)
}

  render() {
    return (
      <div className="App">
      <img height='450px' width='450px' src={add}/>
      <button onClick={this.props.of}>of</button>
      </div>
    );
  }
}

export default Onoff;
