const mongoose = require('mongoose')

const connectDB = async() =>{

   const con = await mongoose.connect('mongodb+srv://dbTasks:IUSM17gq1zbEvFlm@cluster0.wsvek.mongodb.net/',{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    console.log(`MongodDB connected: ${con.connection.host}`)
}


module.exports = connectDB;