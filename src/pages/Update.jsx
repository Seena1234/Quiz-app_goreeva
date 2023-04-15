import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';




const Update = () => {

      const navigate=useNavigate();

    const[id, setId]=useState();
    const[Question, setQuestion]=useState("");
    const[optionA, setOptionA]=useState("");
    const[optionB, setOptionB]=useState("");
    const[optionC, setOptionC]=useState("");
    const[optionD, setOptionD]=useState("");
    const[Answer, setAnswer]=useState("");
    
    
    useEffect(()=>{
       setId( localStorage.getItem("id"));
        setQuestion(localStorage.getItem("Question"));
       setOptionA( localStorage.getItem("optionA"));
        setOptionB(localStorage.getItem("optionB"));
       setOptionC( localStorage.getItem("optionC"));
        setOptionD(localStorage.getItem("optionD"));
       setAnswer( localStorage.getItem("Answer"));
    
    },[])
    
    const handleUpdate=(e)=>{
      e.preventDefault();
        axios.put(`https://642dc8112b883abc6401257e.mockapi.io/quiz-src/${id}`,{
            Question:Question,
            optionA:optionA,
            optionB:optionB,
            optionC:optionC,
            optionD:optionD,
            Answer:Answer
        })
        .then(()=>{
            navigate("/editQuestions")
        })
           
        
    };
    


  return (
    <div style={{marginTop:"100px"}}>
    <h1>Update or Edit The Questions and Options</h1>
    <form style={{margin:"auto",padding:"15px",maxWidth:"400px",alignContent:"center" }}
    onSubmit={handleUpdate}>

     
      <label htmlFor="Question" ><b>Question</b></label>
      <input type="text"
      id='Question' 
      name='Question'
      placeholder='Enter the Question'
      value={Question}
      onChange={(e)=>setQuestion(e.target.value)}/>

<label htmlFor="optionA"><b>Option A</b></label>
      <input type="text"
      id='optionA' 
      name='optionA'
      placeholder='Enter the optionA'
      value={optionA}
      onChange={(e)=>setOptionA(e.target.value)}/>

<label htmlFor="optionB"><b>Option B</b></label>
      <input type="text"
      id='optionB' 
      name='optionB'
      placeholder='Enter the option B'
      value={optionB}
      onChange={(e)=>setOptionB(e.target.value)}/>

<label htmlFor="optionC"><b>Option C</b></label>
      <input type="text"
      id='optionC' 
      name='optionC'
      placeholder='Enter the option C'
      value={optionC}
      onChange={(e)=>setOptionC(e.target.value)}/>

<label htmlFor="optionD"><b>Option D</b></label>
      <input type="text"
      id='optionD' 
      name='optionD'
      placeholder='Enter the optionD'
      value={optionD}
      onChange={(e)=>setOptionD(e.target.value)}/>

<label htmlFor="Answer" ><b>Answer</b></label>
      <input type="text"
      id='Answer' 
      name='Answer'
      placeholder='Enter the Answer carefully'
      value={Answer}
      onChange={(e)=>setAnswer(e.target.value)}/>

<input type="submit" value="Update" />
    </form>
    
  </div>

  )
}

export default Update