const express = require('express')
const router = express.Router()
const productoController = require('../controllers/productoController')


// Se asigna el controlador correspondiente a cada ruta

router.get('/',
    // tokenAuth,
    productoController.getAll
)

router.get('/:id',
    // tokenAuth,
    //publicacionesController.findById
)

router.post('/',
    productoController.addProducto
    //tokenAuth,
    // multer.upload,
    // validator.pubValidationRules(),
    //validator.pubValidate,
    //ordenTrabajoController.addOrder
)

router.delete('/:id',
    productoController.delete
    //publicacionesController.eliminar
)

router.put(
    '/:id',
    productoController.editProducto
    //  tokenAuth,
    //   multer.upload,
    //   validator.pubValidationRules(),
    // validator.pubValidate,publicacionesController.editar
)

module.exports = router