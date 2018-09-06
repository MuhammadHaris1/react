import React, { Component } from 'react';
import LightOn from './screen/LightOn/App';
import LightOf from './screen/LightOf/App';
import BulbBroke from './screen/Broken/app';
import add from './aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzAwMi83NTkvb3JpZ2luYWwvMDgxMjA5LWxpZ2h0LWJ1bGItMDIuanBn.webp';
import './App.css';


// import swal from 'sweetalert';

class App extends Component {
constructor(){
super()
this.state = {
  onOff : false,
  BulbBroken: false,
}
this.on = this.on.bind(this)
this.of = this.of.bind(this)
this.showBrokenBulb = this.showBrokenBulb.bind(this)
this.showDefaulBulb = this.showDefaulBulb.bind(this)
}
of(){
  // console.log('hello')
  this.setState({onOff:false})
}
on(){
  // console.log('hello')
  this.setState({onOff:true})
}
showBrokenBulb(){
  this.setState({BulbBroken:true})
}
showDefaulBulb(){
  this.setState({BulbBroken:false})
}
  render() {
    const {onOff, BulbBroken} = this.state
    return (
      <div className="App">
  {/* {!onOff ? <LightOn on={this.on}/> : <LightOf of={this.of}/> }
  {  !BulbBroken ? <LightOf /> :<BulbBroke tootgya={this.showBrokenBulb} />} */}
 {!BulbBroken ? !onOff && <LightOn tootgya={this.showBrokenBulb} on={this.on}/>:<BulbBroke showDefaulBulb={this.showDefaulBulb}/>}
  {onOff && <LightOf of={this.of}/>  }
  {/* {!onOff && BulbBroken && <BulbBroke/> } */}
    
      </div>
 
    );
  }
}

export default App;
   
