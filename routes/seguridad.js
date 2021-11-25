const express = require('express')
const router = express.Router()
const seguridadController = require('../controllers/seguridadController')


// Se asigna el controlador correspondiente a cada ruta

router.post('/restore',
    seguridadController.restore
    //tokenAuth,
    // multer.upload,
    // validator.pubValidationRules(),
    //validator.pubValidate,
    //ordenTrabajoController.addOrder
)
router.get('/backup',
    seguridadController.backup
    //tokenAuth,
    // multer.upload,
    // validator.pubValidationRules(),
    //validator.pubValidate,
    //ordenTrabajoController.addOrder
)
router.get('/backup/emergencia',
    seguridadController.emergenciaBackup
    //tokenAuth,
    // multer.upload,
    // validator.pubValidationRules(),
    //validator.pubValidate,
    //ordenTrabajoController.addOrder
)


module.exports = router