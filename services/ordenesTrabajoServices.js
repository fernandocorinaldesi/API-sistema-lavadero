const OrdenTrabajo = require("../models/ordenTrabajo");
const clienteServices = require("./clienteServices")
const ordenTrabajoServicioServices = require("./ordenTrabajoServicioServices")
const sequelize = require('../database/sequelizeConnection')
const { QueryTypes } = require('sequelize');
const ordenTrabajoServicio = require("../models/ordenTrabajoServicio");

/*exports.getAll = async (paginaActual, porPagina) => {
  
  porPagina = porPagina || 100

  const resultado = {
    elementos: [],
    elementosEnTotal: 0,
  }

  resultado.elementos = await Publicacion.find()
    .countDocuments()
    .then((cantidad) => {
      resultado.elementosEnTotal = cantidad
      return Publicacion.find()
        .skip((paginaActual - 1) * porPagina)
        .limit(porPagina)
    })

  return resultado
}*/

exports.getAllOrders = async () => {
  resultado = await sequelize.query(`SELECT * from public.f_orden_cliente()`, { type: QueryTypes.SELECT });
  return resultado
}
exports.addOrder = async (body, t) => {
  let monto
  cliente = await clienteServices.getClientByDni(body.clienteDni.dni)
  if (body.senaMonto === null) {
    monto = 0
  }
  else {
    monto = body.precio - body.senaMonto
  }
  resOrden = await OrdenTrabajo.create({
    cliente_id: cliente.id,
    estado: body.estado,
    fecha_entrega: body.fecha_entrega,
    tipo_entrega: body.forma_entrega,
    tipo_pago: body.tipo_pago,
    precio: body.precio,
    monto: monto
  }, { transaction: t })

  resOrdenServicio = await ordenTrabajoServicioServices.add(body.servicios, resOrden.id, t)
  console.log(resOrdenServicio)

  return resultado
}
exports.updateOrden = async (orden, body) => {
   
  const resultado = await OrdenTrabajo.update({
    estado: body.estado,
    descripcion_almacenado:body.descripcion_almacenado,
    fecha_entrega:body.fecha_entrega
  }, { where: { id: orden.id } })
 console.log(resultado)
  return resultado
}
exports.findOrdenById = async (id) => {
  const elemento = await OrdenTrabajo.findOne({ where: { id: id } })
  return elemento
};
exports.delete = async (orden) => {
 const res = await orden.destroy()
 console.log("RES "+res)
 return res
};
/*
exports.addPub = async (req, usuario) => {
  const imagen = req.file.path
  const titulo = req.body.titulo
  const contenido = req.body.contenido
  const usuarioId = usuario

  const publicacion = new Publicacion({
    titulo: titulo,
    contenido: contenido,
    imagen: imagen,
    usuario: usuarioId,
  })

  return await publicacion.save()
}

exports.delPub = async (pub) => {
    this.deleteImage(pub.imagen)
    return await pub.remove();
};

exports.saveEdit = async (req, pub, image) => {
  (pub.titulo = req.body.titulo), (pub.imagen = image), (pub.contenido = req.body.contenido);
  return await pub.save();
};*/



