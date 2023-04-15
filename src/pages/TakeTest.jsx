import React, { Fragment } from 'react'
import {CodeSandboxOutlined} from '@ant-design/icons'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import "./taketest.css"

const TakeTest = () => {
  return (

    <Fragment>
      <Helmet><title>Quiz App-home</title></Helmet>

<div id='home'>
  <section >
    <div>
    <CodeSandboxOutlined style={{fontSize:"8rem",color:"orange"}} />
    </div>
    <h1>Quiz App</h1>
    <div className='play-button-container'>
    <ul>
      <li>
        <Link className='add-button' to="/add">
          Create
        </Link>
      </li>
      <li>
        <Link className='edit-button' to="/editQuestions">
          EditQuestions
        </Link>
      </li>
      <li>
        <Link className='play-button' to="/Play">
          TakeTest
        </Link>
      </li>
      
    </ul>
    </div>

    <div className='auth-container'>
      <Link to="/login" className='auth-button' id='login-button'>Login</Link>
      <Link to="/signUp" className='auth-button' id='signUp-button'>signUp</Link>

    </div>

  </section>

    </div>

    
    </Fragment>
    
  )
}

export default TakeTest