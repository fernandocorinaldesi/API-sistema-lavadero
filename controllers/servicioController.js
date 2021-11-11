const servicioServices = require("../services/servicioServices")
const validationServices = require("../services/validationServices")

exports.getAll = async (req, res, next) => {

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
exports.addService = async (req, res, next) => {
  try {
    const resultado = await servicioServices.add(req.body)

    res.status(201).json({
      mensaje: "El servicio fue creado correctamente",
      elementos: resultado
    })

  } catch (error) {
    next(error)
  }

}

exports.editService = async (req, res, next) => {
  const id = req.params.id

  try {

    const servicio = await servicioServices.getServiceById(id)
    const resultado = await servicioServices.edit(req.body,servicio.id)
    res.status(200).json({
      mensaje: "El servicio fue editado correctamente",
      elementos: resultado,
    })

  } catch (error) {
    next(error)
  }

}

exports.delete = async (req, res, next) => {
  const id = req.params.id

  try {
    const resultado = await servicioServices.getServiceById(id);
    
    const resultadoDeleted = await servicioServices.delete(resultado)
      res.status(200).json({
          mensaje: 'Servicio eliminada.',
          resultado: resultadoDeleted
      })
  } catch (error) {
  next(error)
  }
}
