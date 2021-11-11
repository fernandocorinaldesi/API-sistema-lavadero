const productoServices = require("../services/productoServices")

exports.getAll = async (req, res, next) => {

  try {
    const resultado = await productoServices.getAllProductos()

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
exports.addProducto = async (req, res, next) => {
  try {
    const resultado = await productoServices.add(req.body)
    res.status(201).json({
      mensaje: "El producto fue creado correctamente",
      elementos: resultado
    })

  } catch (error) {
    next(error)
  }

}

exports.editProducto = async (req, res, next) => {
  const id = req.params.id
  try {

    const servicio = await productoServices.getProductoById(id)
    const resultado = await productoServices.edit(req.body,servicio.id)
    res.status(200).json({
      mensaje: "El producto fue editado correctamente",
      elementos: resultado,
    })

  } catch (error) {
    next(error)
  }

}

exports.delete = async (req, res, next) => {
  const id = req.params.id

  try {
    const resultado = await productoServices.getProductoById(id);
    
    const resultadoDeleted = await productoServices.delete(resultado)
      res.status(200).json({
          mensaje: 'Producto eliminado.',
          resultado: resultadoDeleted
      })
  } catch (error) {
  next(error)
  }
}