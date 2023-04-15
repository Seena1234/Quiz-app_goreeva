import React from 'react'
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import "./App.css"

import AddEdit from './pages/AddEdit';
import View from './pages/View';
import { ToastContainer} from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import TakeTest from './pages/TakeTest';

import EditQuestions from './pages/EditQuestions';
import Update from './pages/Update';
import Play from './pages/Play';
import QuizResults from './pages/QuizResults';
function App() {
  return (
    
    <Router>
      <div className='App'>
        <Header/>
        <ToastContainer position='top-center'/>
        
<Routes>
  <Route path='/' element={<TakeTest/>}/>
  <Route path='/add' element={<AddEdit/>}/>
  <Route path='/update/:id' element={<Update/>}/>
  <Route path='/view/:id' element={<View/>}/>
  <Route path='/login' element={<Login/>}/>
  <Route path='/signup' element={<SignUp/>}/>
  <Route path='/takeTest' element={<TakeTest/>}/>
  <Route path='/editQuestions' element={<EditQuestions/>}/>
  <Route path='/play' element={<Play/>}/>
  <Route path='/QuizResults' element={<QuizResults/>}/>
</Routes>
</div>

    </Router>
  )
}

export default App