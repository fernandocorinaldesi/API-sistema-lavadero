const Egreso = require("../models/egreso");
const egresoProductoServices = require("./egresoProductoServices")

exports.addEgreso = async (body, t) => {
 console.log("EGRESO "+body)
  const resEgreso = await Egreso.create({
     fecha: body.fecha
  }, { transaction: t })

  resEgresoProducto = await egresoProductoServices.add(body.productos, resEgreso.id,t)
  console.log(resEgresoProducto)

  return resEgreso 
}

exports.findEgresoById = async (id) => {
  const elemento = await Egreso.findOne({ where: { id: id } })
  return elemento
};
exports.delete = async (egreso) => {
 const res = await egreso.destroy()
 return res
};