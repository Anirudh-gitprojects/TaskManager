const TasksModel = require('../model/Tasks')
const mongoose=require('mongoose')
// @desc GET all bootcamps
// @route GET /api/v1/bootcamps
// @access Public
exports.getAllTasks=async(req,res,next)=>{
    try{
   
        const task = await TasksModel.find({user:req.user.id});
        if(!task){
            return res.status(400).json({success:false})
        }
        res.status(200).json({success:true,task})

    }
    catch(e){
        res.status(400).json({success:false})

    }

}

// @desc GET single bootcamp    
// @route GET /api/v1/bootcamps/:id
// @access Public
exports.getSingleTask=async(req,res,next)=>{
    try{
        const task = await TasksModel.findById(req.params.id);
        if(!task){
            return res.status(400).json({success:false})
        }
        res.status(200).json({success:true,task})

    }
    catch(e){
        res.status(400).json({success:false})

    }
}


// @desc Create new task
// @route POST /api/v1/tasks
// @access Private
exports.createTasks=async(req,res,next)=>{
    try{
    req.body.user=req.user.id;
    const task = await TasksModel.create(req.body)
    res.status(200).json({success:true,task})
    }
    catch(e){
        res.status(400).json({success:false})
    }
}



// @desc Update task
// @route PUT /api/v1/tasks/:id
// @access Private
exports.updateTask=async(req,res,next)=>{
    try{
        let task = await TasksModel.findById(req.params.id)
        if(!task){
            res.status(400).json({success:false}) 
        }
        
        // Make sure user is task creator/owner
        if(task.user.toString()!==req.user.id){
           return res.status(400).json({success:false,message:`Not authorized to update this task`})

        }

        task = await TasksModel.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })

        res.status(200).json({success:true,task})
        }
        catch(e){
            res.status(400).json({success:false})
        }
 
}


// @desc Delete task
// @route DEL /api/v1/tasks/:id
// @access Private
exports.deleteTask=async(req,res,next)=>{
    try{
        let task = await TasksModel.findById(req.params.id)
        if(!task){
            return res.status(400).json({success:false}) 
        }

                
        // Make sure user is task creator/owner
        if(task.user.toString()!==req.user.id){
            return res.status(400).json({success:false,message:`Not authorized to delete this task`})
 
         }
        task = await TasksModel.findByIdAndDelete(req.params.id)
        res.status(200).json({success:true,task:{}})
        }
        catch(e){
            res.status(400).json({success:false})
        }

}

