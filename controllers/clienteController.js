const clienteServices = require("../services/clienteServices")

exports.getAll = async (req, res, next) => {

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

exports.addClient = async (req, res, next) => {

  try {
    const resultado = await clienteServices.add(req.body)

    res.status(201).json({
      mensaje: "El cliente fue creado correctamente",
      elementos: resultado,
      total: resultado.length
    })

  } catch (error) {
    next(error)
  }

}

exports.editClient = async (req, res, next) => {

  const id = req.params.id

  try {

    const cliente = await clienteServices.getClientByid(id)
    const resultado = await clienteServices.edit(req.body,cliente.id)
    res.status(200).json({
      mensaje: "El cliente fue editado correctamente",
      elementos: resultado,
    })

  } catch (error) {
    next(error)
  }

}