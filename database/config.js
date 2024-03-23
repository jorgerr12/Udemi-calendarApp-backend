const mongoose = require("mongoose");




const dbConnection = async()=>{
    try {
      await  mongoose.connect(process.env.DB_CNN);
      console.log('Se conecto a la base de datos')
    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar base de datos')
    }
}

module.exports ={
    dbConnection
}