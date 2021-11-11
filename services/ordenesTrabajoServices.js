const OrdenTrabajo = require("../models/ordenTrabajo");
const clienteServices = require("./clienteServices")
const servicioServices = require("./servicioServices")
const ordenTrabajoServicioServices = require("./ordenTrabajoServicioServices")
const sequelize = require('../database/sequelizeConnection')
const { QueryTypes } = require('sequelize');

exports.getOrdenDetalles = async (orden) => {
  const resultado = await ordenTrabajoServicioServices.getAllServicesOrden(orden)
  
   const ordenservicios = await Promise.all(resultado.map(async e => {
    serv = await servicioServices.getServiceById(e.servicio_id)
    return {id:e.id,nombre:serv.nombre,tipo:serv.tipo,cantidad:e.cantidad,precio:e.precio}
    
  }))


  return ordenservicios 
}

exports.getOrdenDesdeHasta = async (desde,hasta) => {
  const ordenes = await this.getAllOrders()
  const resultado = ordenes.filter(e => {
    return e.fecha_entrega >= desde && e.fecha_entrega <= hasta && e.estado!=="entregada"
    && e.tipo_entrega==="Entrega a domicilio"
  })
  return resultado
}

exports.getAllOrders = async () => {
  resultado = await sequelize.query(`SELECT * from public.f_orden_cliente()`, { type: QueryTypes.SELECT });
  return resultado
}
exports.addOrder = async (body, t) => {
  let monto
  cliente = await clienteServices.getClientByDni(body.clienteDni.dni)
  if(body.tipo_pago === 'En entrega'){
    monto = body.precio
  }
  else if (body.senaMonto !== null) {
    monto = body.precio - body.senaMonto
  }
  else {
    monto = 0
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
   console.log(body.descripcion)
  const resultado = await OrdenTrabajo.update({
    estado: body.estado,
    tipo_entrega: body.tipo_entrega,
    descripcion_almacenado:body.descripcion || "",
    fecha_entrega:body.fecha_entrega || orden.fecha_entrega
  }, { where: { id: orden.id } })
  return resultado
}
exports.findOrdenById = async (id) => {
  const elemento = await OrdenTrabajo.findOne({ where: { id: id } })
  return elemento
};
exports.delete = async (orden) => {
 const res = await orden.destroy()
 return res
};





