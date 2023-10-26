const taskSchema = require('../model/taskSchema')
const userSchema = require('../model/userSchema')
const asyncWrapper = require('../middleware/asyncWrapper')

//SAMPLE OF REFACTORED CODE
const getAllTask = asyncWrapper(async (req,res)=>{  
        const task = await taskSchema.find(req.query)
        res.status(200).json({task})
})

const createTask = async(req,res)=>{
   try {
    const {userId, task} =req.body
    const user = await userSchema.findById(userId)
    const newTask = new taskSchema({
        userId,
        username: user.username,
        task:task
    });
    await newTask.save()
     res.status(200).json({newTask})
   } catch (error) {
    console.log(error)
   }
}

const getOneTask = async(req,res)=>{
    try {
        const {id:taskID} = req.params
        const task = await taskSchema.findById({_id:taskID})
        !task? res.status(404).json({message:`no task with id: ${taskID}`}):res.status(200).json({task})
    } catch (error) {
        console.log(error)
    }
}

const PatchTask = async(req,res)=>{
    try {
        const {id:taskID} = req.params
        const task = await taskSchema.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true,
        })
        !task? res.status(404).json({message:`no task with id: ${taskID}`}):res.status(200).json({task})
    } catch (error) {
        console.log(error)
    }
}

const DeleteTask = async (req,res)=>{
    try {
        const {id:taskID} = req.params
        const task = await taskSchema.findByIdAndDelete({_id:taskID})
        !task? res.status(404).json({message:`no task with id: ${taskID}`}):res.status(200).json({task})
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllTask,
    createTask,
    getOneTask,
    PatchTask,
    DeleteTask,
}