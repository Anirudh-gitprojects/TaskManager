const jwt=require('jsonwebtoken')
const User=require('../model/User')
const dotenv=require('dotenv').config('./config/config.env')

// Protect routes

exports.protect=async(req,res,next)=>{
    let token;
 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        // Set token with hearders
        token=req.headers.authorization.split(' ')[1]
    }
 

    if(!token){
       
        return res.status(400).json({success:false,message:'Not authorized to access this route!'})
    }   
    try{
        // Verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
       console.log('decoded',decoded)
        req.user=await User.findById(decoded.id)
        next();
    }
    catch(err){
        console.log(err)
        return res.status(400).json({success:false,message:'Not authorized to access this route!'})
    }   
}




// Grant access to specific roles

exports.authorize = (...roles) =>{

    return (req,res,next)=>{
        console.log(req.user)
        if(!roles.includes(req.user.role)){
            return next(new ErrorResponse(`User with role ${req.user.role} is not authorized to access this route`,401))
        }
        next();
    }
}