const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clienteController')
const multer = require('../utils/multer/multerRouteModule')
const tokenAuth = require('../utils/tokenAuth')
const validator = require("./validator")

// Se asigna el controlador correspondiente a cada ruta

router.get('/',
    clienteController.getAll
)

router.post('/',
    clienteController.addClient
)

router.delete('/:id',
   // tokenAuth,
   
)

router.put(
    '/:id',
    clienteController.editClient

)

module.exports = router