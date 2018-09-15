import React, { Component } from 'react';
import './App.css';
// import swal from 'sweetalert';

class QuizInfo extends Component {
constructor(props){
super(props)
this.state = {
}
}
  render() {
    const {quizInfo, back, quizDiscription, quizDis, } = this.props;
    return (
      <div>
        <button className="back" onClick={back}>Back</button><br/>
       {/* <h1>{quizInfo.name}</h1> */}
       {
         quizInfo.map((value,index)=>{
          //  console.log(value)
              return   <div className="quiz-details">  
                     {value.map((quiz,ind)=>{
                       return <div>
                        <h1>{quiz.name}</h1>
                        {quizInfo && <div>
          <p><b>Total Questions:</b> {quiz.questions}</p>
          <p><b>Time Duration:</b> {quiz.time}</p>
          <p><b>passing Score:</b> {quiz.passingScore}</p>
                        </div>
                         }
                        <button onClick={()=>{quizDiscription(index)}}>start quiz</button>
                        </div>
                     })}
                     </div>
             })}
         
     
      
        </div>
    );
  }
}

export default QuizInfo;
