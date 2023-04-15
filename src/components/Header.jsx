import React,{useEffect,useState} from 'react'
import { Link,useLocation } from 'react-router-dom'
import "./header.css" 
import TakeTest from '../pages/TakeTest'
const Header = () => {
  const [activeTab,setActiveTab]=useState("Home")
  const location=useLocation();
  useEffect(()=>{
    if (location.pathname==="/"){
      setActiveTab("Home")
    }else if(location.pathname==="/login"){
      setActiveTab("Login")
    }else if(location.pathname==="/signUp"){
      setActiveTab("SignUp")
    }else if(location.pathname==="/takeTest"){
      setActiveTab("Home")
    }

  },[Location]);
  return (
    <div className='header'>
      <p className='logo'>Goreeva</p>
      <div className='header-right'>
        <Link to="/">
          <p className={`${activeTab ==="Home" ? "active" : ""}`} onClick={()=>{
            setActiveTab("Home")
          }}>
          Home  
          </p>
        </Link>

        <Link to="/login">
          <p className={`${activeTab ==="Login" ? "active" : ""}`} onClick={()=>{
            setActiveTab("Login")
          }}>
    Login
          </p>
        </Link>

        <Link to="/signUp">
          <p className={`${activeTab ==="SignUp" ? "active" : ""}`} onClick={()=>{
            setActiveTab("SignUp")
          }}>
          SignUp 
          </p>
        </Link>

        <Link to="/play">
          <p className={`${activeTab ==="TakeTest" ? "active" : ""}`} onClick={()=>{
            setActiveTab("TakeTest")
          }}>
          TakeTest  
          </p>
        </Link>
      </div>

    </div>
  )
}

export default Header