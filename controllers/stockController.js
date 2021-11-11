const stockServices = require("../services/stockServices")
const validationServices = require("../services/validationServices")

exports.getAll = async (req, res, next) => {

  try {
    const resultado = await stockServices.getAllStocks()
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
exports.addStock = async (req, res, next) => {

  try {
    const resultado = await stockServices.add(req.body)

    res.status(201).json({
      mensaje: "Se registro un ingreso correctamente",
      elementos: resultado
    })

  } catch (error) {
    next(error)
  }

}

exports.getDetalles = async (req, res, next) => {
  const id = req.params.id
  try {
    const stock = await stockServices.getStockById(id);
    const resultado = await stockServices.getDetallesIngresoEgreso(stock)
    res.status(200).json({
      mensaje: "Elementos encontrados",
      elementos: resultado,
      })

  } catch (error) {
    console.log(error)
    const mensaje = new Error('Error.')
    return next(mensaje)
  }

}

