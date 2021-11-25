const seguridadServices = require("../services/seguridadService")



exports.restore = async (req, res, next) => {
const nombre = req.body.nombre

    try {
        const resultado = await seguridadServices.restore(nombre)
        
        res.status(201).json({
            mensaje: "El restore se realizo correctamente",
            elementos: resultado
        })
        

    } catch (error) {
        console.log(error)
        const errors = new Error('Hubo un problema durante el restore.')
        errors.statusCode = 401
        return next(errors)
    }

}

exports.backup = async (req, res, next) => {
    try {
        const resultado = await seguridadServices.backup()
        res.status(200).json({
            mensaje: "El backup se realizo correctamente",
            elementos: resultado
        })

    } catch (error) {
        next(error)
    }

}

exports.emergenciaBackup = async (req, res, next) => {
    try {
        await seguridadServices.emergencia()
        res.status(200).json({
        mensaje: "La base de datos perdida pudo ser restaurada",
       })

    } catch (error) {
        next(error)
    }

}