import React, { useEffect, useState } from 'react'
import { AddInputTaskField,InputTask,TaskList,Header } from '../../components'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import './usertasklist.css'
import useAuth  from '../../hooks/useAuth'
const UserTaskList = () => {
  const {auth} = useAuth()
  const [APItask, setAPITask] = useState([])
  const [addInputField, setAddInputField] = useState(false)
  const [taskList, setTaskList] = useState({
    taskName:"",
    completed:false
  })
  const {taskName}=taskList
  const axiosPrivate =useAxiosPrivate();
  
  const getTask= async(controller,isMounted)=>{
    try {
      const response = await axiosPrivate.get('/user',{
        params:{
          userId:auth.userId,
        },
        signal: controller.signal,
      })
      isMounted && setAPITask(response.data.task)
    } catch (error) {
      console.log(error)
    }
  }
  
  
  const toggleBool = ()=>{
    setAddInputField((prevstate)=>!prevstate)
  }
  const inputtaskFunction = (e)=>{
    const {value} =e.target
    console.log(value)
    setTaskList({...taskList,taskName:value})
  }

  const createTask = async (e)=>{
    e.preventDefault()
    if(taskList.taskName===""){
      console.log(`hello`)
      return toast.error('Input field cannot be empty', {
        position: toast.POSITION.TOP_RIGHT
    });
    }
    try {
      await axiosPrivate.post('/user',{
        userId:auth.userId,
        username:auth.username,
        task:taskList.taskName
      })
      toast.success("Added Successfully", {
        position: toast.POSITION.TOP_RIGHT
    });
      setTaskList({...taskList, taskName:""})
      toggleBool()
    } catch (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT
    });
    }
  }

  // const getTask = async()=>{
  //   await axios.get(`${process.env.REACT_APP_API_URL}`)
  //   .then((res)=>{
  //     console.log(res.data);
  //     setAPITask(res.data.task)
  //   })
  //   .catch((err)=>{
  //     toast.error(err, {
  //       position: toast.POSITION.TOP_RIGHT
  //   });
  //   })
  // }

  const deleteTask = async(id)=>{
    await axiosPrivate.delete(`user/${id}`)
    .then((res)=>{
      console.log(res.data);
      getTask()
      toast.success("Deleted Successfully", {
        position: toast.POSITION.TOP_RIGHT
    });
    })
    .catch((err)=>{
      toast.error(err, {
        position: toast.POSITION.TOP_RIGHT
    });
    })
  }
  const patchTask = async(id, newTask)=>{
    await axiosPrivate.patch(`user/${id}`,{
      task:newTask,
    })
    .then((res)=>{
      console.log(res.data);
      isMounted && getTask()
      toast.success("Updated Successfully", {
        position: toast.POSITION.TOP_RIGHT
    });
    })
    .catch((err)=>{
      toast.error(err, {
        position: toast.POSITION.TOP_RIGHT
    });
    })
  }
  useEffect(()=>{
    let isMounted  = true
  const controller = new AbortController()
    getTask(controller,isMounted);
    return()=>{
      isMounted=false
      controller.abort()
    }
  })

  const patchTaskCompleted = async(id, bool)=>{
    await axiosPrivate.patch(`user/${id}`,{completed:!bool})
    .then((res)=>{
      console.log(res.data);
      getTask()
      toast.success("Updated Successfully", {
        position: toast.POSITION.TOP_RIGHT
    });
    })
    .catch((err)=>{
      toast.error(err, {
        position: toast.POSITION.TOP_RIGHT
    });
    })
  }

    


  // useEffect(()=>{
  //   getTask()
  // },[taskList])
  return (
    <>
    <ToastContainer/>
    <div className='main-container'>
      <Header text="'s To do List"/>
      <div className='main-container-content'>
        {addInputField && <InputTask className='main-container-inputtask' toggleBool={toggleBool} createTask={createTask} taskName={taskName} inputtaskFunction={inputtaskFunction}/>}
        <TaskList className='main-container-taskfield' patchTask={patchTask} deleteTask={deleteTask} APItask={APItask} patchTaskCompleted={patchTaskCompleted}/>
      </div>
      <AddInputTaskField toggleBool={toggleBool}/>
    </div>
    </>
  )
}

export default UserTaskList