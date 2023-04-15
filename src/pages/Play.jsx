import React,{Fragment} from 'react'
import { useState,useEffect} from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import{ClockCircleOutlined} from "@ant-design/icons"
import "./play.css"
import m from "materialize-css"
import buttonNotificationSound from "../assets/audio/button.mpeg"
import correctNotificationSound from "../assets/audio/correctSound.mpeg"
import wrongNotificationSound from "../assets/audio/wrongAns.mpeg"
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames'




const Play = () => {

const[data,setData]=useState([]);
const[currentQuestion,setCurrentQuestion]=useState({});
const[currentQuestionIndex,setCurrentQuestionIndex]=useState(0);
const[score,setScore]=useState(0);
const [nextQuestion,setNextQuestion]=useState({})
const[previousQuestion,setPreviousQuestion]=useState({})
const[numberOfQuestions,setNumberOfQuestions]=useState(0)
const[correctAnswers,setCorrectAnswers]=useState(0)
const[wrongAnswer, setWrongAnswers]=useState(0)
const[answer,setAnswer]=useState();
const [time,setTime]=useState({})
const[numberOfAnsweredQuestion,setNumberOfAnsweredQuestion]=useState(0);
const[nextButtonDisabled,setNextButtonDisabled]=useState(false);
const[previousButtonDisabled,setPreviousButtonDisabled]=useState(true);

const history=useNavigate();
const interval=null;


function getData(){
  axios.get("https://642dc8112b883abc6401257e.mockapi.io/quiz-src")
  .then((res)=>{
if(res.data!=null && currentQuestionIndex !== (res.data.length)){
  let data1=(res.data[currentQuestionIndex])
  
  
  setData(data1);
  setCurrentQuestion(data1);
  setNextQuestion(res.data[currentQuestionIndex+1])
  setPreviousQuestion(res.data[currentQuestionIndex-1])
  setAnswer(data.Answer)
  setNumberOfQuestions((res.data).length)

 
}else{
  // setData([])
  endGame()
}
    
  })
  handleDisabledButton();
}
useEffect(()=>{
  startTimer();
  getData();
  
},[data])


useEffect(()=>{
  clearInterval(interval)
})

let handleOptionClick=(e)=>{
  playButtonSound()
  let que=((e.target.innerHTML)+"");
  let ans=(answer+"");
  if((que.toLowerCase())=== (ans).toLowerCase()){

    setTimeout(()=>{
      document.getElementById("correct-sound").play();
    },500)

correctAnswerFunction();
  }else{
    setTimeout(()=>{
      document.getElementById("wrong-sound").play();
    },500)

    wrongAnswerFunction()
  }
 
  

}
let handleButtonClick=(e)=>{
  switch(e.target.id){
    case "next-button":
      handleNextButtonClick();
      break;
      case "previous-button":
        handlePreviousButtonClick();
        break;
        case "quit-button":
          handleQuitButtonClick();
          break
          default:
            break
  }

}

let playButtonSound=()=>{
  document.getElementById("button-sound").play();
}

let correctAnswerFunction=()=>{
  m.toast({
    html:"correct Answer!",
    classes:"toast-valid",
    

  });
  setScore(score+1);
  setCorrectAnswers(correctAnswers+1);
  setCurrentQuestionIndex(currentQuestionIndex+1)
  setNumberOfAnsweredQuestion(numberOfAnsweredQuestion+1);

  if(nextQuestion === undefined){
    endGame();
  }else{
    getData();
  }

}

let wrongAnswerFunction=()=>{
  navigator.vibrate(1000)
m.toast({
  html:"wrong Answer!",
  classes:"toast-invalid",
  
})
  setWrongAnswers(wrongAnswer+1)
setCurrentQuestionIndex(currentQuestionIndex+1)
setNumberOfAnsweredQuestion(numberOfAnsweredQuestion+1)
if(nextQuestion === undefined){
  endGame();
}else{
  getData();
}

}


let handleNextButtonClick=()=>{
  playButtonSound();
if(nextQuestion !== undefined ){
  setCurrentQuestionIndex(currentQuestionIndex+1)
  getData();
}
}

let handlePreviousButtonClick=()=>{
  playButtonSound();
  if(previousQuestion !== undefined){
    setCurrentQuestionIndex(currentQuestionIndex-1)
    getData();
  }
}
let handleQuitButtonClick=()=>{
  playButtonSound();
  if(window.confirm("Are you sure you want to Quit?")){

endGame();
  }

}



 let startTimer=()=>{
  const countDownTime=Date.now()+180000
  setInterval(() => {
    const now=new Date();
    const distance=countDownTime-now;
    const minutes=Math.floor((distance % (1000*60*60))/(1000*60));
    const seconds=Math.floor((distance % (1000*60))/(1000));

    if(distance<0){
      clearInterval(interval);
      setTime({
        minutes:0,
        seconds:0
      })
      
      endTime();
      
      
     
    }else{
      setTime({
        minutes:minutes,
        seconds:seconds
      })
    }
    
  }, 1000);
 }

 let handleDisabledButton=()=>{
  if(previousQuestion === undefined || currentQuestionIndex === 0){
    setPreviousButtonDisabled(true);
  }else{
    setPreviousButtonDisabled(false);
  }

  if(nextQuestion === undefined || currentQuestionIndex === numberOfQuestions){
    setNextButtonDisabled(true);
  }else{
    setNextButtonDisabled(false);
  }
  

 }

 let endTime=()=>{

  const playerStats={
    score: score,
     numberOfQuestions:numberOfQuestions,
     numberOfAnsweredQuestion:numberOfAnsweredQuestion ,
     correctAnswers:correctAnswers,
     wrongAnswer:wrongAnswer
     
   };
  console.log(playerStats);
  setTimeout(() => {
    history("/QuizResults",{state:{playerStats}});
    
  },1500
  );


 }

 let endGame=()=>{
  alert("Quiz has ended!")
  const playerStats={
   score: score,
    numberOfQuestions:numberOfQuestions,
    numberOfAnsweredQuestion:numberOfAnsweredQuestion ,
    correctAnswers:correctAnswers,
    wrongAnswer:wrongAnswer
    
  };
  console.log(playerStats);
  setTimeout(() => {
    history("/QuizResults",{state:{playerStats}});
    
  }, 1500);

 }

 


  return (
    
    <div>
    <Fragment>
        <Helmet><title>quiz App-play</title></Helmet>
        <Fragment>
          <audio id='button-sound' src={buttonNotificationSound}></audio>
          <audio id='correct-sound' src={correctNotificationSound}></audio>
          <audio id='wrong-sound' src={wrongNotificationSound}></audio>
        </Fragment>
        <div className='Questions'>

            <h2>Quiz-Mode</h2>
            <div className='time-container'>
                
                    <span className='left' style={{color:"black",float:"left"}}>{currentQuestionIndex+1} 0f {numberOfQuestions}</span>
                    <span style={{padding:"2rem",float:"right"}}>{time.minutes}:{time.seconds}<span><ClockCircleOutlined style={{fontSize:"30px"}}/></span></span>
                
            </div>
            <div>
            
            <h5>{data.Question}</h5>
            <div className='options-container'>
            <p onClick={handleOptionClick} className='option'>{data.optionA}</p>
            <p onClick={handleOptionClick} className='option'>{data.optionB}</p>
            </div>
            <div className='options-container'>
            <p onClick={handleOptionClick} className='option'>{data.optionC}</p>
            <p onClick={handleOptionClick} className='option'>{data.optionD}</p>
            </div>
    
            
            <div className='button-container'>
    <button className={classNames("",{'disable':previousButtonDisabled})} id='previous-button' onClick={handleButtonClick}>Previous</button>
    <button className={classNames("",{'disable':nextButtonDisabled})} id='next-button' onClick={handleButtonClick}>Next</button>
    <button id='quit-button' onClick={handleButtonClick}>quit</button>
            </div>
    
    

            </div>
                </div>
    </Fragment>
    
        </div>
  
  
  )
}

export default Play