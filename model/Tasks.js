
const mongoose= require('mongoose')
const slugify = require('slugify');

// Task Schema 
const TaskSchema=new mongoose.Schema({


    title:{
        type:String,
        required:[true,'Please enter a title.'],
        maxlength:[150,'Title cannot be more than 150 characters.'],
        trim: true
    },
    description:{
        type:String,
        required:false,
        maxlength:[500, 'Description cannot be more than 500 characters.'],
        trim:true

    },
    
    createdAt: {
        type: Date,
        default: Date.now
      },

      user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
      }



},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})


module.exports=mongoose.model('Tasks',TaskSchema)