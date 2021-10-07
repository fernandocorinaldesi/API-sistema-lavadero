const clienteServices = require("../services/clienteServices")

exports.getAll = async (req, res, next) => {

  //const paginaActual = req.query.page || 1

  try {
    const resultado = await clienteServices.getAllClients()

    res.status(200).json({
      mensaje: "Elementos encontrados",
      elementos: resultado,
      total: resultado.length
    })

  } catch (error) {
    next(error)
  }

}