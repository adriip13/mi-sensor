// npm init

// Instalamos las dependencias necesarias

// npm install express 
/** (Servidor web para poner a la escucha nuestro servidor
    a las peticiones que realice el cliente.)*/

// npm install nodemon
/** (Apaga y arranca el servidor cada vez que haya cambios.)*/

// npm install morgan
/** (Ver las peticiones http que nos llegan al servidor.)*/

// npm install cors
/** (Permite el acceso desde los clientes.)*/

// npm install dotenv
/** (Fichero de configuración para guardar las constantes y variables que
 * use en el sistema.)*/

// npm install helmet
/** (Protección frente a ataques desde el exterior.)*/

// npm install JsonWebToken
/** (Autenticación (login) usando el mecanismo JWT. Nos permite generar y firmar
 * el token que entregaremos al cliente (otra alternativa: jwt-simple) )*/

// npm install mongoose
/** (ORM de la BBDD MongoDB para almacenar la información, nos permite
 * realizar consultas de forma sencilla.) */

// Crear contenedor docker
// docker run --name mongo -d -p 2018:2017 mongo


// Creamos los ficheros y directorios iniciales:

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const datoRoutes = require('./routes/datoRoutes')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const morgan = require('morgan')
const helmet = require('helmet')
const app = express()
app.use(express.urlencoded());
app.use(express.json())
app.use(cors())
app.use(morgan('tiny')) //dev
app.use(helmet())
dotenv.config()

app.use('/api/dato', datoRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    res.status(200).send('Bienvenid@ a nuestro API RestFull (backend)')
})



const run = async() => {
    await mongoose.connect(process.env.URL_BASEDATOS, { useNewUrlParser: true, useUnifiedTopology: true })
    await app.listen(process.env.PORT || 3000)
    console.log('Servidor y base de datos encendidos correctamente')
}

run().catch(error => console.log('Fallo al arrancar:' + error))