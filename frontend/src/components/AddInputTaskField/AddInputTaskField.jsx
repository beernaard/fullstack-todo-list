import React from 'react'
import './addinputtaskfield.css'
import {CiCirclePlus} from 'react-icons/ci'
const AddInputTaskField = ({toggleBool}) => {
  return (
    <div className='addinputtaskfield-main-container'>
      <button><CiCirclePlus onClick={toggleBool}/></button>
    </div>
  )
}

export default AddInputTaskField