import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Register from './scenes/register/Register'
import Login from './scenes/login/Login'
import UserTaskList from './scenes/tasklist/UserTaskList'
import './App.css'
const App = () => {
  return (
    <div> 
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/tasklist" element={<UserTaskList/>}/>
      </Routes>
    </div>
    
  )
}

export default App