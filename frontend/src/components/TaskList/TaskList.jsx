import React from 'react'
import './tasklist.css'
import TaskListField from './TaskListField'
const TaskList = ({APItask,deleteTask,patchTask,patchTaskCompleted}) => {
  return (
    <div className='tasklist-container'>
      <ul className='tasklist-ul-container'>
        {APItask.toReversed().map((tasklist)=>{
          return (<TaskListField key={tasklist._id} tasklist={tasklist} deleteTask={deleteTask} patchTask={patchTask} patchTaskCompleted={patchTaskCompleted}/>)
        })}  
      </ul>
    </div>
  )
}

export default TaskList