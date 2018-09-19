import React, { Component } from 'react';
import logo from './Assets/logo.png';
import './App.css';
// import edit from './Assets/edit.png';
// import delet from './Assets/delete.png';
import firebase from 'firebase'
// import Search from './screens/Search/Search'

var config = {
  apiKey: "AIzaSyBzwMVv09fCUqzeySieD_sIh63_Y-EJDoc",
  authDomain: "todoappwithreact.firebaseapp.com",
  databaseURL: "https://todoappwithreact.firebaseio.com",
  projectId: "todoappwithreact",
  storageBucket: "todoappwithreact.appspot.com",
  messagingSenderId: "621304356006"
};
firebase.initializeApp(config);

class App extends Component {
  constructor() {
    super();

    this.state = {
      todos: [],
      text: '',
      currentIndex: null,
      currentKey: ''
    }

    this.add = this.add.bind(this);
    this.updateText = this.updateText.bind(this);
    this.cancel = this.cancel.bind(this);
    this.updated = this.updated.bind(this);
    this.delete = this.delete.bind(this);
    // this.enterPressed = this.enterPressed.bind(this);
  }


  updateText(e) {
    this.setState({ text: e.target.value })
  }

  updated() {
    const { todos, text, currentIndex, currentKey } = this.state;
    // console.log(text);


    firebase.database().ref('/todos/').child(currentKey).update({text})
    todos[currentIndex].text.text = text;
    // console.log(todos[currentIndex], text)
    this.setState({ todos, text: '', currentIndex: null })
  }

  add() {
    const { text, todos } = this.state;
    // todos.push(text);
    this.setState({ todos, text: '' });
    const obj = {
      text: text
    }
    firebase.database().ref('/todos/').push(obj)

  }

  //   handleKeyPress(target) {
  //     if(target.charCode==13){
  //             // alert('Enter clicked!!!');    
  //     }

  // }

  edit(index, key) {
    const { todos } = this.state;
    
    this.setState({ text: todos[index].text.text, currentIndex: index , currentKey: key})
  }

  componentWillMount() {
    // console.log('componentDidMount')
    const { todos } = this.state
    firebase.database().ref('/todos/').on('child_added', (snapShot) => {
      var todo = snapShot.val();
      // console.log(todo);
      var objec = {
        text: todo,
        key: snapShot.key
      }
      todos.push(objec)
      this.setState({ todos })
    })
  }

  delete(key,index) {
    // console.log(ev.target.value)
    // console.log(ev.target.id)
    // var id = ev.target.id
    firebase.database().ref('/todos/').child(key).remove()
    const {todos} = this.state;
    todos.splice(index, 1);
    this.setState({todos, currentIndex: null});
  }

  cancel() {
    this.setState({ text: '', currentIndex: null })
  }


  renderHeader() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <h1 className="App-title">Todo List</h1> */}
      </header>
    )
    // firebase.database().ref('/').child(id).update(data)
  }

  renderTodos() {

    const { todos, text } = this.state;
    return <ol>{todos.map((item, index) => {
      // console.log(item)
      var key = item.key;
      return <li className="list">
        <b>{item.text.text}</b>
        <span>
          <button className="edit" onClick={this.edit.bind(this, index, key)}>Edit</button>
          <button id={item.key} className="delete" onClick={this.delete.bind(this,key,index)}>Delete</button>
        </span>
      </li>
    })}
    </ol>
  }
  //   enterPressed(event) {
  //     const { text,todos } = this.state;
  //     // console.log()
  //     var code = event.keyCode || event.which;
  //     if(code === 13) { //13 is the enter keycode
  //         //Do stuff in here
  //             // alert(text)
  //             todos.push(text);
  //             this.setState({todos, text: ''})

  //       } 
  // }

  render() {
    const { currentIndex } = this.state;

    return (
      <div className="App">
        {this.renderHeader()}
        <input
          placeholder="Enter something"
          onChange={this.updateText}
          value={this.state.text}
        // onKeyPress={this.enterPressed.bind(this)}
        />
        {currentIndex == null ?
          <button className="add" onClick={this.add}>Add</button>
          :
          <div>
            <button className="update" onClick={this.updated.bind(this)}>Update</button>
            <button className="cancel" onClick={this.cancel}>Cancel</button>
          </div>
        }
        <br />
        {currentIndex != null && <p>You editing item # {currentIndex + 1} currently!</p>}

        {this.renderTodos()}
      </div>
    );
  }
}

export default App;
