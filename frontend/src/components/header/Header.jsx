import React from 'react'
import './header.css'
import useAuth from '../../hooks/useAuth'
const Header = ({text}) => {
  const {auth} = useAuth()
  return (
    <div className='header-container'>
        <h4>{auth.username}{text}</h4>
    </div>
  )
}

export default Header