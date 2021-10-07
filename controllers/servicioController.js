const servicioServices = require("../services/servicioServices")
const validationServices = require("../services/validationServices")

exports.getAll = async (req, res, next) => {

  //const paginaActual = req.query.page || 1

  try {
    const resultado = await servicioServices.getAllServices()

    res.status(200).json({
      mensaje: "Elementos encontrados",
      elementos: resultado,
      total: resultado.length
    })

  } catch (error) {
    console.log(error)
    const mensaje = new Error('Error.')
    return next(mensaje)
  }

}
