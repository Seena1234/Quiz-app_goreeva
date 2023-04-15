import React,{useState,Fragment} from 'react'
import {useNavigate} from "react-router-dom"
import "./addEdit.css";
import NotificationSound from "../assets/audio/correctSound.mpeg"


import {toast} from "react-toastify";
import axios from 'axios';


const initialState={
  Question:"",
  optionA:"",
  optionB:"",
  optionC:"",
  optionD:"",
  Answer:""
}

const AddEdit = () => {
const [state,setState]=useState(initialState);


const history=useNavigate();

const{Question, optionA, optionB, optionC, optionD, Answer}=state;




const handleInputChange=(e)=>{
  const{name,value}=e.target;
  setState({...state,[name]:value});

};

const handleSubmit=(e)=>{
  e.preventDefault();
  if(!Question || !optionA || !optionB || !optionC || !optionD || !Answer){
    toast.error("please provide value in each input Field")
  }else{

   // if(!id){
    axios.post("https://642dc8112b883abc6401257e.mockapi.io/quiz-src",{
      Question:Question,
      optionA:optionA,
      optionB:optionB,
      optionC:optionC,
      optionD:optionD,
      Answer:Answer
     }).then(()=>{
      history("/editQuestions");
      toast.success("Question Added Successfully")
      playButtonSound();
     })
    
setTimeout(()=>{history('/editQuestions')})
  }

};

let playButtonSound=()=>{
  document.getElementById("correct-sound").play();
}
 
  return (
    
   <center>
    <Fragment>
        <audio id='correct-sound' src={NotificationSound}></audio>
      </Fragment>
     <div style={{marginTop:"100px",backgroundColor:"rgba(0,0,0,0.7)",width:"40%",borderRadius:"4%"}}>
      <h1 style={{
        color:"white"
      }}>Add the Question and Answers to create quizz</h1>
      <form style={{margin:"auto",padding:"15px",maxWidth:"400px",alignContent:"center" }}
      onSubmit={handleSubmit} id='form'>

       
        <label htmlFor="Question" ><b>Question</b></label>
        <input type="text"
        id='Question' 
        name='Question'
        placeholder='Enter the Question'
        value={Question}
        onChange={handleInputChange}/>

<label htmlFor="optionA"><b>Option A</b></label>
        <input type="text"
        id='optionA' 
        name='optionA'
        placeholder='Enter the optionA'
        value={optionA}
        onChange={handleInputChange}/>

<label htmlFor="optionB"><b>Option B</b></label>
        <input type="text"
        id='optionB' 
        name='optionB'
        placeholder='Enter the option B'
        value={optionB}
        onChange={handleInputChange}/>

<label htmlFor="optionC"><b>Option C</b></label>
        <input type="text"
        id='optionC' 
        name='optionC'
        placeholder='Enter the option C'
        value={optionC}
        onChange={handleInputChange}/>

<label htmlFor="optionD"><b>Option D</b></label>
        <input type="text"
        id='optionD' 
        name='optionD'
        placeholder='Enter the optionD'
        value={optionD}
        onChange={handleInputChange}/>

<label htmlFor="Answer" ><b>Answer</b></label>
        <input type="text"
        id='Answer' 
        name='Answer'
        placeholder='Enter the Answer carefully'
        value={Answer}
        onChange={handleInputChange}/>

  <input type="submit" value="save" />
      </form>
      
    </div>
   </center>
  )
}

export default AddEdit