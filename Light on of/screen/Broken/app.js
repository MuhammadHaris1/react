import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import swal from 'sweetalert';
import add from '../../164446736-1024x1024.jpg';
class LightBroke extends Component {
constructor(props){
super(props)
this.state = {
}
// console.log(this.props)
}
broke(){
    
}
  render() {
      console.log(this.props);
      
    return (
      <div className="App">
      <img height='450px' width='450px' src={add}/>
      <button onClick={this.props.showDefaulBulb}>repair</button>
      </div>
    );
  }
}

export default LightBroke;
