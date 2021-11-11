const express = require('express')
const router = express.Router()
const compraController = require('../controllers/compraController')
const multer = require('../utils/multer/multerRouteModule')
const tokenAuth = require('../utils/tokenAuth')
const validator = require("./validator")

// Se asigna el controlador correspondiente a cada ruta

/*router.get('/',
    // tokenAuth,
    ordenTrabajoController.getAll
)

router.get('/:id',
    // tokenAuth,
    //publicacionesController.findById
)
router.get('/detalles/:id',
    // tokenAuth,
    ordenTrabajoController.getDetalles
    //publicacionesController.findById
)*/
router.post('/',
    //tokenAuth,
   // multer.upload,
   // validator.pubValidationRules(),
    //validator.pubValidate,
    compraController.addCompra
)

/*router.delete('/:id',
   // tokenAuth,
   compraController.del
)

router.put(
    '/:id',
    compraController.updateCompra
  //  tokenAuth,
 //   multer.upload,
 //   validator.pubValidationRules(),
   // validator.pubValidate,publicacionesController.editar
)
*/
module.exports = router