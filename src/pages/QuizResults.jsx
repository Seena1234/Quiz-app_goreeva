
  import React from 'react'
  import { useLocation,Link } from 'react-router-dom'
  import { useState, useEffect, Fragment } from 'react';
  import {BulbOutlined} from "@ant-design/icons"
  import "./result.css"
  
  const QuizResults = () => {

    const location=useLocation();
    console.log(location.state);

    const[score,setScore]=useState(0)
    const[numberOfQuestion,setNumberOfQuestion]=useState(0)
    const[numberOfAnsweredQuestion,setNumberOfAnsweredQuestion]=useState(0)
    const[correctAnswers,setCorrectAnswers]=useState(0)
    const[wrongAnswer,setWrongAnswer]=useState(0)
   
useEffect(()=>{

  setCorrectAnswers(location.state.playerStats.correctAnswers);
  setWrongAnswer(location.state.playerStats.wrongAnswer);
  setNumberOfAnsweredQuestion(location.state.playerStats.numberOfAnsweredQuestion);
  setNumberOfQuestion(location.state.playerStats.numberOfQuestions);
  setScore(((location.state.playerStats.score)/(location.state.playerStats.numberOfQuestions))*100)

},[])
let remark="";
if(score<=30){
  remark="you need more practice!";
}else if(score>30 && score<=50){
  remark="better luck next time!";
}else if(score<=70 && score>50){
  remark="you can do better!";
}else if(score>=71 && score<=84){
remark="you did great!";
}else if(score>84 && score<=100){
remark="you are absolute genius!"
}else if(location.state===undefined){
 remark="take test again "
}else{
  remark="Back to Home Take test again!"
}

    return (
      <Fragment>
        <center>
        <div className='home'>
      <div >
        <span><BulbOutlined  style={{fontSize:"70px",color:"#4caf50"}}/></span>
      </div>
      <h1 id='h1'>Quiz has ended</h1>
      <div className=' container'>
        <h4 id='h4'>{remark}</h4>
        <h2 id='h2'>{score.toFixed(0)}&#37;</h2>
        <span className='stat left'>Total number of Questions: </span>
        <span className='right'>{numberOfQuestion}</span>
        <br />
        <span className='stat left'>Total number of Answered Questions: </span>
        <span className='right'>{numberOfAnsweredQuestion}</span>
        <br />
        <span className='stat left'>Total number of correctAnswers: </span>
        <span className='right'>{correctAnswers}</span>
        <br />
        <span className='stat left'>Total number of wrongAnswers: </span>
        <span className='right'>{wrongAnswer}</span>
      </div>
      <Link to="/"><button id='button'>Back To Home</button> </Link>

      </div>
      </center>
      </Fragment>
    )
  }
  
  export default QuizResults