import React, { useEffect, useRef, useState } from 'react'
import './register.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCircleExclamation} from '@fortawesome/free-solid-svg-icons'
import {Navigate ,Link} from 'react-router-dom'
import axios from 'axios'
   const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
    const REGISTER_URL='/auth/register'
const Register = () => {
  const userRef = useRef()
  const errorRef = useRef()
  const [errorMsg, setErrorMsg] = useState("")
  const [succes, setsuccess] = useState(false)
  
  const [user, setUser] = useState("")
  const [isvalidname, setIsValidName] = useState(false)
  const [userfocus, setUserFocus] = useState(false)

  const [pass, setPass] = useState("")
  const [isValidPass, setIsValidPass] = useState(false)
  const [passFocus, setPassFocus] = useState(false)

  const [matchPass, setMatchPass] = useState("")
  const [isValidMatch, setIsValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  useEffect(()=>{
    userRef.current.focus()
  },[])

  useEffect(()=>{
    const result =  USER_REGEX.test(user)
    console.log(result)
    console.log(user)
    setIsValidName(result)
  },[user])

  useEffect(()=>{
    const result =  PWD_REGEX.test(pass)
    console.log(result)
    console.log(user)
    setIsValidPass(result)
    const match = pass === matchPass
    setIsValidMatch(match)
  },[pass, matchPass])

  useEffect(()=>{
    setErrorMsg("")
  },[user,pass,matchPass])

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const v1 = USER_REGEX.test(user)
    const v2 = PWD_REGEX.test(pass)
    if(!v1||!v2){
      return setErrorMsg("Invalid Entry")
    }
    //API POST
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`,{
        username:user,
        password:pass
      },{
        headers:{'Content-Type':'application/json'},
        withCredentials:true
      });
      setsuccess(true)
    } catch (error) {
      console.log(error.response.data.msg)
      setErrorMsg(error.response.data.msg)
    }
  }

  return (
    <>
    {succes ?(
      <Navigate to='/'/> 
    ):
      <div className='register-main-container'>
      <h3>Register</h3>
      <p ref={errorRef} className={errorMsg?"error-msg":"hide"} aria-live='assertive'>{errorMsg}</p>
      <form onSubmit={handleSubmit}>
        <input className='register-username' type="text" placeholder='Enter Username...'
          ref={userRef}
          autoComplete='off'
          onChange={e=>setUser(e.target.value)}
          value={user}
          required
          aria-invalid={isvalidname ? "false" : "true"}
          aria-describedby='uidnote'
          onFocus={()=>setUserFocus(true)}
          onBlur={()=>setUserFocus(false)}/>
          <p id='uidnote' className={userfocus && user && !isvalidname ? "instruction":"hide"}>
            <FontAwesomeIcon icon={faCircleExclamation} />
            4 to 24 characters.<br/>
            Must begin with a letter.<br/>
          </p>
        <input className='register-password' type="password" placeholder='Enter Password...'
          onChange={e=>setPass(e.target.value)}
          value={pass}
          required
          aria-invalid={isValidPass ? "false" : "true"}
          aria-describedby='pwdnote'
          onFocus={()=>setPassFocus(true)}
          onBlur={()=>setPassFocus(false)}/>
          <p id='pwdnote' className={passFocus && pass && !isValidPass ? "instruction":"hide"}>
            <FontAwesomeIcon icon={faCircleExclamation} />
            8 to 28 characters.<br/>
            Must include uppercase and lowercase letters, a number, and a special character<br/>
          </p>
        <input className='register-confirmpassword' type="password" placeholder='Confirm Password...'
          onChange={e=>setMatchPass(e.target.value)}
          value={matchPass}
          required
          aria-invalid={isValidMatch ? "false" : "true"}
          aria-describedby='confirmnote'
          onFocus={()=>setMatchFocus(true)}
          onBlur={()=>setMatchFocus(false)}/>
          <p id='confirmnote' className={matchFocus && !isValidMatch ? "instruction":"hide"}>
            <FontAwesomeIcon icon={faCircleExclamation} />
            Password did not match.<br/>
          </p>
        <button className='register-button'
        disabled={!isvalidname ||!isValidPass||!isValidMatch ? true : false}>Sign Up</button>
      </form>
      <div className='register-footer'>
        <p>Already have an account?</p>
        <Link to='/'>Login</Link>
      </div>
    </div>
    }
    </>
  )
}

export default Register