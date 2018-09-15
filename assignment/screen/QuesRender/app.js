import React, { Component } from 'react';
// import { inspect } from 'util';
// import './App.css';
// import swal from 'sweetalert';
import firebase from 'firebase'

class QuizQuestion extends Component {
constructor(props){
super(props)
this.state = {
  ques: '',
  result: null,
  uid:firebase.auth().currentUser.uid,
 
}
this.result = this.result.bind(this);
this.question = this.question.bind(this)

}
question(e){
  console.log(e)
   this.setState({ques: e}) 
}

result() {
  const {databaseResult} = this.state
  const { ques,uid } = this.state;
  var allRadios = document.getElementsByTagName("input")
  var result = 0;
   for(var i = 0; i < allRadios.length; i++){
    if(allRadios[i].checked){
      console.log(allRadios[i].value, 'allRadios[i].value');
      console.log(allRadios[i].name, 'allRadios[i].names');
      var index = allRadios[i].name;
      console.log(ques.quizQues[index].answer == allRadios[i].value);
      if(ques.quizQues[index].answer == allRadios[i].value){
          result++;
      } 
  }}
  result = result / ques.quizQues.length * 100 ;
console.log(result,firebase.auth().currentUser.uid)
this.setState({result})
firebase.database().ref('/' +uid +'/').push(result)
}




  render() {
    const { quizQuest } = this.props;
    const {  result, ques,uid,databaseResult } = this.state;
    
    var a = 0;
     return (
      <div className="App"> 
      {result ? <div>
     <button onClick={()=>{this.setState({result: null})}}>back</button>
     <h1>{`Your result is ${result} %`}</h1>
   </div>:(
        <div>
        { databaseResult ? `Your result is ${databaseResult} %`  :  quizQuest.map((value,index)=>{
          // console.log(value)
  return <div>
        <h1>{value.name}</h1>
        {value.quizQues.map((ques,ind)=>{
         return <div>
            <p><b>Q:{++a}</b>{ques.question}</p>
        {ques.option.map(opt=>{
          console.log(firebase.auth().currentUser.uid)
           return <ul>
         <li><input id="radio" type="radio" name={ind} onChange={this.question.bind(this,value)} value={opt} /><span >{opt}</span></li>
        
      </ul>
        })}
         
        </div>
        })}
        
    </div>
})}
{ques ? <button onClick={this.result.bind(this)}>result</button>:<p>please select some options then show the submit button..</p>}
</div>
      )}
          
 
      </div>
    );
  }
}

export default QuizQuestion;
