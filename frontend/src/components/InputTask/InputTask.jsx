import React from 'react'
import './inputtask.css'
import {AiOutlineCheckCircle,AiOutlineCloseCircle} from 'react-icons/ai'
const InputTask = ({toggleBool,createTask, taskName, inputtaskFunction}) => {
  
  return (
    <div className='inputtask-main-container'>
      <input className='inputtask-input' type="text" placeholder='Input Task...'
      value={taskName}
      onChange={inputtaskFunction}/>
      <button className='inputtask-btn-add'><AiOutlineCheckCircle className='svgadd' onClick={createTask}/></button>
      <button className='inputtask-btn-cancel'><AiOutlineCloseCircle className='svgremove' onClick={toggleBool}/></button>
    </div>
  )
}

export default InputTask