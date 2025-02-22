const mongoose = require('mongoose')

const connectDB = async() =>{

   const con = await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log(`MongodDB connected: ${con.connection.host}`)
}


module.exports = connectDB;