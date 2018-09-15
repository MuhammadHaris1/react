import React, { Component } from 'react';
import QuizInfo from './screen/QuizInfo/App';
import QuizList from './screen/QuizList/App';
import QuizQuestion from './screen/QuesRender/app';
import './App.css';
// import swal from 'sweetalert';
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
var config = {
apiKey: "AIzaSyBImpDjusAwYhTzLOoi0VnjS9KG39DgEGY",
authDomain: "quiz-app-with-react.firebaseapp.com",
databaseURL: "https://quiz-app-with-react.firebaseio.com",
projectId: "quiz-app-with-react",
storageBucket: "quiz-app-with-react.appspot.com",
messagingSenderId: "779825984730"
};
firebase.initializeApp(config);

class App extends Component {
constructor(){
super()
this.state = { 
isSignedIn: false,
list: [
{
name: "HTML", 
},
{
  name: "CSS",
}
],
quiz: "",
quizzes:[
  [
    [
      {
    name: 'HTML quiz1',
    questions: 5,
    time: '65 minute',
    passingScore: '60%',
    quizQues:[
      {
        question: 'What does HTML stand for?',
        answer: 'Hyper Text Markup Language',
        option: [' Hyperlinks and Text Markup Language', 'high text markup language', 'Hyper Text Markup Language', 'Home Tool Markup Language']
      },
      {
        question: 'Who is making the Web standards?',
        answer: 'The World Wide Web Consortium',
        option: ['Google', 'Microsoft', 'The World Wide Web Consortium', 'Mozilla']
      },
      {
        question: 'Choose the correct HTML element for the largest heading:',
        answer: '<h1>',
        option: ['<h1>','<heading>','<head>','<h6>']
      },
      {
        question: 'What is the correct HTML element for inserting a line break?',
        answer: '<br>',
        option: ['<lb>','<break>','<br>']
      },
      {
        question: 'which of the following tag is used to mark a begining of paragraph ?',
        answer: '<P>',
        option: ['<TD>','<br>','<P>','<TR>']
      }
    ],
  },
],
  [
    {
    name: 'HTML quiz2',
    questions: 5,
    time: '70 minute',
    passingScore: '60%',
    quizQues:[
      {
        question: 'HTML based on?',
        answer: 'text',
        option: ['script', 'text', 'style', 'other']
      },
    {
      question: 'The attribute of <form> tag',
      answer: 'Both (a)&(b)',
      option: ['Method','Action','Both (a)&(b)','None of these']
    },
    {
      question: 'Markup tags tell the web browser',
      answer: 'How to display the page',
      option: ['How to display the page','How to organise the page','How to display message box on page','None of these']
    },
    {
    question: 'www is based on which model?',
    answer: 'Client-server',
    option: ['Local-server','Client-server','3-tier','None of these']
    },
    {
      question: 'Which of the following attributes of text box control allow to limit the maximum character?',
      answer: 'maxlength',
      option: ['size','len','maxlength','all of these']
    },
    // {
    //   question: '',
    //   answer: '',
    //   option: ['','','','']
    // },
    // {
    //   question: '',
    //   answer: '',
    //   option: ['','','','']
    // },
    // {
    //   question: '',
    //   answer: '',
    //   option: ['','','','']
    // },
    // {
    //   question: '',
    //   answer: '',
    //   option: ['','','','']
    // },
    // {
    //   question: '',
    //   answer: '',
    //   option: ['','','','']
    // },
    ],
  },
],
],
[
  [
    {
    name: 'CSS quiz1',
    questions: 5,
    time: '90 minute',
    passingScore: '60%',
    quizQues:[
      {
        question: 'What does CSS stand for?',
        answer: 'Cascading Style Sheets',
        option: ['Creative Style Sheets', 'Colorful Style Sheets', 'Cascading Style Sheets', 'Computer Style Sheets']
      },
      {
        question: 'What is the correct HTML for referring to an external style sheet?',
        answer: '<link rel=”stylesheet” type=”text/css” href=”mystyle.css”>',
        option: ['<stylesheet>mystyle.css</stylesheet />','<style src=”mystyle.css” />','<link rel=”stylesheet” type=”text/css” href=”mystyle.css”>']
      },
      {
        question: 'Where in an HTML document is the correct place to refer to an external style sheet?',
        answer: 'In the <head> section',
        option: ['At the end of the document','In the <head> section','At the top of the document','In the <body> section']
      },
      {
      question: ' Which HTML tag is used to define an internal style sheet?',
      answer: '<style>',
      option: ['<style>','<css>','<script>']
      },
      {
        question: 'Which HTML attribute is used to define inline styles?',
        answer: 'style',
        option: ['font','class','styles','style']
      },
      //put more questions
      // {
      //   question: '',
      //   answer: '',
      //   option: ['','','','']
      // },
      // {
      //   question: '',
      //   answer: '',
      //   option: ['','','','']
      // },
      // {
      //   question: '',
      //   answer: '',
      //   option: ['','','','']
      // },
      // {
      //   question: '',
      //   answer: '',
      //   option: ['','','','']
      // },
      // {
      //   question: '',
      //   answer: '',
      //   option: ['','','','']
      // },
    ],    
  }
],
[
  {
    name: 'CSS quiz2',
    questions: 5,
    time: '30 minute',
    passingScore: '60%',
    quizQues:[
      {
        question: 'CSS based on?',
        answer: 'style',
        option: ['text', 'style', 'script', 'others']
      },
      {
        question: 'Which is the correct CSS syntax?',
        answer: 'body {color: black}',
        option: ['body {color: black}','{body;color:black}','{body:color=black(body}','body:color=black']
      },
      {
        question: 'How do you insert a comment in a CSS file?',
        answer: '/* this is a comment */',
        option: ['// this is a comment //','/* this is a comment */','‘ this is a comment','// this is a comment']
      },
      {
      question: 'Which property is used to change the background color?',
      answer: 'background-color:',
      option: ['bgcolor:','background-color:','color:']
      },
      {
        question: 'How do you add a background color for all <h1> elements?',
        answer: 'h1 {background-color:#FFFFFF}',
        option: ['all.h1 {background-color:#FFFFFF}','h1.all {background-color:#FFFFFF}','h1 {background-color:#FFFFFF}']
      },
      // {
      //   question: '',
      //   answer: '',
      //   option: ['','','','']
      // },
      // {
      //   question: '',
      //   answer: '',
      //   option: ['','','','']
      // },
      // {
      //   question: '',
      //   answer: '',
      //   option: ['','','','']
      // },
      // {
      //   question: '',
      //   answer: '',
      //   option: ['','','','']
      // },
      // {
      //   question: '',
      //   answer: '',
      //   option: ['','','','']
      // },
    ],
  }
]
]
],
quizQuest: "",
databaseResult:null
}
this.quizInfo = this.quizInfo.bind(this)
this.back = this.back.bind(this)
this.quizQuestion = this.quizQuestion.bind(this)
this.dataResult = this.dataResult.bind(this)
}
uiConfig = {
signInFlow: "popup",
signInOptions: [
firebase.auth.FacebookAuthProvider.PROVIDER_ID
],
callBack: {
sigInSuccess: () => false
} 
}
componentDidMount = () => {
firebase.auth().onAuthStateChanged(user => {
this.setState({isSignedIn:!!user})
})
}

quizInfo(index){
  const { quizzes } = this.state
      this.setState({
        quiz: quizzes[index]
      })
      
}
 
quizQuestion(index){
  const {quiz} = this.state
  // console.log(index)
  this.setState({
    quizQuest: quiz[index]
  })
}

logout(){
firebase.auth().signOut()
}

dataResult (){
  const {databaseResult,uid} = this.state
  firebase.database().ref('/' + uid + '/').on('child_added',(snapShot)=>{
  console.log('snapShot####',snapShot.val())
  this.setState({databaseResult:snapShot.val()})
      } )}


back(){
  this.setState({
    quiz: ""
  })
}
  renderHeader(){
  const {isSignedIn} = this.state;
  // console.log(quizDiscription)
  return(
  <div style={{backgroundColor: "black", color: "white",}}>
  <h1>Quiz app</h1>
  {isSignedIn ? (
  <div style={{display:'inline-block'}}>
  <img src={firebase.auth().currentUser.photoURL} />
  <p>{firebase.auth().currentUser.displayName}</p>
  <button onClick={this.logout}>Logout</button>
  </div>
  ):
  <div>
  {/* <p>{currentUser}</p> */}
  <StyledFirebaseAuth 
  uiConfig={this.uiConfig} 
  firebaseAuth={firebase.auth()}
  />
  </div>
  }
  </div>
  )
  }
render() {
const {isSignedIn, list, quiz, quizzes, quizQuest,databaseResult } = this.state;
// console.log(quizQuest);
return (
<div className="App">
{this.renderHeader()}

{isSignedIn && (!quiz ? <QuizList  databaseResult={databaseResult} dataResult={this.dataResult} quizInfo = {this.quizInfo} list={list} />
:(quizQuest ? <QuizQuestion databaseResult={databaseResult}  quizQuest={quizQuest} />:<QuizInfo  quizDiscription={this.quizQuestion}  quizzes={quizzes} quizInfo={quiz} back={this.back}/>))}

</div>

);
}
}

export default App;
