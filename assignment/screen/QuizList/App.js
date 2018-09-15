import React, { Component } from 'react';
import './App.css';
// import swal from 'sweetalert';
// import * as firebase from 'firebase'
// var config = {
//   apiKey: "AIzaSyBImpDjusAwYhTzLOoi0VnjS9KG39DgEGY",
//   authDomain: "quiz-app-with-react.firebaseapp.com",
//   databaseURL: "https://quiz-app-with-react.firebaseio.com",
//   projectId: "quiz-app-with-react",
//   storageBucket: "quiz-app-with-react.appspot.com",
//   messagingSenderId: "779825984730"
// };
// firebase.initializeApp(config);

class QuizList extends Component {
constructor(props){
super(props)
this.state = {
}
}

  render() {
    const {list, quizInfo,dataResult,databaseResult} = this.props
    return (
      <div>
        {list.map((value,index)=>{
          return <ul>
               <li className="list">{value.name}<button className="but" onClick={!databaseResult ?   ()=>{quizInfo(index)}:{dataResult}}>Enter Quiz</button></li>
          </ul>
        })}
      </div>
    );
  }
}

export default QuizList;
