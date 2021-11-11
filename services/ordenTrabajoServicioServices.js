const OrdenTrabajoServicio = require("../models/ordenTrabajoServicio");

exports.add = async (servicios,ordenId,t) => {
   const res =  await Promise.all(servicios.map(async (e, i) => {
     
        await OrdenTrabajoServicio.create({
            orden_id: ordenId,
            servicio_id:e.id,
            cantidad: e.cantidad,
            precio:e.precio,
            registro:false
        }, { transaction: t });

    }))
    return res
  }

  exports.getAllServicesOrden = async (orden) => {

    resultado = await OrdenTrabajoServicio.findAll({ where: { orden_id:orden.id  } })
  
    return resultado
  }