import React, { useEffect, useRef, useState } from 'react'
import './login.css'
import {Navigate ,Link} from 'react-router-dom'
import axios from 'axios'
import useAuth from '../../hooks/useAuth'
const LOGIN_URL='/auth/login'
const Login = () => {
  const userRef = useRef()
  const errorRef = useRef()

  const {setAuth} = useAuth()
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(()=>{
    userRef.current.focus()
  },[])

  useEffect(()=>{
    setErrorMsg("")
  },[user, pass])

  const handleSubmit = async(e)=>{
    e.preventDefault()
    console.log(user,pass)
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`,{
        username:user,
        password:pass,
      },{
        headers:{'Content-Type':'application/json'},
        withCredentials:"same-origin"
      })
      .then((res)=>{
        console.log(res)
        console.log(res.data.accessToken)
        console.log(res.data.userId)
        console.log(res.data.username)
        // console.log(res.data.token)
        setAuth({
          accessToken:res.data.accessToken,
          userId:res.data.userId,
          username:res.data.username
        })
        setUser("")
        setPass("")
        setSuccess(true)
      })
    } catch (error) {
      console.log(error)
      console.log(error.response.data.msg)
      setErrorMsg(error.response.data.msg)
    }
  }
  return (
    <>
    {success?
      <Navigate to='/tasklist'/>
      :
      (
        <div className='login-container'>
        <h3>Sign In</h3>
        <p ref={errorRef} className={errorMsg?"error-msg":"hide"} aria-live='assertive'>{errorMsg}</p>
        <form onSubmit={handleSubmit}>
          <input className='login-username' type="text" placeholder='Enter Username...'
            ref={userRef}
            autoComplete='off'
            onChange={e=>setUser(e.target.value)}
            value={user}
            required/>
          <input className='login-password' type="password" placeholder='Enter Password...'
            onChange={e=>setPass(e.target.value)}
            value={pass}
            required/>
          <button className='login-button'>Sign In</button>
        </form>
        <div className='login-footer'>
          <p>Don't have an account?</p>
          <Link to='/register'>Register here</Link>
        </div>
      </div>
      )
      }
   
    </>
    
    
  )
}

export default Login