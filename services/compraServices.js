const Compra = require("../models/compra");
const compraProductoServices = require("./compraProductoServices")

exports.addCompra = async (body, t) => {
  const resCompra = await Compra.create({
    precio_total: body.precioTotal,
    fecha: body.fecha
  }, { transaction: t })

  resCompraProducto = await compraProductoServices.add(body.productos, resCompra.id,t)
  return resCompra 
}

exports.findCompraById = async (id) => {
  const elemento = await Compra.findOne({ where: { id: id } })
  return elemento
};
exports.delete = async (compra) => {
 const res = await compra.destroy()
 return res
};