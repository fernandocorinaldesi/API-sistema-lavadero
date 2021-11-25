const ordenTrabajoServices = require("../services/ordenesTrabajoServices")
const sequelize = require('../database/sequelizeConnection')
const calendarServices = require("../services/calendarServices")

exports.getAll = async (req, res, next) => {
  try {
    const resultado = await ordenTrabajoServices.getAllOrders()
       
    res.status(200).json({
      mensaje: "Elementos encontrados",
      elementos: resultado.sort((a,b) => b.orden_id - a.orden_id),
      total: resultado.length
    })

  } catch (error) {
    console.log(error)
    const mensaje = new Error('Error.')
    return next(mensaje)
  }

}
exports.getCalendarData = async (req, res, next) => {

  try {
    const resultado = await calendarServices.getData()

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
exports.getDetalles = async (req, res, next) => {
  const id = req.params.id
  
  try {
    const orden = await ordenTrabajoServices.findOrdenById(id);
    const resultado = await ordenTrabajoServices.getOrdenDetalles(orden)

    res.status(200).json({
      mensaje: "Elementos encontrados",
      elementos: resultado,
      orden:orden
    })

  } catch (error) {
    console.log(error)
    const mensaje = new Error('Error.')
    return next(mensaje)
  }
}
exports.getDelivery = async (req, res, next) => {
  const desde = req.params.desde
  const hasta = req.params.hasta
   
  try {
    
    const resultado = await ordenTrabajoServices.getOrdenDesdeHasta(desde,hasta)

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

exports.addOrden = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    resultado = await ordenTrabajoServices.addOrder(req.body, t)
    res.status(201).json({
      mensaje: "Orden de trabajo creada.",
      orden: resultado,
    });
    await t.commit();
  } catch (error) {
    await t.rollback();
    console.log(error)
    const mensaje = new Error('Error.')
    return next(mensaje)
  }
};
exports.updateOrden = async (req, res, next) => {
  const id = req.params.id

  try {
     const orden = await ordenTrabajoServices.findOrdenById(id);
     const resultado = await ordenTrabajoServices.updateOrden(orden,req.body)

     res.status(200).json({
      mensaje: "Orden de trabajo actualizada.",
      orden: resultado,
    });

  } catch (error) {
     console.log(error)
    const mensaje = new Error('Error.')
    return next(mensaje)
  }
};

exports.findById = async (req, res, next) => {
  const id = req.params.id
  try {
   const resultado = await ordenTrabajoServices.findOrdenById(id);
   res.status(200).json({
      mensaje: 'Elemento encontrado',
      elemento: resultado
  })
  } catch (error) {
    next(error);
  }
};
exports.delete = async (req, res, next) => {
  const id = req.params.id

  try {
    const resultado = await ordenTrabajoServices.findOrdenById(id);
    const resultadoDeleted = await ordenTrabajoServices.delete(resultado)
      res.status(200).json({
          mensaje: 'Orden de trabajo eliminada.',
          resultado: resultadoDeleted
      })
  } catch (error) {
  next(error)
  }
}
