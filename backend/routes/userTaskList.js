const express = require('express')
const router = express.Router()
const {getAllTask,createTask, getOneTask, PatchTask, DeleteTask} = require('../controller/taskController')

router.route('/').get(getAllTask).post(createTask)
router.route('/:id').get(getOneTask).patch(PatchTask).delete(DeleteTask)




module.exports = router