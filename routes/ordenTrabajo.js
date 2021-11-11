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
router.get('/calendar',
    // tokenAuth,
    ordenTrabajoController.getCalendarData
)


router.get('/:id',
    // tokenAuth,
    //publicacionesController.findById
)
router.get('/delivery/:desde/:hasta',
    // tokenAuth,
    ordenTrabajoController.getDelivery
)
router.get('/detalles/:id',
    // tokenAuth,
    ordenTrabajoController.getDetalles
    //publicacionesController.findById
)
router.post('/',
    //tokenAuth,
   // multer.upload,
   // validator.pubValidationRules(),
    //validator.pubValidate,
    ordenTrabajoController.addOrden
)

router.delete('/:id',
   // tokenAuth,
   ordenTrabajoController.delete
)

router.put(
    '/:id',
    ordenTrabajoController.updateOrden
  //  tokenAuth,
 //   multer.upload,
 //   validator.pubValidationRules(),
   // validator.pubValidate,publicacionesController.editar
)

module.exports = router