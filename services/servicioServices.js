const Servicio = require("../models/servicio");

exports.getAllServices = async () => {
  resultado = await Servicio.findAll()
  return resultado
}

exports.getServiceById = async (id)  =>{
  resultado = await Servicio.findOne({ where: { id:id  } })
  return resultado
}

exports.add = async (body) => {
 let resultado
 try {
  resultado = await Servicio.create({
    nombre: body.nombre,
    tipo: body.tipo,
    precio: body.precio,
    precio_proveedor: body.precio_proveedor || null,
  })
 } catch (error) {
   console.log(error)
  next(error)
 }
  return resultado
}
exports.edit = async (body, id) => {

  resultado = await Servicio.update({
    nombre: body.nombre,
    tipo: body.tipo,
    precio: body.precio,
    precio_proveedor: body.precio_proveedor || null,
  }, { where: { id: id } })
  return resultado
}

exports.delete = async (servicio) => {
  const res = await servicio.destroy()
  return res
 };