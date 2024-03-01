const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {dbConnection} = require("./db/config");

//Crear server
const app = express();

//Base de datos
dbConnection()

//Cors
app.use(cors())

//Directorio Publico
app.use(express.static("public"));

// Lectura y parseo del Bosy
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3030");
});
