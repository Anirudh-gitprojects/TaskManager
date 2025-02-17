const express = require('express')
const dotenv = require('dotenv')

// Load env vars 
dotenv.config({path:'./config/config.env'})

// Inititalize express
const app=express();

const PORT = process.env.PORT || 5000;

app.get('/',(req,res,next)=>{
    res.send('<h1>Hello</h1>')
})

app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});