import React, { useState } from 'react'
import './tasklistfield.css'
import {AiOutlineDelete,AiOutlineEdit,AiOutlineCheckCircle,AiFillCheckCircle} from 'react-icons/ai'
export default function TaskListField({tasklist,deleteTask,patchTask,patchTaskCompleted}) {
    const [edittask, setEditTask] = useState(false)
    const [updatetask,setUpdateTask] = useState(`${tasklist.task}`)
    const toggleEdit = ()=>{
        setEditTask((prevstate)=>!prevstate)
    }

    const handleEdit = (e)=>{
        setUpdateTask(e.target.value)
        console.log(updatetask)
    }
  return (
    <>
    {tasklist.completed===true?
    <li key={tasklist._id} className='tasklistfield-container-completed'>
        {!edittask?
        <>
        <AiFillCheckCircle className='tasklistfield-container-check' onClick={()=>{
                patchTaskCompleted(tasklist._id,tasklist.completed)
                }}/>
        <input type="text" className='tasklistfield-container-input' readOnly value={tasklist.task}/>
        <AiOutlineEdit className='tasklistfield-container-edit' onClick={toggleEdit}/>
        <AiOutlineDelete className='tasklistfield-container-delete' onClick={()=>deleteTask(tasklist._id)}/>
        </>
        :
        <>
        <AiOutlineCheckCircle className='tasklistfield-container-check' onClick={()=>{
            patchTask(tasklist._id, updatetask);
            toggleEdit()
            }}/>
        <input type="text" className='tasklistfield-container-input-edit' value={updatetask} onChange={handleEdit}/>
        </>
        }    
        
    </li>
    :    
    <li key={tasklist._id} className='tasklistfield-container'>
        {!edittask?
        <>
        <AiOutlineCheckCircle className='tasklistfield-container-check' onClick={()=>{
            patchTaskCompleted(tasklist._id,tasklist.completed)
            }}/>
        <input type="text" id='input' className='tasklistfield-container-input' readOnly value={tasklist.task}/>
        <AiOutlineEdit className='tasklistfield-container-edit'onClick={toggleEdit}/>
        <AiOutlineDelete className='tasklistfield-container-delete' onClick={()=>deleteTask(tasklist._id)}/>
        </>
        :
        <>
        <AiOutlineCheckCircle className='tasklistfield-container-check' onClick={()=>{
            patchTask(tasklist._id, updatetask);
            toggleEdit()
            }}/>
        <input type="text" id='input' className='tasklistfield-container-input-edit' value={updatetask} onChange={handleEdit}/> 
        </>
        }    
        
    </li>
    }
    </>
    
  )
}
