const express = require('express')
const router = express.Router()
const ordenTrabajoController = require('../controllers/ordenTrabajoController')
const multer = require('../utils/multer/multerRouteModule')
const tokenAuth = require('../utils/tokenAuth')
const validator = require("./validator")

// Se asigna el controlador correspondiente a cada ruta

router.get('/',
    // tokenAuth,
    ordenTrabajoController.getAll
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
    ordenTrabajoController.addOrder
)

router.delete('/:id',
   // tokenAuth,
    //publicacionesController.eliminar
)

router.put(
    '/:id',
  //  tokenAuth,
 //   multer.upload,
 //   validator.pubValidationRules(),
   // validator.pubValidate,publicacionesController.editar
)

module.exports = router