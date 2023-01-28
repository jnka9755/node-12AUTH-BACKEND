const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();


//Crear el servidor/app de express
const app = express();

//Base de datos
dbConnection();

//Directorio público
app.use( express.static('public') );

//CORS
app.use( cors() );

//Lectura y parsep del body
app.use( express.json() );

//Rutas
app.use( '/api/auth', require( './routes/auth' ) )

//Iniciar servidor
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});