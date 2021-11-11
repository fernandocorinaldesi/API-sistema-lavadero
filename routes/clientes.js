const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clienteController')
const multer = require('../utils/multer/multerRouteModule')
const tokenAuth = require('../utils/tokenAuth')
const validator = require("./validator")

// Se asigna el controlador correspondiente a cada ruta

router.get('/',
    // tokenAuth,
    clienteController.getAll
)

router.get('/:id',
    // tokenAuth,
    //publicacionesController.findById
)

router.post('/',
    //tokenAuth,
   // multer.upload,
   // validator.pubValidationRules(),
    //validator.pubValidate,
    clienteController.addClient
)

router.delete('/:id',
   // tokenAuth,
    //publicacionesController.eliminar
)

router.put(
    '/:id',
    clienteController.editClient
  //  tokenAuth,
 //   multer.upload,
 //   validator.pubValidationRules(),
   // validator.pubValidate,publicacionesController.editar
)

module.exports = router