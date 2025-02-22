const express = require('express')
const router = express.Router();
const {getAllTasks, getSingleTask, createTasks, updateTask, deleteTask}=require('../controllers/tasks')
const {protect} = require('../middleware/auth')

router.get('/',protect,getAllTasks)

router.get('/:id',protect,getSingleTask)


router.post('/',protect,createTasks)

router.put('/:id',protect,updateTask)

router.delete('/:id',protect,deleteTask)

module.exports=router;