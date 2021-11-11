const express = require('express')
const router = express.Router()
const contableController = require('../controllers/contableController')


// Se asigna el controlador correspondiente a cada ruta
router.get('/dia/all',
    // tokenAuth,
    contableController.getAllByDay
)
router.get('/dia/ordenes',
    // tokenAuth,
    contableController.getOrdenesByDay
)
router.get('/dia/compras',
    // tokenAuth,
    contableController.getComprasByDay
)
router.get('/dia/ordenes/:detalle',
    // tokenAuth,
    contableController.getOrdenesDetallesByDay
)
router.get('/dia/compras/:detalle',
    // tokenAuth,
    contableController.getComprasDetallesByDay
)
router.get('/balance',
    // tokenAuth,
    contableController.getBalance
)
/*router.get('/detalles/:id',
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