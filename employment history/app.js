import React, { Component } from 'react';
// import logo from './logo.svg';
// import add from './add.png';
import edit from './61456.svg';
import delet from './delete-big.webp';
import './App.css';
// importScripts("https://unpkg.com/sweetalert/dist/sweetalert.min.js")
import swal from 'sweetalert'
class App extends Component {
constructor(){
  super()
  this.state = {
    employers : [],
    emailRef:'',
    password: '',
    user:'',
    firstName:'',
    lastName:'',
    employEmail:'',
    salary:'',
    date:'',
    addForm: '',
    currentIndex: null,
  }
  this.edit = this.edit.bind(this)
  this.showTable = this.showTable.bind(this)
  this.addEmployeeForm = this.addEmployeeForm.bind(this)
  this.emailValue = this.emailValue.bind(this);
  this.passValue = this.passValue.bind(this);
  this.login = this.login.bind(this);
  this.firstName = this.firstName.bind(this);
  this.lastName = this.lastName.bind(this);
  this.employEmail = this.employEmail.bind(this);
  this.salary = this.salary.bind(this);
  this.date = this.date.bind(this);
this.addform = this.addform.bind(this);
this.delete = this.delete.bind(this);
this.updateText = this.updateText.bind(this);
    this.cancel = this.cancel.bind(this);
}
emailValue(email){
  const emailRef = email.target.value;
// console.log(emailRef);
this.setState({emailRef})
}
passValue(pass){
  const password = pass.target.value;
// console.log(password);
this.setState({password})
}
updateText() {
  const {firstName, lastName, employEmail, salary, date, employers, currentIndex} = this.state;
  // console.log(firstName, lastName, emailRef, salary, date, employers)
  // console.log(employers.firstName)
// let updatedName = 
let addForm = {
  firstName: firstName,
  lastName: lastName,
  employEmail: employEmail,
  salary: salary,
  date: date
}
console.log(addForm)
  employers.splice(currentIndex,1,addForm)
  this.setState({firstName, lastName, employEmail, salary, date, employers})
  swal('List is updated','successfull','success')
}
addEmployeeForm(){
  const { currentIndex } = this.state;
  return(
    <div className="form">
      <h1>Add New Employee</h1>
      <div>
      <p>First Name</p>
        <input placeholder="First Name" onChange={this.firstName} /></div>
        <div><p>Last Name</p>
        <input placeholder="Last Name" onChange={this.lastName}/></div>
        <div><p>Email</p>
        <input type="email" placeholder="Email" onChange={this.employEmail}/></div>
        <div> <p>Salary</p>
        <input  placeholder="Salary" onChange={this.salary}/></div>
        <div> <p>Date</p>
        <input type="date" placeholder="Job Start Date" onChange={this.date}/><br/></div>
{currentIndex == null ? <button onClick={this.addform}>add employer details</button>
:
<div>

  <button onClick={() => {this.updateText()}}>Update</button>
  <button onClick={this.cancel}>Cancel</button>
</div>
  }
</div>
  )
}
firstName(e){
  // console.log(e.target.value);
  const firstName = e.target.value;
  this.setState({firstName})
}
lastName(e){
  // console.log(e.target.value);
  const lastName = e.target.value;
  this.setState({lastName})
}
employEmail(e){
  // console.log(e.target.value);
  const employEmail = e.target.value;
  this.setState({employEmail})
}
salary(e){
  // console.log(e.target.value);
  const salary = e.target.value;
  this.setState({salary})
}
date(e){
  // console.log(e.target.value);
  const date = e.target.value;
  this.setState({date})
}
login(){
  let user
  const {emailRef,password} = this.state
  // console.log('email=>',emailRef,'password=>',password)
  emailRef === 'admin@domain.com' && password === 'admin' ? user='admin'  : user = ''
this.setState({user})
user ? swal('Login','succesful','success') : swal('Login','unsuccesful','error')
}
cancel() {
  this.setState({ currentIndex: null})
  swal('cencel update!')
}
delete(index){
  const { employers } = this.state;

  index || swal({
    title: "Are you sure?",
    text: "you want to delete this list!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      employers.splice(index,1);
this.setState({employers, currentIndex:null})
      swal("Your employers list has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your employer list is safe!");
    }
    
  });
 
// console.log(index);
// let currentIndex = index

// console.log(employers)

}
edit(index){
// console.log(index)
let currentIndex = index
const { employers } = this.state
this.setState({employers,currentIndex:  currentIndex})
// console.log(employers);
swal('Now editing your list!')

}
addform(){
  const {firstName,lastName,employEmail,salary,date,employers} = this.state;
  let addForm = {
    firstName: firstName,
    lastName: lastName,
    employEmail: employEmail,
    salary: salary,
    date: date
  }

employers.push(addForm);
    // console.log(employers);
    this.setState({employers,addForm});
    swal('employee addded','done!','success')
}

renderHeader(){
return(
<header className="App-header">
{/* <img src={logo} className="App-logo" alt="logo" /> */}
<h1 className="App-title">My employers details</h1>
</header>       
)
}
renderLogin(){
  return(
    <div className="login">
      <h1>Required Admin Access</h1>
      
   <p>Email</p>
   <input type='email' placeholder='admin email' onChange={this.emailValue}/><br/>
   <p>Password</p>
   <input type='password' placeholder='password' onChange={this.passValue}/><br/>
   <button onClick={this.login} >Log in</button>
    </div>
  )
}
showTable(){
  let a = 0;
  const { employers } = this.state;
  return employers.map((value,index)=>{
    // let name = `${value.firstName} ${value.lastName}
    // console.log(firstName, lastName, employEmail, salary, date, employers)
    return(
      <div key={Math.random()}>
      <h1>Employer # {++a}</h1>
  <table>
    <thead>
      <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Salary</th>
      <th>Date</th>
      <th></th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>{`${value.firstName} ${value.lastName}`}</td>
      <td>{value.employEmail}</td>
      <td>{value.salary}</td>
      <td>{value.date}</td>
     <td><button onClick={this.edit.bind(this,index)}><img height='50px' width="50px" src={edit}/></button>
  <button  onClick={this.delete.bind(this,index)}><img height='50px' width="50px" src={delet}/></button></td></tr>
      </tbody>
      </table>
      </div>
    )
  })
}
  render() {
    const {user, addForm} = this.state
return (
        <div className="App">
{this.renderHeader() }
{!user && this.renderLogin()}
{user && addForm && this.addEmployeeForm()}
{user && addForm && this.showTable()}
{user && !addForm && this.addEmployeeForm() }
 {/* {this.addEmployeeForm()}
{this.showTable()} */}
 
              </div>
             
    );
  }
}

export default App;
