import axios from 'axios'
import React, { useState,useEffect,Fragment } from 'react'
import { Link } from 'react-router-dom'
import "./editQuestions.css"
import { toast } from 'react-toastify'
import NotificationSound from "../assets/audio/correctSound.mpeg"


const EditQuestions = () => {

 const[data,setData]= useState([])

function getData(){
  axios.get("https://642dc8112b883abc6401257e.mockapi.io/quiz-src")
  .then((res)=>{
if(res.data!=null){
  setData(res.data);
}else{
  setData([])
}
    
  })

}
useEffect(()=>{
  getData();
},[data])

const onDelete=(id)=>{
  if(window.confirm("are you sure that you wanted to delete that Question ?")){
    axios.delete(`https://642dc8112b883abc6401257e.mockapi.io/quiz-src/${id}`).then(()=>{
      
  
      playButtonSound();
      toast.success("Queston deleted successfully");
      getData();  
      
    })
  }
}

const setToLocalStorage=(id,Question,optionA,optionB,optionC,optionD,Answer)=>{
  localStorage.setItem("id",id)
  localStorage.setItem("Question",Question)
  localStorage.setItem("optionA",optionA)
  localStorage.setItem("optionB",optionB)
  localStorage.setItem("optionC",optionC)
  localStorage.setItem("optionD",optionD)
  localStorage.setItem("Answer",Answer)
}

useEffect(()=>{
  getData();
},[])


let playButtonSound=()=>{
  document.getElementById("correct-sound").play();
}


  return (
    <div style={{marginTop:"100px"}}>
      <Fragment>
        <audio id='correct-sound' src={NotificationSound}></audio>
      </Fragment>
      <table className='styled-table'>
        <thead>

          <tr>
            <th style={{textAlign:"center"}}>QNO.</th>
            <th style={{textAlign:"center"}}>Question</th>
            <th style={{textAlign:"center"}}>optionA</th>
            <th style={{textAlign:"center"}}>optionB</th>
            <th style={{textAlign:"center"}}>optionC</th>
            <th style={{textAlign:"center"}}>optionD</th>
            <th style={{textAlign:"center"}}>Answer</th>
            <th style={{textAlign:"center"}}>Actoin</th>
          </tr>
        </thead>
        {
          data.map((eachdata,index,id)=>{

            return(
              <>
              <tbody>
                
                <tr key={id}>
                  <th scope='row'>{index+1}</th>
                <td>{eachdata.Question}</td>
                   <td>{eachdata.optionA}</td>
                   <td>{eachdata.optionB}</td>
                   <td>{eachdata.optionC}</td>
                   <td>{eachdata.optionD}</td>
                   <td>{eachdata.Answer}</td>
                   <td>
                    <Link to={`/update/:${id}`}>
                    <button className='btn btn-edit' onClick={()=>setToLocalStorage(eachdata.id,
                      eachdata.Question,
                      eachdata.optionA,
                      eachdata.optionB,
                      eachdata.optionC,
                      eachdata.optionD,
                      eachdata.Answer)}>Edit</button>
                    </Link>
                    <button className='btn btn-delete' onClick={()=>onDelete(eachdata.id)}>Delete</button>
                    <Link to={`/view/:${id}`}>
                    <button className='btn btn-view'>View</button>
                    </Link>
                   </td>
                   
                </tr>

</tbody>

              </>
              
              
            )

          })
           
        }
       
      </table>

<center><Link to="/add">
<button className='btn btn-add'>
  Add Question
</button>
</Link></center>

    </div>
  )
}

export default EditQuestions