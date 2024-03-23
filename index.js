const express = require('express');
const { dbConnection } = require('./database/config');
const cors =require('cors')
require('dotenv').config();





const app= express();

//Base de datos

dbConnection()

//Directorio publico
app.use(cors())

app.use(express.static('public'));
app.use(express.json())


app.use('/api/events',require('./routes/events'));
app.use('/api/auth',require('./routes/auth'));





app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
})