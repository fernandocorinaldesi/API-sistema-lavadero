const Producto = require("../models/producto");

exports.getAllProductos = async () => {

  resultado = await Producto.findAll()
 
  return resultado
}

exports.getProductoById = async (id)  =>{
  resultado = await Producto.findOne({ where: { id:id  } })
  return resultado
}

exports.add = async (body) => {

  resultado = await Producto.create({
    nombre: body.nombre,
    marca:body.marca,
    proveedor:body.proveedor,
    descripcion: body.descripcion
  
  })
  return resultado
}
exports.edit = async (body, id) => {

  resultado = await Producto.update({
    nombre: body.nombre,
    marca:body.marca,
    proveedor:body.proveedor,
    descripcion: body.descripcion
   }, { where: { id: id } })
  return resultado
}

exports.delete = async (producto) => {
  const res = await producto.destroy()
  return res
 };