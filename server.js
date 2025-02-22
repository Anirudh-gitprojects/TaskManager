const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require('./config/db')
// Route files
const tasks = require('./routes/tasks')
const auth = require('./routes/auth')
// Load env vars 
dotenv.config({path:'./config/config.env'})
const cors = require('cors');

// Connect to DB
connectDB();
// Inititalize express
const app=express(); 

app.use(cors({origin: true, credentials: true}));
app.use(express.json())

// Dev logging middleware
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

// Mount routers
app.use('/api/v1/tasks',tasks)
app.use('/api/v1/auth',auth)


const PORT = process.env.PORT || 5000;


const server = app.listen(PORT,()=>{
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
});

// Handle unhandled promise rejections
process.on('unhandledRejection',(err,promise)=>{
    console.log(`Error: ${err.message}`)
    server.close(()=>process.exit(1));
})