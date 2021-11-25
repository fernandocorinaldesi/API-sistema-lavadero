const express = require('express')
const router = express.Router()
const servicioController = require('../controllers/servicioController')


// Se asigna el controlador correspondiente a cada ruta

router.get('/',
    // tokenAuth,
    servicioController.getAll
)

router.get('/:id',
    // tokenAuth,
    //publicacionesController.findById
)

router.post('/',
    servicioController.addService
    //tokenAuth,
    // multer.upload,
    // validator.pubValidationRules(),
    //validator.pubValidate,
    //ordenTrabajoController.addOrder
)

router.delete('/:id',
    servicioController.delete
    //publicacionesController.eliminar
)

router.put(
    '/:id',
    servicioController.editService
    //  tokenAuth,
    //   multer.upload,
    //   validator.pubValidationRules(),
    // validator.pubValidate,publicacionesController.editar
)

module.exports = router