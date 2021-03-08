var express = require('express')
const AuthController = require('../controllers/authController')
const check = require('../middleware/check')

var api = express.Router()

api.post('/singup', check.checkDuplicatedEmail, AuthController.singup)
    /** Permite registrar un usuario a la BBDD,
    comprobando antes si ya existe un usuario guardado en la BBDD con el mismo email */

api.post('/login', AuthController.login)
    /** Nos permite loguearnos en el sistema
mediante email/pw (devolverá un Token al cliente) */

module.exports = api