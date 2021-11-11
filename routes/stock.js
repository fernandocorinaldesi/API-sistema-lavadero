const express = require('express')
const router = express.Router()
const stockController = require('../controllers/stockController')


// Se asigna el controlador correspondiente a cada ruta

router.get('/',
    // tokenAuth,
    stockController.getAll
)
router.get('/detalles/:id',
    // tokenAuth,
    stockController.getDetalles
)

router.get('/:id',
    // tokenAuth,
    //publicacionesController.findById
)

router.post('/',
    stockController.addStock
    //tokenAuth,
    // multer.upload,
    // validator.pubValidationRules(),
    //validator.pubValidate,
    //ordenTrabajoController.addOrder
)

/*router.delete('/:id',
    stockController.delete
    //publicacionesController.eliminar
)

router.put(
    '/:id',
    stockController.editStock
    //  tokenAuth,
    //   multer.upload,
    //   validator.pubValidationRules(),
    // validator.pubValidate,publicacionesController.editar
)*/

module.exports = router